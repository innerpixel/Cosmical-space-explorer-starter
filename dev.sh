#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print status messages
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

# Function to print warning messages
print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to print error messages
print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# Check if MongoDB is running
check_mongodb() {
    if ! systemctl is-active --quiet mongod; then
        print_warning "MongoDB is not running. Starting MongoDB..."
        sudo systemctl start mongod
        sleep 2
    fi
    print_status "MongoDB is running"
}

# Function to setup development database
setup_dev_db() {
    print_status "Setting up development database..."
    mongosh --eval "use cosmical_dev" > /dev/null 2>&1
}

# Function to setup development users
setup_dev_users() {
    print_status "Setting up development users..."
    node scripts/setup-dev-users.js
}

# Function to start development server
start_dev() {
    print_status "Starting development environment..."
    
    # Check MongoDB
    check_mongodb
    
    # Setup development database
    setup_dev_db
    
    # Setup development users
    setup_dev_users
    
    # Start the development server
    print_status "Starting development server..."
    npm run dev
}

# Function to reset development database
reset_dev_db() {
    print_status "Resetting development database..."
    mongosh --eval "use cosmical_dev; db.dropDatabase();" > /dev/null 2>&1
    setup_dev_db
    setup_dev_users
    print_status "Development database reset complete"
}

# Parse command line arguments
case "$1" in
    "start")
        start_dev
        ;;
    "reset-db")
        reset_dev_db
        ;;
    "setup-users")
        setup_dev_users
        ;;
    *)
        echo "Usage: $0 {start|reset-db|setup-users}"
        echo "  start       - Start development environment"
        echo "  reset-db    - Reset development database"
        echo "  setup-users - Setup development users only"
        exit 1
        ;;
esac
