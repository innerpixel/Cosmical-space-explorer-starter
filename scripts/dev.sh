#!/bin/bash

# Load utility functions
source "$(dirname "$0")/utils/port-manager.sh"

# Configuration
DEV_PORT=3000

# Print banner
echo "🚀 Starting Development Server"
echo "=============================="
echo "📝 Configuration:"
echo "   - Port: $DEV_PORT"
echo "   - Mode: Development"
echo "=============================="

# Check and clear port
kill_port $DEV_PORT

# Start development server
echo "🌟 Starting Vite development server..."
npm run dev
