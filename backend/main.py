import os
import httpx
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import List, Optional

from database import get_db, ChatMessage, init_db
from resume_data import RESUME_CONTEXT
from dotenv import load_dotenv

load_dotenv()

# Initialize database
init_db()

app = FastAPI(
    title="Juily Bagate - AI Portfolio",
    description="AI-powered chat interface for resume Q&A",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "ai-portfolioo-ni0y33xox-juiillys-projects.vercel.app",  # Your Vercel URL
        "https://*.vercel.app",  # All Vercel previews
        "https://*.trycloudflare.com",  # Cloudflare tunnels
        "*",  # Development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Models
class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

class Message(BaseModel):
    role: str
    content: str

# Constants
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
# Try these in order (update line 35 in main.py)

# Option 1: Nova Lite (Most Reliable - Amazon)
FREE_MODEL = "amazon/nova-lite-v1:free"

# Option 2: Llama 3.1 8B (Meta)
# FREE_MODEL = "amazon/nova-lite-v1:free"

# Option 3: Qwen 2.5 (Alibaba)
# FREE_MODEL = "amazon/nova-lite-v1:free"

# Option 4: DeepSeek (Chinese but works well)
# FREE_MODEL = "amazon/nova-lite-v1:free"

print(f"🔑 API Key loaded: {'Yes' if OPENROUTER_API_KEY else 'No'}")
print(f" Using model: {FREE_MODEL}")

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest, db: Session = Depends(get_db)):
    """Handle chat requests and interact with OpenRouter AI"""
    
    if not OPENROUTER_API_KEY:
        raise HTTPException(status_code=500, detail="OpenRouter API key not configured")
    
    # Save user message to database
    try:
        user_message = ChatMessage(role="user", content=request.message)
        db.add(user_message)
        db.commit()
    except Exception as e:
        print(f"❌ Error saving user message: {e}")
        db.rollback()
    
    # Build system prompt with resume context
    system_prompt = f"""You are an AI assistant representing Juily Bagate, a Computer Science Engineering student graduating in 2026.

ANSWER GUIDELINES:
1. Answer questions ONLY based on the resume context below
2. If information is not in the resume, politely say "I don't have that information in my resume"
3. Keep responses concise (2-4 sentences) unless detailed explanation is requested
4. Maintain a professional, friendly tone
5. For technical questions, reference specific projects or skills from the resume
6. If asked about availability/contact, direct to: bagatejuily15@gmail.com or +91 9082123060

RESUME CONTEXT:
{RESUME_CONTEXT}
"""
    
    # Prepare API request
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "HTTP-Referer": os.getenv("APP_URL", "http://localhost:5173"),
        "X-Title": "Juily Bagate Portfolio",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": FREE_MODEL,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": request.message}
        ],
        "max_tokens": 500,
        "temperature": 0.3
    }
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                OPENROUTER_URL, 
                json=payload, 
                headers=headers
            )
            response.raise_for_status()
            data = response.json()
            
            if "choices" not in data or not data["choices"]:
                print(f"❌ Invalid response from OpenRouter: {data}")
                raise HTTPException(status_code=500, detail="Invalid AI response format")
                
            ai_response = data["choices"][0]["message"]["content"].strip()
            
    except httpx.TimeoutException:
        print("❌ Timeout calling OpenRouter API")
        raise HTTPException(status_code=504, detail="AI service timeout. Please try again.")
    except httpx.HTTPStatusError as e:
        print(f"❌ HTTP Error: {e.response.status_code} - {e.response.text}")
        raise HTTPException(status_code=502, detail=f"AI service error: {e.response.status_code}")
    except httpx.RequestError as e:
        print(f"❌ Request Error: {str(e)}")
        raise HTTPException(status_code=503, detail=f"AI service unavailable. Please check your internet connection.")
    except Exception as e:
        print(f"❌ Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")
    
    # Save AI response to database
    try:
        ai_message = ChatMessage(role="assistant", content=ai_response)
        db.add(ai_message)
        db.commit()
    except Exception as e:
        print(f"❌ Error saving AI message: {e}")
        db.rollback()
    
    return ChatResponse(response=ai_response)


@app.get("/api/history", response_model=List[Message])
async def get_history(limit: int = 20, db: Session = Depends(get_db)):
    """Retrieve recent chat history"""
    try:
        messages = db.query(ChatMessage)\
            .order_by(ChatMessage.timestamp.desc())\
            .limit(limit)\
            .all()
        
        # Return in chronological order
        return [
            Message(role=msg.role, content=msg.content) 
            for msg in reversed(messages)
        ]
    except Exception as e:
        print(f"❌ Error fetching history: {e}")
        return []


@app.delete("/api/clear")
async def clear_history(db: Session = Depends(get_db)):
    """Clear chat history"""
    try:
        db.query(ChatMessage).delete()
        db.commit()
        return {"status": "success", "message": "Chat history cleared"}
    except Exception as e:
        print(f"❌ Error clearing history: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to clear history")


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy", 
        "service": "Juily Bagate Portfolio API",
        "database": "connected",
        "api_key": "configured" if OPENROUTER_API_KEY else "missing"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)