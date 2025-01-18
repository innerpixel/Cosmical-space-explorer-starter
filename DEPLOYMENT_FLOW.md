# Cosmical Space Explorer Deployment Flow

This document outlines the complete development to production workflow for the Cosmical Space Explorer project.

## 1. Development Environment (Local)

- Development happens on local machine
- MongoDB runs locally for development
- Node.js application runs in development mode
- Code is version controlled with Git
- Primary development branch: `main`

## 2. Version Control Flow

- All changes are committed to Git
- Repository: `innerpixel/Cosmical-space-explorer-starter`
- SSH key for authentication: `/home/nsbasicus/.ssh/id_ed25519_cosmical`
- Changes are pushed to GitHub using SSH

## 3. VPS Environment (Production)

### Server Details
- IP: `147.93.58.192`
- Provider: Hostinger
- Domain: `csmcl.space`

### Key Services
- Node.js (Application server)
- MongoDB (Database)
- Nginx (Web server)
- Mail Server (on cosmical.me)

## 4. Deployment Process

The `deploy.sh` script handles the entire deployment process:

### a) Pre-deployment Checks
- Verifies required tools (git, ssh, rsync)
- Checks if on correct branch (main)
- Validates SSH connection to VPS

### b) MongoDB Operations
- Sets up MongoDB directories if needed
- Creates a backup of existing database
- Verifies MongoDB service status

### c) Application Deployment
- Creates backup of current deployment
- Syncs project files to VPS build directory: `/var/www/csmcl.space`
- Builds the application on VPS
- Deploys backend API
- Sets up proper permissions and ownership
- Restarts services

### d) Post-deployment
- Verifies and reloads Nginx configuration
- Displays deployment status and Git information

## 5. Directory Structure on VPS

```
/var/www/csmcl.space/
├── dist/           # Built frontend application
├── api/            # Backend API
├── backup/         # Application backups
│   └── mongodb/    # MongoDB backups
└── build/          # Temporary build directory
```

## 6. MongoDB Management

### Configuration
- Data directory: `/var/lib/mongodb`
- Log directory: `/var/log/mongodb`
- Backup directory: `/var/www/csmcl.space/backup/mongodb`
- Port: 27017

### Features
- Automated backups before each deployment
- Restore capability from latest backup if needed
- Directory permissions managed automatically
- Health checks during deployment

## 7. Monitoring and Maintenance

- System services managed through systemd
- Nginx serves as reverse proxy
- MongoDB status checked during deployment
- Application logs available in standard locations
- Backups maintained for both application and database

## Key Benefits

- ✓ Zero-downtime deployments
- ✓ Automated database backups
- ✓ Proper permission management
- ✓ Service health checks
- ✓ Easy rollback capability
- ✓ Secure SSH-based deployment
- ✓ Clean separation of development and production environments

## Quick Reference Commands

### Deploy Application
```bash
./deploy.sh
```

### Check MongoDB Status
```bash
systemctl status mongodb
```

### View Application Logs
```bash
journalctl -u cosmical-api.service
```

### Manual Database Backup
```bash
mongodump --out /var/www/csmcl.space/backup/mongodb/$(date +%Y%m%d_%H%M%S)
```

## Security Notes

1. Always keep SSH keys secure and never share them
2. Regular backup verification is recommended
3. Monitor system logs for unusual activity
4. Keep all services updated with security patches

## Troubleshooting

If deployment fails:
1. Check the deployment logs
2. Verify MongoDB service status
3. Check disk space availability
4. Verify network connectivity
5. Check service logs using journalctl
