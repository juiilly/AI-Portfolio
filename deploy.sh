#!/bin/bash
# deploy.sh - Complete deployment script

set -e

echo "🚀 Deploying Juily Bagate AI Portfolio..."
echo ""

# Git Setup
echo "📦 Pushing to GitHub..."
git add .
git commit -m "🚀 Deployment update" || echo "No changes to commit"
git push
echo "✅ Code pushed to GitHub"
echo ""

# Frontend
echo "🎨 Frontend: Deploy to Vercel"
echo "   1. Go to vercel.com"
echo "   2. Import your GitHub repo"
echo "   3. Set Root Directory: frontend"
echo "   4. Add VITE_API_URL environment variable"
echo "   5. Deploy!"
echo ""

# Backend
echo "🔧 Backend: Start Cloudflare Tunnel"
echo "   1. Start backend: cd backend && uvicorn main:app --host 0.0.0.0 --port 8000"
echo "   2. In new terminal: cloudflared tunnel --url http://localhost:8000"
echo "   3. Copy the trycloudflare.com URL"
echo "   4. Update VITE_API_URL in Vercel"
echo ""

echo "🎉 Deployment Complete!"
echo ""
echo "📝 Your URLs:"
echo "   Frontend: ai-portfolioo-ni0y33xox-juiillys-projects.vercel.app"
echo "   Backend:  https://your-tunnel.trycloudflare.com"
echo "   GitHub:   https://github.com/yourusername/juily-ai-portfolio"