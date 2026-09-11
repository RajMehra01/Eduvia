import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

let mockUsers = [
  {
    id: 'user-inst-1',
    name: 'Dr. Elena Rostova',
    email: 'elena@eduvia.org',
    password_hash: '$2a$10$e8N...hashed',
    role: 'INSTRUCTOR',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'usr-101',
    name: 'Alex Morgan',
    email: 'alex.morgan@eduvia.org',
    password_hash: '$2a$10$e8N...hashed',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  }
];

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userId = `usr-${Date.now()}`;
    const userRole = role || 'STUDENT';
    const avatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';

    if (pool) {
      try {
        await pool.query(
          'INSERT INTO users (id, name, email, password_hash, role, avatar_url) VALUES (?, ?, ?, ?, ?, ?)',
          [userId, name, email, hashedPassword, userRole, avatar]
        );
      } catch (dbErr) {
        console.warn('DB query failed, fallback to memory');
      }
    }

    const newUser = { id: userId, name, email, role: userRole, avatar };
    mockUsers.push({ ...newUser, password_hash: hashedPassword });

    const token = jwt.sign(
      { id: userId, email, role: userRole },
      process.env.JWT_SECRET || 'eduvia_secret_jwt_key_2026',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: { user: newUser, token }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password required' });
    }

    let user = mockUsers.find(u => u.email === email);

    if (!user && pool) {
      try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) user = rows[0];
      } catch (err) {}
    }

    if (!user) {
      // Auto register for seamless demonstration
      const role = email.includes('instructor') ? 'INSTRUCTOR' : 'STUDENT';
      user = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0].toUpperCase(),
        email,
        role,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
      };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'eduvia_secret_jwt_key_2026',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar || user.avatar_url },
        token
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
