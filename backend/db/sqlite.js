import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db;

export async function initializeDatabase() {
  try {
    // Create database file in the backend directory
    const dbPath = path.join(__dirname, '..', 'auth_system.db');
    db = new Database(dbPath);
    
    // Create users table if it doesn't exist - Fixed datetime syntax
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        full_name TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      )
    `;
    
    db.exec(createTableQuery);
    console.log('SQLite users table initialized');
    
    return db;
  } catch (error) {
    console.error('SQLite connection error:', error);
    throw error;
  }
}

export function getDatabase() {
  if (!db) {
    throw new Error('SQLite not initialized. Call initializeDatabase() first.');
  }
  return db;
}

export function closeDatabase() {
  if (db) {
    db.close();
    console.log('SQLite connection closed');
  }
}