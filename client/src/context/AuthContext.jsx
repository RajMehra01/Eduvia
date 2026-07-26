import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('skillstream_user');
    return savedUser ? JSON.parse(savedUser) : {
      id: 'usr-101',
      name: 'Yogesh Singh Bhadoriya',
      email: 'yogesh@example.com',
      role: 'STUDENT', // 'STUDENT' or 'INSTRUCTOR'
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    };
  });

  const [token, setToken] = useState(() => localStorage.getItem('skillstream_token') || 'mock-jwt-token-xyz');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('skillstream_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('skillstream_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Attempt backend API login
      const res = await api.post('/auth/login', { email, password });
      if (res.data?.success) {
        setUser(res.data.data.user);
        setToken(res.data.data.token);
        localStorage.setItem('skillstream_token', res.data.data.token);
        setLoading(false);
        return { success: true };
      }
    } catch (err) {
      console.warn('Backend login unavailable, fallback to instant mock auth');
      // Mock login fallback
      const role = email.includes('instructor') ? 'INSTRUCTOR' : 'STUDENT';
      const mockUser = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0].toUpperCase(),
        email,
        role,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
      };
      setUser(mockUser);
      setToken('mock-jwt-token-123');
      localStorage.setItem('skillstream_token', 'mock-jwt-token-123');
      setLoading(false);
      return { success: true };
    }
  };

  const register = async (name, email, password, role) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/register', { name, email, password, role });
      if (res.data?.success) {
        setUser(res.data.data.user);
        setToken(res.data.data.token);
        localStorage.setItem('skillstream_token', res.data.data.token);
        setLoading(false);
        return { success: true };
      }
    } catch (err) {
      const mockUser = {
        id: `usr-${Date.now()}`,
        name,
        email,
        role: role || 'STUDENT',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
      };
      setUser(mockUser);
      setToken('mock-jwt-token-registered');
      localStorage.setItem('skillstream_token', 'mock-jwt-token-registered');
      setLoading(false);
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('skillstream_token');
    localStorage.removeItem('skillstream_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
