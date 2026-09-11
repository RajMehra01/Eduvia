import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LogIn, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  GraduationCap, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res?.success) {
      if (role === 'INSTRUCTOR' || email.toLowerCase().includes('instructor')) {
        navigate('/instructor-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleDemoLogin = (selectedRole) => {
    if (selectedRole === 'INSTRUCTOR') {
      setEmail('instructor@eduvia.org');
      setPassword('Password123!');
      setRole('INSTRUCTOR');
      login('instructor@eduvia.org', 'Password123!').then(() => {
        navigate('/instructor-dashboard');
      });
    } else {
      setEmail('alex.morgan@eduvia.org');
      setPassword('Password123!');
      setRole('STUDENT');
      login('alex.morgan@eduvia.org', 'Password123!').then(() => {
        navigate('/student-dashboard');
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-6 sm:py-10">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
        
        {/* Left Educational Brand Panel */}
        <div className="hidden md:flex flex-col justify-between p-8 sm:p-10 bg-gradient-to-br from-blue-50/90 via-slate-50 to-white border-r border-slate-200 relative">
          <div className="space-y-6 relative z-10">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 font-heading">Eduvia</span>
            </Link>

            <div className="space-y-2">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-semibold">
                Start Learning Today
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 leading-snug font-heading">
                Build new skills. Advance your career.
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Join over 50,000 learners mastering technical disciplines through structured courses and accredited completion certificates.
              </p>
            </div>

            {/* Embedded Educational Visual Element */}
            <div className="rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 aspect-[16/9]">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
                alt="Students studying online"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>On-demand masterclasses with modular video player</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Rigorous quizzes & verified digital credentials</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-4">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Secure Authentication • Accredited EdTech Platform</span>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="p-6 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="space-y-1 text-center md:text-left">
              <h2 className="text-2xl font-extrabold text-slate-900 font-heading">Sign In to Eduvia</h2>
              <p className="text-xs text-slate-500">Welcome back! Access your courses and certificates.</p>
            </div>

            {/* Role Switcher Tabs */}
            <div className="p-1 rounded-xl bg-slate-100 flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => setRole('STUDENT')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  role === 'STUDENT' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Learner Portal
              </button>
              <button
                type="button"
                onClick={() => setRole('INSTRUCTOR')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  role === 'INSTRUCTOR' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Instructor Studio
              </button>
            </div>

            {/* Quick Demo Pre-fill Pill Buttons */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
              <span>Quick Demo Fill:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('STUDENT')}
                  className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  Demo Learner
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('INSTRUCTOR')}
                  className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-semibold hover:bg-amber-100 transition-colors cursor-pointer"
                >
                  Demo Instructor
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {error}
              </div>
            )}

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-slate-700 font-semibold">Password</label>
                  <span className="text-[11px] text-blue-600 hover:underline cursor-pointer">Forgot password?</span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full font-bold"
                icon={LogIn}
              >
                Sign In
              </Button>
            </form>
          </div>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-semibold">
              Create an account
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
