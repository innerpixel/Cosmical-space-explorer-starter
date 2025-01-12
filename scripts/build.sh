#!/bin/bash

# Print banner
echo "🏗️  Building Production"
echo "=============================="
echo "📝 Configuration:"
echo "   - Mode: Production"
echo "   - Target: ./dist"
echo "=============================="

# Clean dist directory
if [ -d "dist" ]; then
    echo "🧹 Cleaning dist directory..."
    rm -rf dist
fi

# Build the application
echo "🔨 Building application..."
npm run build

# Check build status
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📦 Output location: ./dist"
else
    echo "❌ Build failed!"
    exit 1
fi
