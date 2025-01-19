#!/bin/bash

# This script should be run on the VPS as root

# Create MongoDB setup script
cat > setup-mongodb.sh << 'EOL'
#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# MongoDB version
MONGODB_VERSION="7.0"

# Configuration
MONGODB_PORT=27017
MONGODB_DATA_DIR="/var/lib/mongodb"
MONGODB_LOG_DIR="/var/log/mongodb"
BACKUP_DIR="/var/backups/mongodb"

# Function to check if command succeeded
check_status() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ $1${NC}"
    else
        echo -e "${RED}✗ $1${NC}"
        exit 1
    fi
}

echo -e "${YELLOW}Starting MongoDB Setup...${NC}"

# Update package list
echo -e "\n${YELLOW}Updating package list...${NC}"
apt-get update
check_status "Package list update"

# Install gnupg if not present
echo -e "\n${YELLOW}Installing gnupg...${NC}"
apt-get install -y gnupg
check_status "gnupg installation"

# Add MongoDB GPG key
echo -e "\n${YELLOW}Adding MongoDB GPG key...${NC}"
curl -fsSL https://pgp.mongodb.com/server-${MONGODB_VERSION}.asc | \
    gpg -o /usr/share/keyrings/mongodb-server-${MONGODB_VERSION}.gpg \
    --dearmor
check_status "MongoDB GPG key"

# Add MongoDB repository
echo -e "\n${YELLOW}Adding MongoDB repository...${NC}"
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-${MONGODB_VERSION}.gpg ] http://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/${MONGODB_VERSION} multiverse" | \
    tee /etc/apt/sources.list.d/mongodb-org-${MONGODB_VERSION}.list
check_status "MongoDB repository"

# Update package list again
echo -e "\n${YELLOW}Updating package list with MongoDB repository...${NC}"
apt-get update
check_status "Package list update with MongoDB"

# Install MongoDB
echo -e "\n${YELLOW}Installing MongoDB...${NC}"
apt-get install -y mongodb-org
check_status "MongoDB installation"

# Create necessary directories
echo -e "\n${YELLOW}Creating directories...${NC}"
mkdir -p $MONGODB_DATA_DIR $MONGODB_LOG_DIR $BACKUP_DIR
check_status "Directory creation"

# Set proper permissions
echo -e "\n${YELLOW}Setting permissions...${NC}"
chown -R mongodb:mongodb $MONGODB_DATA_DIR $MONGODB_LOG_DIR
chmod -R 750 $MONGODB_DATA_DIR $MONGODB_LOG_DIR
check_status "Permissions setup"

# Create MongoDB configuration file
echo -e "\n${YELLOW}Creating MongoDB configuration...${NC}"
cat > /etc/mongod.conf << EOF
# mongod.conf

# Where and how to store data.
storage:
  dbPath: $MONGODB_DATA_DIR
  journal:
    enabled: true

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path: $MONGODB_LOG_DIR/mongod.log

# network interfaces
net:
  port: $MONGODB_PORT
  bindIp: 127.0.0.1

# security
security:
  authorization: enabled

# operationProfiling
operationProfiling:
  mode: slowOp
  slowOpThresholdMs: 100
EOF
check_status "MongoDB configuration"

# Create systemd service file
echo -e "\n${YELLOW}Creating systemd service...${NC}"
cat > /etc/systemd/system/mongod.service << EOF
[Unit]
Description=MongoDB Database Server
Documentation=https://docs.mongodb.org/manual
After=network.target

[Service]
User=mongodb
Group=mongodb
Environment="OPTIONS=-f /etc/mongod.conf"
ExecStart=/usr/bin/mongod \$OPTIONS
ExecStartPre=/usr/bin/mkdir -p /var/run/mongodb
ExecStartPre=/usr/bin/chown mongodb:mongodb /var/run/mongodb
ExecStartPre=/usr/bin/chmod 0755 /var/run/mongodb
PermissionsStartOnly=true
PIDFile=/var/run/mongodb/mongod.pid
Type=forking
# file size
LimitFSIZE=infinity
# cpu time
LimitCPU=infinity
# virtual memory size
LimitAS=infinity
# open files
LimitNOFILE=64000
# processes/threads
LimitNPROC=64000
# locked memory
LimitMEMLOCK=infinity
# total threads (user+kernel)
TasksMax=infinity
TasksAccounting=false

[Install]
WantedBy=multi-user.target
EOF
check_status "Systemd service creation"

# Create backup script
echo -e "\n${YELLOW}Creating backup script...${NC}"
cat > /usr/local/bin/mongodb-backup << EOF
#!/bin/bash
BACKUP_NAME="mongodb-backup-\$(date +%Y%m%d-%H%M%S)"
BACKUP_PATH="$BACKUP_DIR/\$BACKUP_NAME"
mongodump --out \$BACKUP_PATH
find $BACKUP_DIR -type d -mtime +7 -exec rm -rf {} +
EOF
chmod +x /usr/local/bin/mongodb-backup
check_status "Backup script creation"

# Create backup cron job
echo -e "\n${YELLOW}Setting up daily backup...${NC}"
echo "0 2 * * * root /usr/local/bin/mongodb-backup" > /etc/cron.d/mongodb-backup
check_status "Backup cron job"

# Reload systemd
echo -e "\n${YELLOW}Reloading systemd...${NC}"
systemctl daemon-reload
check_status "Systemd reload"

# Start MongoDB
echo -e "\n${YELLOW}Starting MongoDB...${NC}"
systemctl start mongod
check_status "MongoDB start"

# Enable MongoDB to start on boot
echo -e "\n${YELLOW}Enabling MongoDB on boot...${NC}"
systemctl enable mongod
check_status "MongoDB enable"

# Wait for MongoDB to be ready
echo -e "\n${YELLOW}Waiting for MongoDB to be ready...${NC}"
sleep 5
EOL

# Create MongoDB users script
cat > create-mongodb-users.js << 'EOL'
// Switch to admin database
db = db.getSiblingDB('admin');

// Create root admin user
db.createUser({
  user: "admin",
  pwd: "Cosmical@Admin2024!",
  roles: [
    { role: "root", db: "admin" }
  ]
});

// Switch to application database
db = db.getSiblingDB('space-explorer');

// Create application admin user
db.createUser({
  user: "app_admin",
  pwd: "SpaceExplorer@Admin2024!",
  roles: [
    { role: "dbOwner", db: "space-explorer" }
  ]
});

// Create application user
db.createUser({
  user: "app_user",
  pwd: "SpaceExplorer@User2024!",
  roles: [
    { role: "readWrite", db: "space-explorer" }
  ]
});
EOL

# Make scripts executable
chmod +x setup-mongodb.sh

# Run MongoDB setup
./setup-mongodb.sh

# Create users
mongosh admin create-mongodb-users.js

echo "MongoDB installation complete!"
echo "Testing connection..."
mongosh "mongodb://app_user:SpaceExplorer@User2024!@localhost:27017/space-explorer" --eval "db.runCommand({ping: 1})"
