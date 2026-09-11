import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layers, User, Mail, Lock, Eye, EyeOff, UserPlus, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Senior Full Stack Engineer');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setIsSubmitting(true);
    const res = await register(name, email, password, role);
    setIsSubmitting(false);

    if (res.success) {
      navigate('/app', { replace: true });
    } else {
      setError(res.error || 'Failed to create account. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D0F] text-[#F3F4F1] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative font-sans">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(25,181,165,0.08),transparent)] pointer-events-none" />

      {/* Top Bar Back to Landing */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#A7B0B8] hover:text-[#F3F4F1] transition-colors bg-[#12161A] border border-[#1D2329] px-3.5 py-1.5 rounded-xl hover:border-[#262F38]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Landing</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Brand Header */}
        <div className="flex justify-center mb-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#19B5A5] flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
              <Layers className="w-5 h-5 text-[#0B0D0F]" />
            </div>
            <span className="font-bold text-lg text-[#F3F4F1] tracking-tight">Kairo</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#171C21] text-[#2DD4BF] border border-[#262F38]">
              PM
            </span>
          </Link>
        </div>

        <h2 className="text-center text-2xl font-bold tracking-tight text-[#F3F4F1]">
          Create Kairo Account
        </h2>
        <p className="mt-1.5 text-center text-xs text-[#A7B0B8]">
          Join the sprint workspace and start delivering with velocity.
        </p>

        {/* Main Form Panel */}
        <div className="mt-6 panel-slate rounded-2xl p-6 sm:p-8 border border-[#1D2329] shadow-xl space-y-5">
          {error && (
            <div
              id="signup-error-alert"
              className="p-3.5 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-xs text-[#EF4444] flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#A7B0B8] mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#707A84] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="signup-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Elena Rostova"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#171C21] border border-[#1D2329] rounded-xl text-[#F3F4F1] placeholder-[#707A84] focus:outline-none focus:border-[#19B5A5] transition-colors font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#A7B0B8] mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#707A84] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="signup-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@kairo.internal"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#171C21] border border-[#1D2329] rounded-xl text-[#F3F4F1] placeholder-[#707A84] focus:outline-none focus:border-[#19B5A5] transition-colors font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#A7B0B8] mb-1.5">
                Engineering Role / Title
              </label>
              <select
                id="signup-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#171C21] border border-[#1D2329] rounded-xl text-[#F3F4F1] focus:outline-none focus:border-[#19B5A5] transition-colors font-medium cursor-pointer"
              >
                <option value="Senior Full Stack Engineer">Senior Full Stack Engineer</option>
                <option value="Lead Systems Architect">Lead Systems Architect</option>
                <option value="VP of Engineering">VP of Engineering</option>
                <option value="DevOps & Infrastructure Specialist">DevOps & Infrastructure Specialist</option>
                <option value="Product Systems Designer">Product Systems Designer</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#A7B0B8] mb-1.5">
                Password (min 6 characters)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#707A84] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#171C21] border border-[#1D2329] rounded-xl text-[#F3F4F1] placeholder-[#707A84] focus:outline-none focus:border-[#19B5A5] transition-colors font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#707A84] hover:text-[#A7B0B8]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#A7B0B8] mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#707A84] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="signup-confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#171C21] border border-[#1D2329] rounded-xl text-[#F3F4F1] placeholder-[#707A84] focus:outline-none focus:border-[#19B5A5] transition-colors font-medium"
                />
              </div>
            </div>

            <button
              id="signup-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-xl bg-[#19B5A5] hover:bg-[#149A8C] disabled:opacity-50 text-[#0B0D0F] font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#0B0D0F] border-t-transparent rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-[#1D2329] text-center text-xs text-[#A7B0B8]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#2DD4BF] hover:text-[#19B5A5] font-semibold transition-colors">
              Sign In
            </Link>
          </div>
        </div>

        {/* Security / Compliance Footnote */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-[#707A84]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Encrypted Password Storage • Enterprise Access Control</span>
        </div>
      </div>
    </div>
  );
}
