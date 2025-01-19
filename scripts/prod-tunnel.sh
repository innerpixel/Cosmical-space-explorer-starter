#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Production server details
PROD_SERVER="root@cosmical.me"
LOCAL_PORT=27019
REMOTE_PORT=27017

# Function to check if tunnel is already running
check_tunnel() {
    if pgrep -f "ssh.*$LOCAL_PORT:localhost:$REMOTE_PORT.*$PROD_SERVER" > /dev/null; then
        return 0 # Tunnel is running
    else
        return 1 # Tunnel is not running
    fi
}

# Function to start tunnel
start_tunnel() {
    if check_tunnel; then
        echo -e "${YELLOW}Tunnel is already running on port $LOCAL_PORT${NC}"
        return 0
    fi

    echo -e "${GREEN}Starting SSH tunnel to production database...${NC}"
    ssh -N -L $LOCAL_PORT:localhost:$REMOTE_PORT $PROD_SERVER &
    
    # Wait for tunnel to establish
    sleep 2
    if check_tunnel; then
        echo -e "${GREEN}Tunnel established successfully!${NC}"
        echo -e "Production database available at: mongodb://localhost:$LOCAL_PORT/space-explorer"
        return 0
    else
        echo -e "${RED}Failed to establish tunnel${NC}"
        return 1
    fi
}

# Function to stop tunnel
stop_tunnel() {
    if check_tunnel; then
        echo -e "${YELLOW}Stopping SSH tunnel...${NC}"
        pkill -f "ssh.*$LOCAL_PORT:localhost:$REMOTE_PORT.*$PROD_SERVER"
        echo -e "${GREEN}Tunnel stopped${NC}"
    else
        echo -e "${YELLOW}Tunnel is not running${NC}"
    fi
}

# Function to check tunnel status
status_tunnel() {
    if check_tunnel; then
        echo -e "${GREEN}Tunnel is running on port $LOCAL_PORT${NC}"
        echo -e "Production database available at: mongodb://localhost:$LOCAL_PORT/space-explorer"
    else
        echo -e "${YELLOW}Tunnel is not running${NC}"
    fi
}

# Command line argument handling
case "$1" in
    start)
        start_tunnel
        ;;
    stop)
        stop_tunnel
        ;;
    status)
        status_tunnel
        ;;
    *)
        echo "Usage: $0 {start|stop|status}"
        exit 1
        ;;
esac
