# VPS Deployment Setup

## Server Information
- IP Address: 147.93.58.192
- Domains:
  - csmcl.space (Website/Vue App)
  - cosmical.me (API/User Management)

## Required Setup

### 1. System Requirements
- [ ] Node.js (Latest LTS version)
- [ ] Nginx (Web Server)
- [ ] Systemd service configuration
- [ ] SSL Certificates (Let's Encrypt)
- [ ] MongoDB (Database)
- [ ] UFW (Firewall)

### 2. Domain Configuration
- [ ] Configure DNS A records for both domains
- [ ] Set up SSL certificates for both domains
- [ ] Configure Nginx virtual hosts

### 3. Application Setup
#### API Server (cosmical.me)
- [ ] Configure MongoDB
- [ ] Set up environment variables
- [ ] Configure systemd service
- [ ] Set up Nginx reverse proxy

#### Vue App (csmcl.space)
- [ ] Build Vue application
- [ ] Configure Nginx to serve static files
- [ ] Set up CI/CD pipeline

### 4. Security Measures
- [ ] Configure UFW firewall
- [ ] Set up fail2ban
- [ ] Implement rate limiting
- [ ] Configure CORS policies
- [ ] Set up regular backups

### 5. Monitoring
- [ ] Set up system logging
- [ ] Configure logrotate for log management
- [ ] Set up error tracking

## Service Management Commands

```bash
# Start API service
sudo systemctl start cosmical-api

# Stop API service
sudo systemctl stop cosmical-api

# Check service status
sudo systemctl status cosmical-api

# View logs
sudo journalctl -u cosmical-api -f

# Restart service
sudo systemctl restart cosmical-api
```

## Initial Server Commands

```bash
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
sudo ufw enable
```

## Next Steps
1. Execute initial server setup commands
2. Configure Nginx for both domains
3. Set up SSL certificates
4. Deploy applications
5. Configure monitoring and security measures
