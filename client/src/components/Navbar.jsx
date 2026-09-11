import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  PlayCircle, 
  LayoutDashboard, 
  Award, 
  LogOut, 
  Menu, 
  X, 
  ArrowRightLeft,
  ChevronDown,
  Search,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';
import Badge from './ui/Badge';

export default function Navbar() {
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/courses?search=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch('');
      setMobileMenuOpen(false);
    } else {
      navigate('/courses');
    }
  };

  const navLinks = [
    { name: 'Explore Courses', path: '/courses', icon: BookOpen },
    ...(user?.role === 'STUDENT' ? [{ name: 'My Learning', path: '/student-dashboard', icon: PlayCircle }] : []),
    ...(user?.role === 'INSTRUCTOR' ? [{ name: 'Instructor Studio', path: '/instructor-dashboard', icon: LayoutDashboard }] : []),
    { name: 'Certificates', path: '/certificates', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/88 backdrop-blur-md border-b border-slate-200/80 shadow-2xs transition-all">
      <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 h-16 flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Eduvia Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:bg-blue-700 transition-colors">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-slate-900 font-heading">
              Eduvia
            </span>
            <span className="text-[10px] text-slate-500 font-medium -mt-1 tracking-wide hidden sm:inline">
              Learn skills. Build your future.
            </span>
          </div>
        </Link>

        {/* Desktop / Tablet Search Bar */}
        <div className="hidden md:flex flex-1 max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl mx-2 lg:mx-6">
          <form onSubmit={handleSearchSubmit} className="w-full relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search courses, skills, topics..."
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-100/90 hover:bg-slate-200/70 focus:bg-white text-xs text-slate-800 placeholder:text-slate-500 rounded-xl border border-transparent focus:border-blue-400 focus:outline-none transition-all shadow-2xs"
            />
          </form>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
                  active
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 text-slate-500" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-all cursor-pointer select-none"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover border border-slate-200 shadow-xs"
                />
                <div className="hidden sm:block leading-tight">
                  <div className="text-xs font-bold text-slate-800 truncate max-w-[110px]">{user.name}</div>
                  <div className="text-[10px] text-blue-600 font-medium">{user.role}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:inline" />
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setUserDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 p-2 shadow-xl z-50 space-y-1 text-xs">
                    <div className="p-2.5 border-b border-slate-100 mb-1">
                      <div className="font-bold text-slate-900">{user.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                      <div className="mt-2.5 flex items-center justify-between">
                        <Badge variant={user.role === 'INSTRUCTOR' ? 'amber' : 'emerald'} size="sm">
                          {user.role}
                        </Badge>
                        <button
                          onClick={() => { switchRole(); setUserDropdownOpen(false); }}
                          className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer hover:underline"
                          title="Switch perspective between Learner and Instructor"
                        >
                          <ArrowRightLeft className="w-3 h-3" /> Switch Role
                        </button>
                      </div>
                    </div>

                    <Link
                      to={user.role === 'INSTRUCTOR' ? '/instructor-dashboard' : '/student-dashboard'}
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                    >
                      <LayoutDashboard className="w-4 h-4 text-blue-600" />
                      <span>{user.role === 'INSTRUCTOR' ? 'Instructor Studio' : 'My Learning'}</span>
                    </Link>

                    <Link
                      to="/certificates"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                    >
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>My Certificates</span>
                    </Link>

                    <div className="border-t border-slate-100 pt-1 mt-1">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                          navigate('/login');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Mobile Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search courses, skills, topics..."
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 text-xs text-slate-800 placeholder:text-slate-500 rounded-xl border border-slate-200 focus:outline-none focus:bg-white focus:border-blue-500"
            />
          </form>

          {/* Quick Categories shortcut in mobile drawer */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
            <button
              onClick={() => { navigate('/courses?category=Web+Development'); setMobileMenuOpen(false); }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap"
            >
              Web Dev
            </button>
            <button
              onClick={() => { navigate('/courses?category=AI+%26+ML'); setMobileMenuOpen(false); }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap"
            >
              AI & ML
            </button>
            <button
              onClick={() => { navigate('/courses?category=UI%2FUX+Design'); setMobileMenuOpen(false); }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap"
            >
              UI/UX
            </button>
            <button
              onClick={() => { navigate('/courses?category=Cloud+%26+DevOps'); setMobileMenuOpen(false); }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap"
            >
              Cloud
            </button>
          </div>

          <div className="space-y-1 pt-1 border-t border-slate-100">
            <Link
              to="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                isActive('/courses') ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span>Explore Courses</span>
            </Link>

            <Link
              to="/student-dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                isActive('/student-dashboard') ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <PlayCircle className="w-4 h-4 text-slate-500" />
              <span>My Learning</span>
            </Link>

            <Link
              to="/certificates"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                isActive('/certificates') ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>Certificates</span>
            </Link>

            <Link
              to="/instructor-dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                isActive('/instructor-dashboard') ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-blue-600" />
              <span>Instructor Studio</span>
            </Link>
          </div>

          {user ? (
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs px-2">
                <span className="text-slate-500 font-medium">Logged in as {user.role}</span>
                <button
                  onClick={() => { switchRole(); setMobileMenuOpen(false); }}
                  className="text-blue-600 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <ArrowRightLeft className="w-3 h-3" /> Switch Role
                </button>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                  navigate('/login');
                }}
                className="w-full py-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="sm" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
