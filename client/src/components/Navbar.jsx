import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, BookOpen, PlayCircle, Layers, Award, User, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 px-6 py-4 flex items-center justify-between">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-indigo-400" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight flex items-center gap-2">
            SkillStream <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">LMS</span>
          </h1>
          <p className="text-[11px] text-slate-400">CodeTech IT Solutions Internship</p>
        </div>
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
        <Link 
          to="/courses"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isActive('/courses') ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
        >
          <BookOpen className="w-4 h-4" /> Browse Courses
        </Link>
        {user?.role === 'STUDENT' && (
          <Link 
            to="/student-dashboard"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isActive('/student-dashboard') ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
          >
            <PlayCircle className="w-4 h-4" /> My Learning
          </Link>
        )}
        {user?.role === 'INSTRUCTOR' && (
          <Link 
            to="/instructor-dashboard"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isActive('/instructor-dashboard') ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
          >
            <Layers className="w-4 h-4" /> Instructor Studio
          </Link>
        )}
        <Link 
          to="/certificates"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isActive('/certificates') ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
        >
          <Award className="w-4 h-4" /> Certificates
        </Link>
      </nav>

      {/* User Actions */}
      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-slate-200">{user.name}</div>
              <div className="text-[10px] text-indigo-400 font-semibold flex items-center justify-end gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> {user.role}
              </div>
            </div>
            <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-slate-700 shadow-md" />
            <button 
              onClick={() => { logout(); navigate('/login'); }} 
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs">
            <Link to="/login" className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-semibold hover:bg-slate-800">
              Sign In
            </Link>
            <Link to="/register" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
