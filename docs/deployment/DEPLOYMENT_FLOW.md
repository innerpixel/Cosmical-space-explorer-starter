# Space Explorer Deployment Flow

## Development Environment

### Local Setup
1. Clone the repository
   ```bash
   git clone git@github.com:your-username/space-explorer.git
   cd space-explorer
   ```

2. Install dependencies
   ```bash
   cd server
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   # Edit .env with your local settings
   ```

### Development Workflow
1. Make changes in your local environment
2. Test changes locally
3. Commit and push to GitHub
4. Changes will be automatically deployed to production

## Production Environment

### Server Details
- VPS: cosmical.me
- Application Path: `/var/www/space-explorer`
- Node.js Version: v20.18.1
- Running on Port: 5000

### MongoDB Setup
- Database: MongoDB v7.0
- Authentication: Enabled
- Users:
  - Admin User: `admin` (database management)
  - App User: `app_user` (application access)
- Database: `space-explorer`

### Service Management
The application runs as a systemd service named `space-explorer.service`

Common commands:
```bash
# Check service status
systemctl status space-explorer

# Restart service
systemctl restart space-explorer

# Stop service
systemctl stop space-explorer

# Start service
systemctl start space-explorer

# View logs
journalctl -u space-explorer
```

### Monitoring
1. Health Check
   ```bash
   curl http://localhost:5000/api/health
   ```

2. Logs
   - Application logs: `/var/log/space-explorer.log`
   - Error logs: `/var/log/space-explorer.error.log`
   - System logs: `journalctl -u space-explorer`

### Environment Variables
Production environment variables are stored in `/var/www/space-explorer/.env`:
- NODE_ENV=production
- PORT=5000
- MONGODB_URI=mongodb://app_user:password@localhost:27017/space-explorer
- JWT_SECRET=[secret]
- JWT_EXPIRES_IN=1d
- FRONTEND_URL=http://localhost:3000

## Troubleshooting

### Common Issues

1. Service won't start
   ```bash
   # Check logs
   journalctl -u space-explorer -n 50
   # Check error log
   tail -n 50 /var/log/space-explorer.error.log
   ```

2. MongoDB connection issues
   ```bash
   # Check MongoDB status
   systemctl status mongod
   # Test MongoDB connection
   mongosh --eval "db.runCommand({connectionStatus : 1})" -u app_user -p 'password' --authenticationDatabase admin
   ```

3. Port conflicts
   ```bash
   # Check what's using port 5000
   lsof -i :5000
   ```

## Security Notes

1. Always use SSH keys for GitHub access
2. Keep MongoDB credentials secure
3. Never commit .env files
4. Regularly update dependencies
5. Monitor server logs for suspicious activities
