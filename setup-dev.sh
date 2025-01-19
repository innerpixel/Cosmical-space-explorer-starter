#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to print status messages
print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

# Check prerequisites
echo "Checking prerequisites..."

# Check Node.js
if command_exists node; then
    NODE_VERSION=$(node -v)
    print_status "Node.js is installed (Version: $NODE_VERSION)"
else
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check npm
if command_exists npm; then
    NPM_VERSION=$(npm -v)
    print_status "npm is installed (Version: $NPM_VERSION)"
else
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

# Check MongoDB
if command_exists mongod; then
    MONGO_VERSION=$(mongod --version | grep "db version" | cut -d "v" -f2)
    print_status "MongoDB is installed (Version: $MONGO_VERSION)"
else
    print_error "MongoDB is not installed. Please install MongoDB first."
    exit 1
fi

# Start MongoDB if not running
if ! pgrep -x "mongod" > /dev/null; then
    print_warning "MongoDB is not running. Starting MongoDB..."
    sudo systemctl start mongod
    sleep 2
fi

# Check if MongoDB is running
if pgrep -x "mongod" > /dev/null; then
    print_status "MongoDB is running"
else
    print_error "Failed to start MongoDB. Please check MongoDB installation."
    exit 1
fi

# Clean existing installation if any
echo "Cleaning existing installation..."
if [ -d "node_modules" ]; then
    print_warning "Removing existing node_modules..."
    rm -rf node_modules
fi

if [ -d "server/node_modules" ]; then
    print_warning "Removing existing server node_modules..."
    rm -rf server/node_modules
fi

# Drop existing database
print_warning "Dropping existing database..."
mongosh --eval "db.getSiblingDB('space-explorer').dropDatabase()"

# Install dependencies
echo "Installing dependencies..."
npm install
cd server && npm install
cd ..

# Setup development database and users
echo "Setting up development database and users..."
node scripts/setup-dev-users.js

print_status "Development environment setup complete!"
echo -e "\nAvailable development users:"
echo -e "Admin:       admin@cosmical.me / admin123dev"
echo -e "Developer:   developer@cosmical.me / dev123local"
echo -e "Contributor: contributor@cosmical.me / contrib123dev"
echo -e "Member:      member@cosmical.me / member123dev"
echo -e "Explorer:    explorer@cosmical.me / explore123dev"

echo -e "\nTo start the development environment, run:"
echo -e "./dev.sh start"
