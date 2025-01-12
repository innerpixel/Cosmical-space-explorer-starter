#!/bin/bash

# Function to check if a port is in use
check_port() {
    local port=$1
    if lsof -i:$port > /dev/null; then
        return 0 # Port is in use
    else
        return 1 # Port is free
    fi
}

# Function to kill process on a specific port
kill_port() {
    local port=$1
    if check_port $port; then
        echo "🔄 Killing process on port $port..."
        fuser -k $port/tcp
        sleep 1
    else
        echo "✅ Port $port is already free"
    fi
}
