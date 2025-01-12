#!/bin/bash

# Load utility functions
source "$(dirname "$0")/utils/port-manager.sh"

# Configuration
PREVIEW_PORT=4173

# Print banner
echo "🔍 Starting Preview Server"
echo "=============================="
echo "📝 Configuration:"
echo "   - Port: $PREVIEW_PORT"
echo "   - Mode: Production Preview"
echo "=============================="

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "❌ Error: dist directory not found!"
    echo "🏗️  Running build first..."
    ./scripts/build.sh
fi

# Check and clear port
kill_port $PREVIEW_PORT

# Start preview server
echo "🌟 Starting preview server..."
npm run preview
