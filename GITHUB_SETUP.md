# GitHub Setup Guide

## Quick Setup

Run the setup script:
```bash
./setup-github.sh
```

Or follow these manual steps:

## Manual Setup

### 1. Initialize Git (if not already done)
```bash
git init
```

### 2. Create a new repository on GitHub
- Go to https://github.com/new
- Choose a repository name (e.g., `consulting-services-chatbot`)
- Don't initialize with README, .gitignore, or license (we already have these)
- Click "Create repository"

### 3. Add remote and push
```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Add all files
git add .

# Commit
git commit -m "Initial commit: Consulting Services Chatbot with Docker and Vercel support"

# Push to GitHub
git branch -M main
git push -u origin main
```

## What Gets Pushed

✅ **Included:**
- All source code (frontend, backend)
- Docker configuration files
- Vercel configuration
- GitHub Actions workflows
- Documentation

❌ **Excluded (via .gitignore):**
- `node_modules/`
- `dist/` (build output)
- `.env` files (sensitive data)
- Docker build cache

## After Pushing

### Docker Images on GitHub Container Registry

Once you push, GitHub Actions will automatically:
1. Build Docker images for frontend and backend
2. Push them to GitHub Container Registry (GHCR)
3. Images will be available at:
   - `ghcr.io/YOUR_USERNAME/consulting-backend:latest`
   - `ghcr.io/YOUR_USERNAME/consulting-frontend:latest`

### Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Add environment variable: `GEMINI_API_KEY`
6. Click "Deploy"

Vercel will automatically:
- Build your frontend
- Deploy API routes as serverless functions
- Provide you with a live URL

## Environment Variables

### For GitHub Actions (Docker builds):
No secrets needed - builds are public.

### For Vercel:
Add in Vercel dashboard:
- `GEMINI_API_KEY` = your Google Gemini API key

## Pulling Docker Images

After GitHub Actions builds the images, you can pull them:

```bash
# Login to GHCR (if needed)
echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR_USERNAME --password-stdin

# Pull images
docker pull ghcr.io/YOUR_USERNAME/consulting-backend:latest
docker pull ghcr.io/YOUR_USERNAME/consulting-frontend:latest
```

## Troubleshooting

### Permission denied when pushing
- Make sure you've authenticated with GitHub (use GitHub CLI or SSH keys)

### GitHub Actions failing
- Check that the workflow file is in `.github/workflows/`
- Ensure Docker is enabled in GitHub Actions settings

### Vercel deployment failing
- Check that `vercel.json` is in the root
- Verify `GEMINI_API_KEY` is set in Vercel environment variables
- Check Vercel build logs for errors

