# Quick Start Guide

## 🚀 Push to GitHub

### Option 1: Use the setup script
```bash
./setup-github.sh
```

### Option 2: Manual setup
```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Consulting Services Chatbot"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## 🐳 Docker Images on GitHub

After pushing to GitHub:
- GitHub Actions automatically builds Docker images
- Images are pushed to GitHub Container Registry (GHCR)
- Available at: `ghcr.io/YOUR_USERNAME/consulting-backend:latest`

## ☁️ Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub

2. **Click "New Project"** and import your repository

3. **Add Environment Variable:**
   - Name: `GEMINI_API_KEY`
   - Value: Your Google Gemini API key

4. **Click "Deploy"**

Vercel will:
- ✅ Build your frontend automatically
- ✅ Deploy API routes as serverless functions
- ✅ Give you a live URL (e.g., `your-app.vercel.app`)

## 📝 Important Notes

### Vercel vs Docker
- **Vercel**: Serverless platform (no Docker containers)
  - Frontend: Static build
  - Backend: Serverless functions in `/api` folder
- **Docker**: For platforms like Railway, Render, Fly.io
  - Use `docker-compose.yml` for containerized deployment

### Environment Variables
- **Local/Docker**: Create `.env` file (not committed to git)
- **Vercel**: Add in Vercel dashboard → Settings → Environment Variables
- **GitHub Actions**: No secrets needed for public builds

## 🔗 Useful Links

- [GitHub Setup Guide](./GITHUB_SETUP.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Docker Setup](./DOCKER_SETUP.md)

