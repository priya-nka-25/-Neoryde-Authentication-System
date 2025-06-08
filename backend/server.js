import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase, getDatabase } from './db/sqlite.js';
import { connectMongoDB, getProfileCollection } from './db/mongodb.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database connections
let db;
let profileCollection;

async function initializeDatabases() {
  try {
    // Initialize SQLite
    db = await initializeDatabase();
    console.log('SQLite connected successfully');

    // Initialize MongoDB
    await connectMongoDB();
    profileCollection = getProfileCollection();
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1);
  }
}

// Routes
app.post('/api/register', async (req, res) => {
  const { username, email, password, fullName } = req.body;

  try {
    // Check if user already exists
    const existingUser = db.prepare('SELECT id FROM users WHERE username = ? OR email = ?').get(username, email);

    if (existingUser) {
      return res.json({ success: false, message: 'Username or email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into SQLite - Fixed datetime syntax
    const insertUser = db.prepare('INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)');
    const result = insertUser.run(username, email, hashedPassword, fullName);


    // Create empty profile in MongoDB
    await profileCollection.insertOne({
      userId: result.lastInsertRowid.toString(),
      age: '',
      dateOfBirth: '',
      contactInfo: '',
      address: '',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Get user from SQLite
    const user = db.prepare('SELECT id, username, email, password FROM users WHERE username = ?').get(username);

    if (!user) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    // Return user data (without password)
    res.json({
      success: true,
      user: {
        id: user.id.toString(),
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.get('/api/profile/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Get profile from MongoDB
    const profile = await profileCollection.findOne({ userId });

    if (!profile) {
      // Create empty profile if doesn't exist
      const newProfile = {
        userId,
        age: '',
        dateOfBirth: '',
        contactInfo: '',
        address: '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await profileCollection.insertOne(newProfile);
      return res.json({ success: true, profile: newProfile });
    }

    res.json({ success: true, profile });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.put('/api/profile/:userId', async (req, res) => {
  const { userId } = req.params;
  const { age, dateOfBirth, contactInfo, address } = req.body;

  try {
    // Update profile in MongoDB
    const result = await profileCollection.updateOne(
      { userId },
      {
        $set: {
          age,
          dateOfBirth,
          contactInfo,
          address,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    res.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Start server
initializeDatabases().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});