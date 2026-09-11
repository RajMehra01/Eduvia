import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('eduvia_user');
    return savedUser ? JSON.parse(savedUser) : {
      id: 'usr-101',
      name: 'Alex Morgan',
      email: 'alex.morgan@eduvia.org',
      role: 'STUDENT', // 'STUDENT' or 'INSTRUCTOR'
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      title: 'Senior Learning Fellow',
      isDemo: true
    };
  });

  const [token, setToken] = useState(() => 
    localStorage.getItem('eduvia_token') || 'eduvia-jwt-token-active'
  );
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('eduvia_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('eduvia_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Attempt backend API login
      const res = await api.post('/auth/login', { email, password });
      if (res.data?.success) {
        const isDemo = email.toLowerCase().includes('alex') || email.toLowerCase().includes('demo') || email.toLowerCase().includes('eduvia.org');
        const userData = { ...res.data.data.user, isDemo };
        setUser(userData);
        setToken(res.data.data.token);
        localStorage.setItem('eduvia_token', res.data.data.token);
        setLoading(false);
        return { success: true };
      }
    } catch (err) {
      console.warn('Backend login unavailable, fallback to demo auth');
      // Mock login fallback
      const role = email.toLowerCase().includes('instructor') ? 'INSTRUCTOR' : 'STUDENT';
      const isDemo = email.toLowerCase().includes('alex') || email.toLowerCase().includes('demo') || email.toLowerCase().includes('eduvia.org');
      const mockUser = {
        id: isDemo ? (role === 'INSTRUCTOR' ? 'usr-inst-1' : 'usr-101') : `usr-${Date.now()}`,
        name: isDemo ? (role === 'INSTRUCTOR' ? 'Dr. Elena Rostova' : 'Alex Morgan') : email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email,
        role,
        isDemo,
        avatar: role === 'INSTRUCTOR' 
          ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        title: role === 'INSTRUCTOR' ? 'Lead Technical Educator' : 'Career Development Fellow'
      };
      setUser(mockUser);
      setToken('eduvia-mock-token-session');
      localStorage.setItem('eduvia_token', 'eduvia-mock-token-session');
      setLoading(false);
      return { success: true };
    }
  };

  const register = async (name, email, password, role) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/register', { name, email, password, role });
      if (res.data?.success) {
        const userData = { ...res.data.data.user, isDemo: false };
        setUser(userData);
        setToken(res.data.data.token);
        localStorage.setItem('eduvia_token', res.data.data.token);
        setLoading(false);
        return { success: true };
      }
    } catch (err) {
      const mockUser = {
        id: `usr-${Date.now()}`,
        name: name || 'Eduvia Learner',
        email,
        role: role || 'STUDENT',
        isDemo: false, // Freshly registered user starts with 0 enrollments
        avatar: (role || 'STUDENT') === 'INSTRUCTOR'
          ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        title: (role || 'STUDENT') === 'INSTRUCTOR' ? 'Lead Technical Educator' : 'Career Development Fellow'
      };
      setUser(mockUser);
      setToken('eduvia-mock-token-reg');
      localStorage.setItem('eduvia_token', 'eduvia-mock-token-reg');
      setLoading(false);
      return { success: true };
    }
  };

  const switchRole = () => {
    if (!user) return;
    const newRole = user.role === 'STUDENT' ? 'INSTRUCTOR' : 'STUDENT';
    const updated = {
      ...user,
      role: newRole,
      title: newRole === 'INSTRUCTOR' ? 'Lead Technical Educator' : 'Career Development Fellow',
      avatar: newRole === 'INSTRUCTOR'
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    };
    setUser(updated);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('eduvia_token');
    localStorage.removeItem('eduvia_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, switchRole, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
