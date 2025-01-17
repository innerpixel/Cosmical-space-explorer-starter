# Linux Server Management Commands

## User Management

### List Users
```bash
# List all users
cat /etc/passwd

# List only usernames
cut -d: -f1 /etc/passwd

# List users with login shells
grep /bin/bash /etc/passwd

# List system users and regular users
getent passwd

# List users from shadow file
sudo cat /etc/shadow

# List regular users (UID >= 1000)
awk -F: '$3 >= 1000 && $3 != 65534 {print $1}' /etc/passwd

# List currently logged-in users
who
```

### User Creation and Management
```bash
# Create new user
adduser username

# Add user to sudo group
usermod -aG sudo username

# Create .ssh directory for user
mkdir -p /home/username/.ssh
chmod 700 /home/username/.ssh

# Set up authorized_keys
touch /home/username/.ssh/authorized_keys
chmod 600 /home/username/.ssh/authorized_keys

# Set correct ownership
chown -R username:username /home/username/.ssh
```

### Delete Users
```bash
# Delete user and their home directory
sudo userdel -r username

# Remove user from specific group
sudo gpasswd -d username groupname

# Clean up user from system files
sudo sed -i '/^username:/d' /etc/shadow
sudo sed -i '/^username:/d' /etc/gshadow
sudo sed -i '/^username:/d' /etc/group
sudo rm -rf /home/username
```

## SSH Configuration

### Basic SSH Setup
```bash
# Install OpenSSH server
apt update
apt install -y openssh-server

# Backup SSH config
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak

# Start SSH service
systemctl start ssh
systemctl enable ssh
systemctl status ssh
```

### Secure SSH Configuration
```bash
# Edit SSH config file
nano /etc/ssh/sshd_config

# Recommended settings
Port 22
PermitRootLogin prohibit-password
PasswordAuthentication no
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
AllowUsers username
```

## SSH Keys Explained

### How SSH Keys Work
```plaintext
┌──────────────────┐                      ┌──────────────────┐
│   Local Machine  │                      │   Remote Server  │
│                  │                      │                  │
│ ┌──────────────┐ │      SSH Login      │ ┌──────────────┐ │
│ │ Private Key  │ │ ─────────────────── │ │ Public Key   │ │
│ │ (~/.ssh/id*) │ │   Authentication    │ │ (.ssh/auth*) │ │
│ └──────────────┘ │                      │ └──────────────┘ │
└──────────────────┘                      └──────────────────┘
```

### SSH Key Components
1. **Private Key** (Keep Secret!)
   - Stored on your local machine
   - Usually in `~/.ssh/` directory
   - Common names: `id_rsa`, `id_ed25519`
   - Never share this key
   - Permissions should be `600` (only you can read/write)

2. **Public Key** (Safe to Share)
   - Stored on remote servers
   - Located in `~/.ssh/authorized_keys`
   - Derived from private key
   - Format: `algorithm base64-encoded-key comment`
   - Permissions should be `644`

### Managing SSH Keys
```bash
# Generate new SSH key pair
ssh-keygen -t ed25519 -C "your-email@example.com"

# List your SSH keys
ls -la ~/.ssh/

# Copy public key to server
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server-ip

# Manual public key installation on server
cat ~/.ssh/id_ed25519.pub | ssh user@server-ip "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"

# Check key permissions
chmod 600 ~/.ssh/id_ed25519        # Private key
chmod 644 ~/.ssh/id_ed25519.pub    # Public key
chmod 700 ~/.ssh                   # SSH directory
```

### SSH Key Usage
```bash
# Connect using specific key
ssh -i ~/.ssh/id_ed25519 user@server-ip

# Add key to SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Test SSH connection
ssh -T user@server-ip
```

### SSH Config File (~/.ssh/config)
```bash
# Create/edit SSH config
nano ~/.ssh/config

# Example configuration
Host myserver
    HostName server-ip
    User username
    IdentityFile ~/.ssh/id_ed25519
    Port 22
```

### Security Best Practices
1. Always keep private keys secure and never share them
2. Use strong passphrases for key protection
3. Use ed25519 or RSA keys (minimum 2048 bits)
4. Keep different keys for different purposes
5. Regularly audit authorized_keys on servers
6. Disable password authentication after setting up keys

## 🚀 Space Station Control System

Our development environment is themed as a space station control center, providing an engaging and intuitive interface for both local development and VPS management.

### 🎮 Main Mission Control (`mission`)

Access the main control center with the `mission` command. Available operations:

1. **Launch Development Server** 🚀
   - Frontend Server (with flying rocket animation)
   - Backend Server (with pulse animation)
   - Full Stack (with combined animations)

2. **System Diagnostics** 🛠️
   - CPU Usage
   - Memory Status
   - Disk Space

3. **Project Status** 📊
   - Git Status
   - Branch Information
   - Pending Changes

4. **Security Protocols** 🛡️
   - File Permissions
   - Process Monitoring
   - Security Checks

5. **Network Operations** 📡
   - Connection Tests
   - Port Scanning
   - Network Statistics

6. **Project Management** 🗂️
   - Branch Creation
   - Merge Operations
   - Log Viewing

7. **Power Operations** ⚡
   - Service Control
   - System Status
   - Power Management

8. **VPS Control Center** 🛸
   - Direct access to VPS management

### 🛸 VPS Control Center (`vps`)

Manage the CSMCL.SPACE server with the `vps` command. Features:

1. **Security Operations** 🛡️
   ```bash
   - UFW Status
   - Active SSH Sessions
   - Auth Logs
   - Fail2Ban Status
   - Security Audit
   ```

2. **Network Status** 📡
   ```bash
   - Server Load
   - Network Statistics
   - Active Ports
   - Bandwidth Usage
   - SSL Certificate Status
   ```

3. **System Maintenance** 🛠️
   ```bash
   - System Updates
   - Package Cache Cleaning
   - Disk Space Analysis
   - System Logs
   - Process Management
   ```

4. **Deployment Controls** 🚀
   ```bash
   - Deploy Latest Changes
   - Rollback Deployment
   - View Deployment Logs
   - Check Service Status
   - Restart Services
   ```

5. **Emergency Protocols** ⚠️
   ```bash
   - Block All Traffic
   - Enable Maintenance Mode
   - Kill All Processes
   - Emergency Backup
   - System Recovery
   ```

6. **Power Management** ⚡
   ```bash
   - System Status
   - Service Control
   - Start/Stop Services
   - Full System Reboot
   ```

7. **Access Control** 🔐
   ```bash
   - User Management
   - SSH Key Management
   - Access Modifications
   ```

### 🌟 Quick Commands

Local Development:
```bash
mission              # Launch Mission Control
scan                # List files (ls -la)
probe               # Find files
chart               # Show current location (pwd)
analyze             # Search in files (grep)
maintain            # Git operations
```

VPS Management:
```bash
vps                 # Launch VPS Control Center
vps-connect         # Direct SSH connection
vps-deploy         # Quick deployment
vps-logs           # View PM2 logs
vps-status         # Check services status
vps-backup         # Create backup
```

### 🎨 Visual Features

1. **Loading Animations:**
   - Rocket flight (🚀) for frontend launches
   - Pulse effect (⣾⣽⣻) for backend operations
   - Scanner effect (▁▂▃▄) for system checks
   - Warp effect (⋮⋰⋯⋱) for deployments

2. **Color Coding:**
   - 🟦 Blue: Information and titles
   - 🟨 Yellow: Warnings and processing
   - 🟩 Green: Success and status
   - 🟥 Red: Errors and critical operations

3. **Navigation:**
   - Use number keys to select operations
   - Press 0 to return to previous menu
   - Press Enter to continue after operations

### 🔧 Configuration Files

The system uses two main configuration files:
1. `~/.bashrc` - Main shell configuration and local development controls
2. `~/.space-station-vps` - VPS-specific controls and configurations

### 🚨 Safety Features

1. **VPS Operations:**
   - Confirmation prompts for critical operations
   - Emergency rollback capabilities
   - Automatic backup before major changes

2. **Local Development:**
   - Project directory validation
   - Package.json checks
   - Service status verification

### 📝 Usage Tips

1. Always use `mission` or `vps` to access the control centers
2. Check status before performing operations
3. Use emergency protocols with caution
4. Keep regular backups using `vps-backup`
5. Monitor logs with `vps-logs` during deployments

## Nano Editor Commands

### Basic Navigation
```bash
# Open file
nano filename
nano /path/to/file

# Navigation Keys
Arrow keys     # Move cursor
Page Up/Down   # Scroll page up/down
Home/End       # Start/End of line
Alt + /        # End of file
Alt + \        # Start of file
Alt + G        # Go to specific line number
```

### Text Manipulation
```bash
# Cut and Paste
Ctrl + K       # Cut current line
Ctrl + U       # Paste cut text
Alt + 6        # Copy current line
Ctrl + ^       # Mark text (Ctrl + 6)
               # Move cursor to select
               # Press again to copy

# Delete
Backspace      # Delete character before cursor
Delete         # Delete character under cursor
Alt + Del      # Delete word forward
Alt + Bsp      # Delete word backward
```

### File Operations
```bash
# Save and Exit
Ctrl + O       # Save file ('Write Out')
Enter          # Confirm save
Ctrl + X       # Exit nano
Y/N            # Confirm save on exit

# Search and Replace
Ctrl + W       # Search forward
Alt + W        # Search backward
Ctrl + \       # Search and replace
Ctrl + _       # Go to line number
```

### Advanced Features
```bash
# Buffer Operations
Alt + <        # Switch to previous file buffer
Alt + >        # Switch to next file buffer
Alt + F        # Write file to different name

# Display Options
Alt + X        # Help with nano commands
Alt + C        # Show cursor position
Alt + N        # Toggle line numbers
Alt + P        # Toggle display of whitespace
```

### Nano Configuration Tips
```bash
# Create/edit nano configuration
nano ~/.nanorc

# Common settings
set linenumbers        # Show line numbers
set mouse             # Enable mouse support
set tabsize 4         # Set tab width
set tabstospaces      # Convert tabs to spaces
set autoindent        # Enable auto-indentation
set backup            # Create backup files
set smooth            # Smooth scrolling
set constantshow      # Show cursor position
```

### Shortcuts Reference
```bash
# File Operations
Ctrl + O       # Save
Ctrl + X       # Exit
Ctrl + R       # Read file into current buffer
Ctrl + T       # Check spelling

# Navigation
Ctrl + A       # Start of line
Ctrl + E       # End of line
Ctrl + Y       # Page up
Ctrl + V       # Page down
Ctrl + _       # Go to line number

# Editing
Ctrl + K       # Cut line
Ctrl + U       # Paste
Ctrl + J       # Justify paragraph
Ctrl + ]       # Complete current word
Ctrl + M       # New line
Ctrl + D       # Delete character under cursor

# Search/Replace
Ctrl + W       # Find
Ctrl + \       # Find and replace
```

### Tips and Tricks
1. Use `nano +123 file` to open file at line 123
2. Use `nano -l` to enable line numbers by default
3. Use `nano -B` to automatically backup files
4. Use `nano -m` to enable mouse support
5. Use `Ctrl + G` anytime to see help menu
6. Use `Alt + U` to undo and `Alt + E` to redo
7. Use `Alt + #` to toggle line numbers

## System Security

### Firewall (UFW) Setup
```bash
# Install UFW
apt install ufw

# Set default policies
ufw default deny incoming
ufw default allow outgoing

# Allow SSH
ufw allow 22/tcp

# Allow web traffic
ufw allow 80/tcp
ufw allow 443/tcp

# Enable firewall
ufw enable

# Check status
ufw status
```

### Fail2ban Setup
```bash
# Install fail2ban
apt install fail2ban

# Create custom config
cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Basic jail configuration
[sshd]
enabled = true
port = 22
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
findtime = 600
```

## System Maintenance

### System Updates
```bash
# Update package list
apt update

# Upgrade packages
apt upgrade -y

# Remove unused packages
apt autoremove -y
```

### Service Management
```bash
# Check service status
systemctl status service_name

# Start service
systemctl start service_name

# Enable service on boot
systemctl enable service_name

# Restart service
systemctl restart service_name

# Stop service
systemctl stop service_name
```

## Monitoring

### System Information
```bash
# Check system resources
top
htop

# Check disk space
df -h

# Check memory usage
free -h

# Check system logs
tail -f /var/log/syslog
```

### Network
```bash
# Check open ports
netstat -tulpn

# Check network interfaces
ip addr show

# Test network connectivity
ping -c 4 google.com
```

## Navigation and File Management

### Basic Navigation
```bash
# Print working directory
pwd

# List files and directories
ls -la           # Detailed list including hidden files
ls -lh           # Human-readable file sizes
ls -R            # Recursive list
ls -t            # Sort by modification time

# Change directory
cd /path/to/directory
cd ..            # Go up one level
cd ~             # Go to home directory
cd -             # Go to previous directory

# Show directory tree structure
tree
tree -L 2        # Show only 2 levels deep
tree -d          # Show only directories
```

### File Search and Location
```bash
# Find files by name
find / -name "filename"
find . -name "*.js"          # Find all .js files
find . -type f -mtime -7     # Find files modified in last 7 days
find . -size +100M           # Find files larger than 100MB

# Search file contents
grep -r "search_text" .
grep -i "case-insensitive" file.txt
grep -v "exclude_this" file.txt
grep -n "show_line_numbers" file.txt

# Locate files (needs updatedb)
updatedb
locate filename
```

### File Operations
```bash
# Copy files/directories
cp file1 file2
cp -r dir1 dir2      # Copy directories recursively

# Move/rename files
mv old_name new_name
mv file1 /new/path/

# Create directories
mkdir new_directory
mkdir -p path/to/new/directory    # Create parent directories if needed

# Remove files/directories
rm filename
rm -r directory      # Remove directory and contents
rm -rf directory     # Force remove without confirmation (use with caution!)

# View file contents
cat file.txt         # Show entire file
less file.txt        # Page through file
head -n 10 file.txt  # Show first 10 lines
tail -n 10 file.txt  # Show last 10 lines
tail -f file.txt     # Follow file updates in real-time
```

### File Permissions and Ownership
```bash
# Change file permissions
chmod 755 file       # rwxr-xr-x
chmod +x file        # Add execute permission
chmod -R 644 dir     # Recursively change permissions

# Change file ownership
chown user:group file
chown -R user:group directory    # Recursively change ownership
```

### Disk Usage and Management
```bash
# Check disk space
du -sh *            # Show size of current directory contents
du -h --max-depth=1 # Show size of immediate subdirectories
df -h               # Show disk space on all mounted filesystems

# Check file and directory sizes
ls -lh              # List files with human-readable sizes
ncdu                # Interactive disk usage analyzer
```

### Process Management
```bash
# View processes
ps aux              # List all processes
ps aux | grep name  # Search for specific process

# Monitor processes in real-time
top                 # Basic process monitor
htop               # Interactive process monitor

# Kill processes
kill PID            # Kill process by ID
killall process_name # Kill all processes by name
```

### File Compression
```bash
# Zip files
zip archive.zip file1 file2
zip -r archive.zip directory

# Unzip files
unzip archive.zip

# Create tar archive
tar -cvf archive.tar files/
tar -czvf archive.tar.gz files/    # Create compressed tar
tar -xzvf archive.tar.gz           # Extract compressed tar
```

## Best Practices
1. Always keep a backup of configuration files before editing
2. Use SSH keys instead of passwords
3. Regularly update system packages
4. Monitor system logs for suspicious activity
5. Maintain regular backups
6. Use strong passwords and change them regularly
7. Keep SSH configuration secure
8. Use firewall rules to limit access
