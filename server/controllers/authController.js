import jwt from 'jsonwebtoken';
import { fallbackStore, pool, isConnected } from '../config/db.js';

// Seed default fallback users if not already initialized
if (!fallbackStore.users) {
  fallbackStore.users = [
    {
      id: 'tm-2',
      name: 'Elena Rostova',
      email: 'elena.rostova@kairo.internal',
      password: 'password123',
      role: 'VP of Engineering',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'tm-1',
      name: 'Marcus Vance',
      email: 'marcus.vance@kairo.internal',
      password: 'password123',
      role: 'Lead Systems Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    }
  ];
}

const JWT_SECRET = process.env.JWT_SECRET || 'kairo_jwt_secret_token_2026';

// Helper to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Full name, email, and password are required'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists in fallback store
    const existing = fallbackStore.users.find(u => u.email.toLowerCase() === normalizedEmail);
    if (existing) {
      return res.status(400).json({
        success: false,
        error: 'An account with this email address already exists'
      });
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password: password,
      role: role || 'Engineering Team Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };

    fallbackStore.users.push(newUser);

    // If database connected, attempt insertion
    if (isConnected && pool) {
      try {
        await pool.query(
          'INSERT INTO users (id, name, email, role, avatar_url) VALUES (?, ?, ?, ?, ?)',
          [newUser.id, newUser.name, newUser.email, newUser.role, newUser.avatar]
        );
      } catch (dbErr) {
        // Fallback store handles persistence
      }
    }

    const token = generateToken(newUser);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          avatar: newUser.avatar
        },
        token
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    let user = fallbackStore.users.find(u => u.email.toLowerCase() === normalizedEmail);

    // If database connected, try lookup
    if (!user && isConnected && pool) {
      try {
        const [rows] = await pool.query('SELECT * FROM users WHERE LOWER(email) = ?', [normalizedEmail]);
        if (rows && rows.length > 0) {
          user = {
            id: rows[0].id,
            name: rows[0].name,
            email: rows[0].email,
            password: rows[0].password_hash || rows[0].password,
            role: rows[0].role,
            avatar: rows[0].avatar_url || rows[0].avatar
          };
        }
      } catch (dbErr) {
        // Fallback
      }
    }

    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password. Please verify your credentials.'
      });
    }

    const token = generateToken(user);

    return res.json({
      success: true,
      message: 'Authentication successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        },
        token
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = fallbackStore.users.find(u => u.id === decoded.id || u.email.toLowerCase() === decoded.email?.toLowerCase());

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    return res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        }
      }
    });
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
};
