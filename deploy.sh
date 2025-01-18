#!/bin/bash

# ===========================================
# Deployment Configuration Documentation
# ===========================================
#
# ESSENTIAL KEYS AND CONNECTIONS:
# ------------------------------
# 1. SSH Key:
#    - Location: /home/nsbasicus/.ssh/id_ed25519_cosmical
#    - Purpose: Authentication for VPS access
#    - Required for: Deployment, server maintenance, and monitoring
#    - Generate: ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_cosmical
#
# 2. GitHub:
#    - Repository: innerpixel/Cosmical-space-explorer-starter
#    - Access: Requires SSH key added to GitHub account
#    - Branch: main (deployment branch)
#
# 3. VPS Details:
#    - IP: 147.93.58.192
#    - Provider: Hostinger
#    - DNS: PTR record should point to mail server
#    - Services: Node.js, Nginx, OpenDKIM, Mail Server
#
# 4. Domain Configuration:
#    - Primary: csmcl.space
#    - DNS Provider: versio.nl
#    - Required Records: A, MX, PTR, DKIM, SPF, DMARC
#
# DOMAIN CONFIGURATION:
# --------------------
# 1. csmcl.space (Main Site & Web3)
#    - Primary web services and blockchain integration
#    - A Record:     csmcl.space → 147.93.58.192
#    - MX Record:    csmcl.space → mail.cosmical.me (priority 10)
#    - SPF:          v=spf1 include:cosmical.me -all
#    - DMARC:        v=DMARC1; p=reject; rua=mailto:admin@cosmical.me
#    - Web3:         _web3.csmcl.space TXT "chain=ethereum;contract=0x..."
#
# 2. cosmical.me (Mail Server)
#    - Dedicated mail server configuration
#    - A Record:     mail.cosmical.me → 147.93.58.192
#    - PTR Record:   147.93.58.192 → mail.cosmical.me
#    - SPF:          v=spf1 mx ip4:147.93.58.192 -all
#    - DKIM:         default._domainkey.cosmical.me
#    - DMARC:        v=DMARC1; p=reject; rua=mailto:admin@cosmical.me
#
# DEPLOYMENT PATHS:
# ---------------
# - Web App:        /var/www/csmcl.space
# - Mail Server:    /etc/postfix
# - OpenDKIM:       /etc/opendkim
# - SSL Certs:      /etc/letsencrypt/live/
#
# SERVICES:
# --------
# - Nginx:          Web server for csmcl.space
# - Node.js:        Application server
# - Postfix:        SMTP server on cosmical.me
# - OpenDKIM:       DKIM signing for mail
# - Web3:           Blockchain integration services
#
# DEPLOYMENT PREREQUISITES:
# -----------------------
# 1. Required Tools: git, ssh, rsync, npm
# 2. SSH key must be properly set up on both local machine and VPS
# 3. Proper permissions on deployment directories
# 4. Node.js environment properly configured
#
# ===========================================

# Configuration
VPS_IP="147.93.58.192"
SSH_KEY="/home/nsbasicus/.ssh/id_ed25519_cosmical"
DEPLOY_PATH="/var/www/csmcl.space"
BACKUP_PATH="${DEPLOY_PATH}/backup"
DIST_PATH="${DEPLOY_PATH}/dist"
BUILD_PATH="${DEPLOY_PATH}/build"
BRANCH="main"
GITHUB_REPO="origin"

# MongoDB Configuration
MONGO_PORT="27017"
MONGO_DATA_DIR="/var/lib/mongodb"
MONGO_LOG_DIR="/var/log/mongodb"
MONGO_BACKUP_DIR="${BACKUP_PATH}/mongodb"

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

# Function to setup MongoDB directories
setup_mongodb_dirs() {
    print_status "Setting up MongoDB directories..."
    ssh -i $SSH_KEY root@$VPS_IP "
        mkdir -p $MONGO_DATA_DIR
        mkdir -p $MONGO_LOG_DIR
        mkdir -p $MONGO_BACKUP_DIR
        chown -R mongodb:mongodb $MONGO_DATA_DIR
        chown -R mongodb:mongodb $MONGO_LOG_DIR
        chmod 755 $MONGO_DATA_DIR
        chmod 755 $MONGO_LOG_DIR
    "
}

# Function to backup MongoDB
backup_mongodb() {
    print_status "Backing up MongoDB database..."
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    ssh -i $SSH_KEY root@$VPS_IP "
        mongodump --out $MONGO_BACKUP_DIR/$TIMESTAMP
        tar -czf $MONGO_BACKUP_DIR/mongodb_backup_$TIMESTAMP.tar.gz $MONGO_BACKUP_DIR/$TIMESTAMP
        rm -rf $MONGO_BACKUP_DIR/$TIMESTAMP
    "
}

# Function to restore MongoDB
restore_mongodb() {
    print_status "Restoring MongoDB from latest backup..."
    ssh -i $SSH_KEY root@$VPS_IP "
        LATEST_BACKUP=\$(ls -t $MONGO_BACKUP_DIR/*.tar.gz | head -n1)
        if [ -n \"\$LATEST_BACKUP\" ]; then
            TMP_DIR=$MONGO_BACKUP_DIR/tmp_restore
            mkdir -p \$TMP_DIR
            tar -xzf \$LATEST_BACKUP -C \$TMP_DIR
            mongorestore \$TMP_DIR/*/
            rm -rf \$TMP_DIR
        else
            echo 'No backup found to restore'
        fi
    "
}

# Function to check MongoDB status
check_mongodb_status() {
    print_status "Checking MongoDB status..."
    ssh -i $SSH_KEY root@$VPS_IP "
        systemctl status mongodb || print_warning 'MongoDB service not running'
        mongo --eval 'db.runCommand({ connectionStatus: 1 })' || print_warning 'Cannot connect to MongoDB'
    "
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

# Function to migrate production users
migrate_prod_users() {
    print_status "Migrating production users to cosmical.me addresses..."
    
    # Check if .env.production exists
    if [ ! -f ".env.production" ]; then
        print_error "Missing .env.production file. Copy .env.production.template and set secure passwords."
    fi
    
    # Run migration script with confirmation flag
    node scripts/migrate-prod-users.js --confirm-prod-migration
}

# Function to backup production database
backup_prod_db() {
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_dir="backups/mongodb_${timestamp}"
    
    print_status "Creating production database backup..."
    mkdir -p "$backup_dir"
    
    mongodump --uri "$MONGODB_URI" --out "$backup_dir"
    
    if [ $? -eq 0 ]; then
        print_status "Backup created successfully at: $backup_dir"
    else
        print_error "Backup failed"
    fi
}

# Main deployment steps
main() {
    print_status "Starting deployment process..."
    
    # Check MongoDB setup
    setup_mongodb_dirs
    check_mongodb_status
    
    # Backup before deployment
    backup_mongodb
    
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

    # Step 5: Deploy backend API
    print_status "Deploying backend API..."
    ssh -i "$SSH_KEY" root@$VPS_IP "mkdir -p ${DEPLOY_PATH}/api"
    rsync -avz --delete --exclude 'node_modules' --exclude '.env' -e "ssh -i $SSH_KEY" ./server/ root@$VPS_IP:${DEPLOY_PATH}/api/

    # Step 6: Install backend dependencies and setup service
    print_status "Setting up backend service..."
    ssh -i "$SSH_KEY" root@$VPS_IP "cd ${DEPLOY_PATH}/api && npm install --production && chown -R www-data:www-data . && systemctl restart cosmical-api.service"

    # Step 7: Verify and reload Nginx
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
}

# Parse command line arguments
case "$1" in
    "deploy")
        main
        ;;
    "migrate-users")
        backup_prod_db  # Always backup before migration
        migrate_prod_users
        ;;
    "backup")
        backup_prod_db
        ;;
    *)
        echo "Usage: $0 {deploy|migrate-users|backup}"
        echo "  deploy        - Deploy application to production"
        echo "  migrate-users - Migrate users to cosmical.me addresses"
        echo "  backup        - Backup production database"
        exit 1
        ;;
esac
