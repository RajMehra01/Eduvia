import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ShieldCheck, Heart } from 'lucide-react';

export default function LandingFooter() {
  return (
    <footer className="border-t border-[#1a2130] bg-[#090b0f] py-14 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Col 1: Brand Info */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-base text-slate-100 tracking-tight">Kairo PM</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed max-w-xs">
            Precision engineering project management & sprint velocity telemetry. Built for teams that value focus and execution.
          </p>
          <div className="text-[10px] font-mono text-indigo-400">
            Intern ID: CITS4953 • CodeTech Final Task
          </div>
        </div>

        {/* Col 2: Workspace Views */}
        <div className="space-y-2.5">
          <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">Product Modules</h4>
          <ul className="space-y-1.5 text-[11px]">
            <li>
              <Link to="/app" className="hover:text-slate-200 transition-colors">Executive Overview</Link>
            </li>
            <li>
              <Link to="/app/kanban" className="hover:text-slate-200 transition-colors">Sprint Kanban Board</Link>
            </li>
            <li>
              <Link to="/app/table" className="hover:text-slate-200 transition-colors">Deliverable Data Table</Link>
            </li>
            <li>
              <Link to="/app/gantt" className="hover:text-slate-200 transition-colors">Milestone Gantt Schedule</Link>
            </li>
            <li>
              <Link to="/app/workload" className="hover:text-slate-200 transition-colors">Team Workload Heatmap</Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Architecture & Security */}
        <div className="space-y-2.5">
          <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">Engineering</h4>
          <ul className="space-y-1.5 text-[11px]">
            <li>
              <span className="text-slate-400">React 19 & Vite Architecture</span>
            </li>
            <li>
              <span className="text-slate-400">Tailwind CSS & Design Tokens</span>
            </li>
            <li>
              <span className="text-slate-400">Framer Motion Scroll Parallax</span>
            </li>
            <li>
              <span className="text-slate-400">Node.js Express REST Engine</span>
            </li>
            <li>
              <span className="text-slate-400">MySQL Dual-Mode Data Store</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Platform & Compliance */}
        <div className="space-y-2.5">
          <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">Quality Standards</h4>
          <div className="space-y-2 text-[11px] text-slate-400 leading-relaxed">
            <p>
              Adheres strictly to WCAG AA/AAA contrast guidelines. Zero hardcoded secrets, isolated environment configuration.
            </p>
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Production-Grade Architecture</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-[#161c28] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
        <div>
          © 2026 Kairo PM Systems. Developed for CodeTech IT Solutions Software Engineering Internship.
        </div>
        <div className="font-mono text-slate-400">
          Intern ID: <strong className="text-indigo-400">CITS4953</strong>
        </div>
      </div>
    </footer>
  );
}
