#!/bin/bash
echo "Checking for process on port 3000..."
if lsof -i:3000 > /dev/null; then
    echo "Killing process on port 3000..."
    fuser -k 3000/tcp
fi
echo "Starting development server..."
npm run dev
