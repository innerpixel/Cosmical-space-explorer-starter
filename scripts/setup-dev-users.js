import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load development environment variables
dotenv.config({ path: resolve(__dirname, '../.env.development') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cosmical_dev';

const devUsers = [
  {
    email: 'admin@cosmical.me',
    password: 'admin123dev',
    name: 'Admin User',
    profiles: [{
      type: 'admin',
      privileges: ['manage_users', 'manage_profiles', 'manage_content', 'view_admin'],
      isActive: true
    }]
  },
  {
    email: 'developer@cosmical.me',
    password: 'dev123local',
    name: 'Developer User',
    profiles: [{
      type: 'developer',
      privileges: ['create_content', 'edit_content', 'view_content'],
      isActive: true
    }]
  },
  {
    email: 'contributor@cosmical.me',
    password: 'contrib123dev',
    name: 'Contributor User',
    profiles: [{
      type: 'contributor',
      privileges: ['create_content', 'view_content'],
      isActive: true
    }]
  },
  {
    email: 'member@cosmical.me',
    password: 'member123dev',
    name: 'Member User',
    profiles: [{
      type: 'member',
      privileges: ['view_content'],
      isActive: true
    }]
  },
  {
    email: 'explorer@cosmical.me',
    password: 'explore123dev',
    name: 'Space Explorer',
    profiles: [{
      type: 'explorer',
      privileges: ['view_content', 'create_expeditions'],
      isActive: true
    }]
  }
];

async function setupDevUsers() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    const usersCollection = db.collection('users');
    
    // Clear existing users
    await usersCollection.deleteMany({});
    console.log('Cleared existing users');
    
    // Create new users with hashed passwords
    for (const user of devUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = {
        ...user,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        lastLogin: null
      };
      
      await usersCollection.insertOne(newUser);
      console.log(`Created user: ${user.email}`);
    }
    
    console.log('\nDevelopment users created successfully!');
    console.log('\nLogin credentials:');
    devUsers.forEach(user => {
      console.log(`\n${user.name}:`);
      console.log(`Email: ${user.email}`);
      console.log(`Password: ${user.password}`);
      console.log(`Type: ${user.profiles[0].type}`);
    });
    
  } catch (error) {
    console.error('Error setting up development users:', error);
  } finally {
    await client.close();
  }
}

// Run the setup
setupDevUsers();
