<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Consulting Services Chatbot

A modern healthcare consultation booking system with AI-powered chatbot, built with React, TypeScript, Vite, and Express.js.

## Features

- 🤖 AI-powered chatbot using Google Gemini
- 📅 Appointment booking system
- 📱 OTP verification
- 🎨 Modern, responsive UI
- 🐳 Docker containerization
- 🚀 Ready for deployment

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **AI**: Google Gemini API
- **Containerization**: Docker, Docker Compose

## Run Locally

### Option 1: Using Docker (Recommended)

**Prerequisites:** Docker and Docker Compose

**Single-line command to build and launch:**
```bash
docker-compose down && docker-compose build --no-cache && docker-compose up -d && echo "✅ Application is running! Frontend: http://localhost:3000 | Backend: http://localhost:5000" && docker-compose logs -f
```

Or use the provided script:
```bash
./build-and-run.sh
```

**Note:** If you need the Gemini AI features, create a `.env` file in the root directory with:
```
GEMINI_API_KEY=your_api_key_here
```

The application will be available at:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

### Option 2: Local Development

**Prerequisites:**  Node.js

1. Install dependencies:
   ```bash
   npm install
   cd backend && npm install && cd ..
   ```

2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. Start backend (in one terminal):
   ```bash
   cd backend
   npm start
   ```

4. Start frontend (in another terminal):
   ```bash
   npm run dev
   ```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel:

1. Push to GitHub
2. Connect to [Vercel](https://vercel.com)
3. Add `GEMINI_API_KEY` environment variable
4. Deploy!

### Docker Images on GitHub:

Docker images are automatically built and pushed to GitHub Container Registry (GHCR) on each push to main branch.

Pull images:
```bash
docker pull ghcr.io/YOUR_USERNAME/consulting-backend:latest
docker pull ghcr.io/YOUR_USERNAME/consulting-frontend:latest
```

## Project Structure

```
├── backend/              # Express.js backend server
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── api/                 # Vercel serverless functions
│   └── index.js
├── components/          # React components
├── services/           # Frontend services (API, LLM)
├── Dockerfile          # Frontend Dockerfile
├── docker-compose.yml  # Docker Compose configuration
├── vercel.json         # Vercel deployment config
└── package.json        # Frontend dependencies
```

## Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key (required for AI features)

## License

MIT
