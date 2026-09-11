import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0D0F] flex items-center justify-center text-[#A7B0B8]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-[#19B5A5] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono">Authenticating session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
