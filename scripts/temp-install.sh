#!/bin/bash

# Run these commands on the VPS as root:

# 1. Create installation directory
mkdir -p /root/space-explorer-setup
cd /root/space-explorer-setup

# 2. Download MongoDB setup script
cat > setup-mongodb.sh << 'EOL'
#!/bin/bash

# Update and install MongoDB
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
   gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] http://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
   tee /etc/apt/sources.list.d/mongodb-org-7.0.list

apt-get update
apt-get install -y mongodb-org

# Create directories
mkdir -p /var/lib/mongodb /var/log/mongodb
chown -R mongodb:mongodb /var/lib/mongodb /var/log/mongodb

# Start MongoDB
systemctl start mongod
systemctl enable mongod

# Wait for MongoDB to start
sleep 5
EOL

# 3. Download user creation script
cat > create-users.js << 'EOL'
// Switch to admin database
db = db.getSiblingDB('admin');

// Create root admin user
db.createUser({
  user: "admin",
  pwd: "Cosmical@Admin2024!",
  roles: [{ role: "root", db: "admin" }]
});

// Switch to application database
db = db.getSiblingDB('space-explorer');

// Create application admin user
db.createUser({
  user: "app_admin",
  pwd: "SpaceExplorer@Admin2024!",
  roles: [{ role: "dbOwner", db: "space-explorer" }]
});

// Create application user
db.createUser({
  user: "app_user",
  pwd: "SpaceExplorer@User2024!",
  roles: [{ role: "readWrite", db: "space-explorer" }]
});
EOL

# 4. Make scripts executable and run them
chmod +x setup-mongodb.sh
./setup-mongodb.sh
mongosh admin create-users.js

# 5. Test the connection
mongosh "mongodb://app_user:SpaceExplorer@User2024!@localhost:27017/space-explorer" --eval "db.runCommand({ping: 1})"

echo "Installation complete! Here are your credentials:"
echo "----------------------------------------"
echo "Root Admin:"
echo "Username: admin"
echo "Password: Cosmical@Admin2024!"
echo ""
echo "App Admin:"
echo "Username: app_admin"
echo "Password: SpaceExplorer@Admin2024!"
echo ""
echo "App User:"
echo "Username: app_user"
echo "Password: SpaceExplorer@User2024!"
echo "----------------------------------------"
