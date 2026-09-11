import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  UserPlus, 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  GraduationCap, 
  CheckCircle2,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await register(name, email, password, role);
    if (res?.success) {
      if (role === 'INSTRUCTOR') {
        navigate('/instructor-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    } else {
      setError('Registration could not be completed. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-6 sm:py-10">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
        
        {/* Left Educational Brand Panel */}
        <div className="hidden md:flex flex-col justify-between p-8 sm:p-10 bg-gradient-to-br from-blue-50/90 via-slate-50 to-white border-r border-slate-200 relative">
          <div className="space-y-5 relative z-10">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 font-heading">Eduvia</span>
            </Link>

            <div className="space-y-1.5">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-semibold">
                {role === 'INSTRUCTOR' ? 'Educator Network' : 'Join 50,000+ Learners'}
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 leading-snug font-heading">
                {role === 'INSTRUCTOR'
                  ? 'Share your expertise. Teach what you love.'
                  : 'Start your learning journey with Eduvia.'}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {role === 'INSTRUCTOR'
                  ? 'Publish modern video courses, engage ambitious learners, and build a recurring revenue stream with Eduvia Studio.'
                  : 'Gain unlimited access to accredited technical courses, interactive video syllabi, and verifiable digital certificates.'}
              </p>
            </div>

            {/* Embedded Visual */}
            <div className="rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 aspect-[16/9]">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80"
                alt="Cohort collaboration"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant access to course players and syllabi</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Earn verifiable credentials recognized by top employers</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-4">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Secure 256-bit encryption • Free trial enrollment</span>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="p-6 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="space-y-1 text-center md:text-left">
              <h2 className="text-2xl font-extrabold text-slate-900 font-heading">Create Account</h2>
              <p className="text-xs text-slate-500">Sign up in seconds to begin learning or teaching</p>
            </div>

            {/* Role Selection Tabs */}
            <div className="p-1 rounded-xl bg-slate-100 flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => setRole('STUDENT')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  role === 'STUDENT' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-4 h-4" /> Learner
              </button>
              <button
                type="button"
                onClick={() => setRole('INSTRUCTOR')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  role === 'INSTRUCTOR' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Briefcase className="w-4 h-4" /> Instructor
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {error}
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jordan Miller"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
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
                icon={UserPlus}
              >
                Create Account
              </Button>
            </form>
          </div>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
              Sign In
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
