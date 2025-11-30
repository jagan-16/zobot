#!/bin/bash
docker-compose down && docker-compose build --no-cache && docker-compose up -d && echo "✅ Application is running! Frontend: http://localhost:3000 | Backend: http://localhost:5000" && docker-compose logs -f

