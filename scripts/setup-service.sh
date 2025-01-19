#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Setting up Space Explorer service...${NC}"

# Create service file
cat > /etc/systemd/system/space-explorer.service << 'EOL'
[Unit]
Description=Space Explorer Backend Service
After=network.target mongodb.service
Wants=mongodb.service

[Service]
Type=simple
User=root
WorkingDirectory=/var/www/space-explorer/server
Environment=NODE_ENV=production
Environment=PORT=5000
Environment=MONGODB_URI=mongodb://app_user:SpaceExplorer@User2024!@localhost:27017/space-explorer
ExecStart=/usr/bin/node src/index.js
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=space-explorer

[Install]
WantedBy=multi-user.target
EOL

echo -e "${GREEN}✓ Service file created${NC}"

# Reload systemd
systemctl daemon-reload
echo -e "${GREEN}✓ Systemd reloaded${NC}"

# Enable service
systemctl enable space-explorer
echo -e "${GREEN}✓ Service enabled${NC}"

# Start service
systemctl start space-explorer
echo -e "${GREEN}✓ Service started${NC}"

echo -e "\n${YELLOW}Service Status:${NC}"
systemctl status space-explorer

echo -e "\n${YELLOW}Useful commands:${NC}"
echo "View logs: journalctl -u space-explorer -f"
echo "Start service: systemctl start space-explorer"
echo "Stop service: systemctl stop space-explorer"
echo "Restart service: systemctl restart space-explorer"
