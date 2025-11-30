# Deployment Guide

## Deployment Options

### Option 1: Vercel (Recommended for Frontend + Serverless Backend)

Vercel is a serverless platform that doesn't support Docker containers. Instead, it runs:
- **Frontend**: Static build served via CDN
- **Backend**: Serverless functions (API routes)

#### Steps to Deploy to Vercel:

1. **Push to GitHub** (see GitHub setup below)

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**:
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add: `GEMINI_API_KEY` = your API key

4. **Deploy**:
   - Vercel will automatically detect the configuration
   - The frontend will be built and deployed
   - API routes in `/api` will become serverless functions

#### Vercel Configuration:
- Frontend build command: `npm run build`
- Output directory: `dist`
- API routes: `/api/*` → serverless functions

### Option 2: Docker Deployment (Railway, Render, Fly.io)

If you want to use Docker containers, consider these platforms:

#### Railway.app
1. Push to GitHub
2. Connect Railway to your GitHub repo
3. Railway will detect `docker-compose.yml`
4. Add environment variables in Railway dashboard

#### Render.com
1. Push to GitHub
2. Create new Web Service
3. Connect GitHub repo
4. Use Docker Compose or individual Dockerfiles
5. Add environment variables

#### Fly.io
1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Run: `fly launch`
3. Follow prompts to deploy

### Option 3: Separate Deployments

- **Frontend → Vercel** (best for React/Vite apps)
- **Backend → Railway/Render** (for Docker containers)

## GitHub Setup

### Initial Setup:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Consulting Services Chatbot with Docker support"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### GitHub Repository Structure:
```
├── backend/              # Backend Express server
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── api/                  # Vercel serverless functions
│   └── index.js
├── components/           # React components
├── services/            # Frontend services
├── Dockerfile            # Frontend Dockerfile
├── docker-compose.yml    # Docker Compose config
├── vercel.json           # Vercel configuration
├── package.json          # Frontend dependencies
└── README.md
```

## Environment Variables

### For Docker:
Create `.env` file (not committed to git):
```
GEMINI_API_KEY=your_api_key_here
```

### For Vercel:
Add in Vercel dashboard:
- `GEMINI_API_KEY` = your API key

## CI/CD with GitHub Actions (Optional)

See `.github/workflows/` for automated deployment workflows.

