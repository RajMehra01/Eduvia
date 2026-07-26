import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-6 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-indigo-400" />
          <span className="font-bold text-slate-200">SkillStream LMS</span> • CodeTech IT Solutions Internship Task 2
        </div>
        <div>
          Developed by <strong className="text-slate-200">Yogesh Singh Bhadoriya</strong>
        </div>
      </div>
    </footer>
  );
}
