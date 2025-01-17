#!/bin/bash

# Configuration
VPS_IP="147.93.58.192"
SSH_KEY="/home/nsbasicus/.ssh/id_ed25519_cosmical"
DEPLOY_PATH="/var/www/csmcl.space"
BACKUP_PATH="${DEPLOY_PATH}/backup"
DIST_PATH="${DEPLOY_PATH}/dist"
BUILD_PATH="${DEPLOY_PATH}/build"
BRANCH="main"
GITHUB_REPO="origin"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Function to print status messages
print_status() {
    echo -e "${GREEN}==>${NC} $1"
}

print_error() {
    echo -e "${RED}Error:${NC} $1"
    exit 1
}

print_warning() {
    echo -e "${YELLOW}Warning:${NC} $1"
}

# Check if we have all required tools
command -v git >/dev/null 2>&1 || print_error "git is required but not installed."
command -v ssh >/dev/null 2>&1 || print_error "ssh is required but not installed."
command -v rsync >/dev/null 2>&1 || print_error "rsync is required but not installed."

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "Not in a git repository. Please run this script from your project root."
fi

# Check if we have uncommitted changes
if ! git diff-index --quiet HEAD --; then
    print_error "You have uncommitted changes. Please commit or stash them first."
fi

# Ensure we're on the correct branch
CURRENT_BRANCH=$(git symbolic-ref --short HEAD)
if [ "$CURRENT_BRANCH" != "$BRANCH" ]; then
    print_error "Not on $BRANCH branch. Please checkout $BRANCH first."
fi

# Step 1: Push to GitHub
print_status "Pushing to GitHub..."
git push $GITHUB_REPO $BRANCH || print_error "Failed to push to GitHub"

# Step 2: Create backup of current deployment
print_status "Creating backup of current deployment..."
ssh -i "$SSH_KEY" root@$VPS_IP "if [ -d ${DIST_PATH} ]; then tar -czf ${BACKUP_PATH}/backup-\$(date +%Y%m%d-%H%M%S).tar.gz -C ${DEPLOY_PATH} dist; fi"

# Step 3: Sync project files to VPS build directory
print_status "Syncing project files to VPS..."
ssh -i "$SSH_KEY" root@$VPS_IP "mkdir -p ${BUILD_PATH}"
rsync -avz --delete --exclude 'node_modules' --exclude 'dist' -e "ssh -i $SSH_KEY" ./ root@$VPS_IP:$BUILD_PATH/ || print_error "Failed to sync project files"

# Step 4: Build on VPS
print_status "Building project on VPS..."
ssh -i "$SSH_KEY" root@$VPS_IP "cd ${BUILD_PATH} && npm install && npm run build && rm -rf ${DIST_PATH} && mv dist ${DEPLOY_PATH}/ && chown -R www-data:www-data ${DIST_PATH} && chmod -R 755 ${DIST_PATH}"

# Step 5: Verify and reload Nginx
print_status "Verifying Nginx configuration..."
ssh -i "$SSH_KEY" root@$VPS_IP "nginx -t && systemctl reload nginx"

print_status "Deployment completed successfully!"

# Display deployment information
echo -e "\n${GREEN}Deployment Status:${NC}"
echo -e "✓ Code: https://github.com/innerpixel/Cosmical-space-explorer-starter"
echo -e "✓ Live: https://csmcl.space"
echo -e "\n${GREEN}Git Information:${NC}"
echo -e "Branch: $BRANCH"
echo -e "Last commit: $(git log -1 --pretty=format:'%h - %s (%cr)' --abbrev-commit)"
