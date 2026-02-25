#!/usr/bin/env python3
"""Check which free models are actually available on OpenRouter"""

import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")

print("🔍 Checking Available FREE Models on OpenRouter\n")
print("=" * 60)

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "HTTP-Referer": "http://localhost:5173",
}

try:
    response = requests.get(
        "https://openrouter.ai/api/v1/models",
        headers=headers,
        timeout=10
    )
    response.raise_for_status()
    
    models = response.json().get("data", [])
    
    # Filter ONLY free models
    free_models = []
    for model in models:
        model_id = model.get("id", "")
        pricing = model.get("pricing", {})
        
        # Check if it's free (prompt price = 0)
        if ":free" in model_id or pricing.get("prompt") == "0":
            free_models.append({
                "id": model_id,
                "name": model.get("name", model_id),
                "context": model.get("context_length", "N/A")
            })
    
    if free_models:
        print(f"✅ Found {len(free_models)} FREE models:\n")
        for i, model in enumerate(free_models[:15], 1):  # Show top 15
            print(f"  {i}. {model['id']}")
        
        print("\n" + "=" * 60)
        print("💡 RECOMMENDED (copy to main.py):")
        print(f"   FREE_MODEL = \"{free_models[0]['id']}\"")
        print("=" * 60)
    else:
        print("❌ No free models found!")
        print("💡 Your API key might need credits. Add $1 at openrouter.ai")
    
except requests.exceptions.Timeout:
    print("❌ Request timeout. Check your internet connection.")
except requests.exceptions.HTTPError as e:
    print(f"❌ HTTP Error: {e.response.status_code}")
    print(f"   Response: {e.response.text}")
except Exception as e:
    print(f"❌ Error: {e}")