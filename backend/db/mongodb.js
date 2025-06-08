import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb+srv://root:Mongodb%401234@cluster0.nf9ll4v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = process.env.MONGODB_DATABASE || 'auth_system_profiles';

let client;
let db;
let profileCollection;

export async function connectMongoDB() {
  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    profileCollection = db.collection('profiles');
    
    console.log('MongoDB connected successfully');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export function getProfileCollection() {
  if (!profileCollection) {
    throw new Error('MongoDB not initialized. Call connectMongoDB() first.');
  }
  return profileCollection;
}

export function getDatabase() {
  if (!db) {
    throw new Error('MongoDB not initialized. Call connectMongoDB() first.');
  }
  return db;
}

export async function closeMongoDB() {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
}