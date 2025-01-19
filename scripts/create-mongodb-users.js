// Switch to admin database
db = db.getSiblingDB('admin');

// Create root admin user
db.createUser({
  user: "admin",
  pwd: "Cosmical@Admin2024!",  // Root admin password
  roles: [
    { role: "root", db: "admin" }
  ]
});

// Switch to application database
db = db.getSiblingDB('space-explorer');

// Create application admin user
db.createUser({
  user: "app_admin",
  pwd: "SpaceExplorer@Admin2024!",  // App admin password
  roles: [
    { role: "dbOwner", db: "space-explorer" }
  ]
});

// Create application user
db.createUser({
  user: "app_user",
  pwd: "SpaceExplorer@User2024!",  // App user password
  roles: [
    { role: "readWrite", db: "space-explorer" }
  ]
});
