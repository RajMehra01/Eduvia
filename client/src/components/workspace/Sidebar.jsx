import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderGit2,
  KanbanSquare,
  ListFilter,
  CalendarDays,
  Users2,
  TrendingUp,
  Settings,
  ExternalLink,
  ChevronDown,
  Layers,
  Sparkles
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export default function Sidebar({ isMobileOpen, onCloseMobile }) {
  const location = useLocation();
  const { projects, activeProjectId, setActiveProjectId, activeProject } = useProject();

  const navItems = [
    { label: 'Overview', path: '/app', icon: LayoutDashboard, exact: true },
    { label: 'Projects', path: '/app/projects', icon: FolderGit2 },
    { label: 'Sprint Board', path: '/app/kanban', icon: KanbanSquare },
    { label: 'Task Table', path: '/app/table', icon: ListFilter },
    { label: 'Milestone Gantt', path: '/app/gantt', icon: CalendarDays },
    { label: 'Team Workload', path: '/app/workload', icon: Users2 },
    { label: 'Sprint Velocity', path: '/app/analytics', icon: TrendingUp },
    { label: 'Settings', path: '/app/settings', icon: Settings }
  ];

  const isCurrentActive = (item) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    return location.pathname.startsWith(item.path);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#0d1017] border-r border-[#1a2130] flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Brand Logo & Switcher */}
          <div className="p-4 border-b border-[#1a2130]">
            <Link to="/app" className="flex items-center gap-2.5 px-1 py-1">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/30">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <div className="leading-none">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-slate-100 tracking-tight">Kairo</span>
                  <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/60">
                    SaaS
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 font-mono">Workspace v1.0</p>
              </div>
            </Link>

            {/* Active Project Switcher Dropdown */}
            <div className="mt-3.5">
              <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1 px-1">
                Active Project
              </label>
              <div className="relative">
                <select
                  value={activeProjectId}
                  onChange={(e) => setActiveProjectId(e.target.value)}
                  className="w-full appearance-none bg-[#141824] border border-[#21293d] rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer pr-8 truncate"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.keyIdentifier || p.id} • {p.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            <div className="px-2 pb-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Workspace Views
            </div>

            {navItems.map((item) => {
              const active = isCurrentActive(item);
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => onCloseMobile && onCloseMobile()}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    active
                      ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 font-semibold shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#151a26]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Footer & Landing Switch */}
          <div className="p-3 border-t border-[#1a2130] space-y-2.5">
            <Link
              to="/"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200 bg-[#121622] hover:bg-[#161c2b] border border-[#1e2638] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-[11px] font-medium">Public SaaS Website</span>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>

            {/* User Profile Pill */}
            <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl bg-[#141824] border border-[#1f273b]">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
                alt="Elena Rostova"
                className="w-7 h-7 rounded-lg object-cover border border-indigo-400/40 shrink-0"
              />
              <div className="truncate flex-1">
                <div className="text-xs font-semibold text-slate-200 truncate">Elena Rostova</div>
                <div className="text-[10px] text-indigo-300 truncate">VP of Engineering</div>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Online" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
