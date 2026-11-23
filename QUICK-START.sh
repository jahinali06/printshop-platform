#!/bin/bash

echo "🚀 PrintShop Platform - Quick Start"
echo "===================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📦 Installing dependencies..."
npx pnpm install

echo ""
echo "✅ Installation complete!"
echo ""
echo "🌐 Starting frontend..."
echo ""
echo "Run one of these commands:"
echo ""
echo "  Frontend (Next.js):"
echo "    cd apps/web && npx pnpm dev"
echo "    → http://localhost:3000"
echo ""
echo "  Backend (NestJS):"
echo "    cd apps/api && npx pnpm dev"
echo "    → http://localhost:3001/api/docs"
echo ""
echo "📚 Documentation:"
echo "  - README.md - Project overview"
echo "  - GETTING-STARTED.md - Full setup guide"
echo "  - TEST-NOW.md - What you can test immediately"
echo "  - STATUS.md - Current project status"
echo ""
echo "Happy coding! 🎉"
