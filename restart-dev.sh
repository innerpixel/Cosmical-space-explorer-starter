#!/bin/bash

echo "🔄 Restarting development environment..."

# Kill all Node.js processes
echo "🛑 Stopping all Node.js processes..."
pkill -f node

# Kill any processes using port 3000 (frontend) and 5000 (backend)
echo "🔍 Checking for processes on ports 3000 and 5000..."
kill $(lsof -t -i:3000) 2>/dev/null
kill $(lsof -t -i:5000) 2>/dev/null

# Wait a moment to ensure all processes are killed
sleep 2

# Start the development server
echo "🚀 Starting development server..."
./dev.sh start
