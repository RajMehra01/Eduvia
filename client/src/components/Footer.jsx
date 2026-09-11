import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Award, Mail, ArrowRight, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-300 border-t border-slate-800 text-xs mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white font-heading">
                  Eduvia
                </span>
                <span className="text-[10px] text-slate-400 font-medium -mt-0.5 tracking-wide">
                  Learn skills. Build your future.
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Empowering ambitious developers, engineers, and digital practitioners through structured curricula, production-level hands-on exercises, and cryptographically verified digital credentials.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Accredited Technical Education Platform • ISO/IEC 27001</span>
            </div>
          </div>

          {/* Explore Courses (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Disciplines</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">All 24 Masterclasses</Link>
              </li>
              <li>
                <Link to="/courses?category=Web+Development" className="hover:text-white transition-colors">Web Development</Link>
              </li>
              <li>
                <Link to="/courses?category=AI+%26+ML" className="hover:text-white transition-colors">AI & Machine Learning</Link>
              </li>
              <li>
                <Link to="/courses?category=Cloud+%26+DevOps" className="hover:text-white transition-colors">Cloud & DevOps</Link>
              </li>
              <li>
                <Link to="/courses?category=UI%2FUX+Design" className="hover:text-white transition-colors">UI/UX Design</Link>
              </li>
              <li>
                <Link to="/courses?category=Systems+%26+Programming" className="hover:text-white transition-colors">Systems Programming</Link>
              </li>
            </ul>
          </div>

          {/* Portals (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Portals</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <Link to="/student-dashboard" className="hover:text-white transition-colors">Learner Hub</Link>
              </li>
              <li>
                <Link to="/instructor-dashboard" className="hover:text-white transition-colors">Instructor Studio</Link>
              </li>
              <li>
                <Link to="/certificates" className="hover:text-white transition-colors">Verified Credentials</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">Account Sign In</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">Create Free Account</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Recognition (4 cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Eduvia Engineering Digest</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Receive weekly releases on new curriculum tracks, system design whitepapers, and verified credential roadmaps.
            </p>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="name@work-email.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-slate-800 transition-all"
                />
              </div>
              <button
                type="button"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shrink-0 cursor-pointer shadow-xs"
              >
                Subscribe
              </button>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> No spam</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> One-click unsubscribe</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} <strong className="text-slate-200">Eduvia Education Technologies Inc.</strong> All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Security Compliance</span>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Academic Integrity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
