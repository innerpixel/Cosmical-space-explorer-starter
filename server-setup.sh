#!/bin/bash

# Update system
sudo apt update
sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# Install Nginx
sudo apt install -y nginx

# Install MongoDB
sudo apt install -y mongodb

# Install Certbot for SSL
sudo apt install -y certbot python3-certbot-nginx

# Configure firewall
sudo apt install -y ufw
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https

# Create necessary directories
sudo mkdir -p /var/www/csmcl.space
sudo mkdir -p /var/www/cosmical.me/api
sudo mkdir -p /var/log/cosmical

# Set up log files
sudo touch /var/log/cosmical-api.log
sudo touch /var/log/cosmical-api.error.log
sudo chown www-data:www-data /var/log/cosmical-api.*

# Copy systemd service file
sudo cp cosmical-api.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable cosmical-api.service

# Make the script executable
chmod +x server-setup.sh
