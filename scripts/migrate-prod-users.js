const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.production' });

const PROD_MONGODB_URI = process.env.MONGODB_URI;

const prodUsers = [
  {
    email: 'admin@cosmical.me',
    password: process.env.ADMIN_INITIAL_PASSWORD || 'ChangeMeInProd!2025',
    name: 'Cosmical Admin',
    profiles: [{
      type: 'admin',
      privileges: ['manage_users', 'manage_profiles', 'manage_content', 'view_admin'],
      isActive: true
    }]
  },
  {
    email: 'developer@cosmical.me',
    password: process.env.DEV_INITIAL_PASSWORD || 'ChangeMeInProd!2025',
    name: 'Cosmical Developer',
    profiles: [{
      type: 'developer',
      privileges: ['create_content', 'edit_content', 'view_content'],
      isActive: true
    }]
  },
  {
    email: 'contributor@cosmical.me',
    password: process.env.CONTRIB_INITIAL_PASSWORD || 'ChangeMeInProd!2025',
    name: 'Cosmical Contributor',
    profiles: [{
      type: 'contributor',
      privileges: ['create_content', 'view_content'],
      isActive: true
    }]
  },
  {
    email: 'member@cosmical.me',
    password: process.env.MEMBER_INITIAL_PASSWORD || 'ChangeMeInProd!2025',
    name: 'Cosmical Member',
    profiles: [{
      type: 'member',
      privileges: ['view_content'],
      isActive: true
    }]
  },
  {
    email: 'explorer@cosmical.me',
    password: process.env.EXPLORER_INITIAL_PASSWORD || 'ChangeMeInProd!2025',
    name: 'Cosmical Explorer',
    profiles: [{
      type: 'explorer',
      privileges: ['view_content', 'create_expeditions'],
      isActive: true
    }]
  }
];

async function migrateProdUsers() {
  if (!PROD_MONGODB_URI) {
    console.error('Error: MONGODB_URI not found in .env.production');
    process.exit(1);
  }

  const client = new MongoClient(PROD_MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to Production MongoDB');
    
    const db = client.db();
    const usersCollection = db.collection('users');
    
    // Backup existing users
    const existingUsers = await usersCollection.find({}).toArray();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await db.collection(`users_backup_${timestamp}`).insertMany(existingUsers);
    console.log(`Backed up ${existingUsers.length} existing users to users_backup_${timestamp}`);
    
    // Update or create new users
    for (const user of prodUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = {
        ...user,
        password: hashedPassword,
        updatedAt: new Date(),
        lastPasswordChange: new Date()
      };
      
      // Try to find existing user by email
      const existingUser = await usersCollection.findOne({ email: user.email });
      
      if (existingUser) {
        // Update existing user while preserving their data
        await usersCollection.updateOne(
          { email: user.email },
          { 
            $set: {
              name: newUser.name,
              profiles: newUser.profiles,
              updatedAt: newUser.updatedAt,
              lastPasswordChange: newUser.lastPasswordChange
            }
          }
        );
        console.log(`Updated user: ${user.email}`);
      } else {
        // Create new user
        newUser.createdAt = new Date();
        newUser.isActive = true;
        newUser.lastLogin = null;
        await usersCollection.insertOne(newUser);
        console.log(`Created new user: ${user.email}`);
      }
    }
    
    console.log('\nProduction users migration completed successfully!');
    console.log('\nNew cosmical.me accounts:');
    prodUsers.forEach(user => {
      console.log(`\n${user.name}:`);
      console.log(`Email: ${user.email}`);
      console.log(`Type: ${user.profiles[0].type}`);
      console.log('Password: [Set in .env.production or default secure password]');
    });
    
  } catch (error) {
    console.error('Error migrating production users:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

// Add command line argument check for safety
if (process.argv.includes('--confirm-prod-migration')) {
  migrateProdUsers();
} else {
  console.error('\n⚠️  WARNING: This script will modify the production database!');
  console.error('To proceed, run with --confirm-prod-migration flag:');
  console.error('node migrate-prod-users.js --confirm-prod-migration\n');
}
