#!/bin/bash

echo "🚀 Setting up GitHub repository..."
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if remote exists
if git remote get-url origin &>/dev/null; then
    echo "✅ Remote 'origin' already configured"
    echo "Current remote: $(git remote get-url origin)"
else
    echo ""
    echo "📝 Please provide your GitHub repository URL:"
    echo "   Example: https://github.com/username/repo-name.git"
    read -p "GitHub URL: " GITHUB_URL
    
    if [ -n "$GITHUB_URL" ]; then
        git remote add origin "$GITHUB_URL"
        echo "✅ Remote 'origin' added: $GITHUB_URL"
    else
        echo "⚠️  No URL provided. You can add it later with:"
        echo "   git remote add origin https://github.com/username/repo-name.git"
    fi
fi

echo ""
echo "📋 Current git status:"
git status --short

echo ""
echo "📝 Ready to commit and push!"
echo ""
echo "Next steps:"
echo "1. Review changes: git status"
echo "2. Add files: git add ."
echo "3. Commit: git commit -m 'Initial commit: Consulting Services Chatbot'"
echo "4. Push: git push -u origin main"
echo ""
echo "Or run: git add . && git commit -m 'Initial commit' && git push -u origin main"

