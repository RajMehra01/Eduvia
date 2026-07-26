import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, CheckCircle, Clock, Award, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-12 py-6">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 bg-gradient-to-r from-slate-900 via-indigo-950/80 to-purple-950/70 border border-indigo-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-2xl space-y-5 relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
            <Flame className="w-3.5 h-3.5 text-amber-400" /> CodeTech Internship Accelerated Track
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Master Software Engineering with <span className="gradient-text">SkillStream LMS</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Interactive video lessons, hands-on syllabus modules, certified quiz assessments, and instructor management studio built for developers.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/courses"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
            >
              Browse Catalog <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-sm transition-all"
            >
              Join as Instructor
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
          <CheckCircle className="w-8 h-8 text-emerald-400" />
          <h3 className="font-bold text-slate-100 text-base">Verified Certificates</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Earn authenticated digital completion credentials with unique verification hash IDs.</p>
        </div>
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
          <Clock className="w-8 h-8 text-indigo-400" />
          <h3 className="font-bold text-slate-100 text-base">Self-Paced Learning</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Resume your active video lessons anytime with real-time lesson progress tracking.</p>
        </div>
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
          <Award className="w-8 h-8 text-purple-400" />
          <h3 className="font-bold text-slate-100 text-base">Instructor Studio</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Publish new course modules, upload videos, track enrolled students, and view sales revenue.</p>
        </div>
      </div>
    </div>
  );
}
