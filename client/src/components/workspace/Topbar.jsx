import React from 'react';
import { Menu, Search, Plus, TrendingUp, Filter, Activity } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export default function Topbar({ onOpenMobileMenu }) {
  const {
    activeProject,
    searchQuery,
    setSearchQuery,
    filterPriority,
    setFilterPriority,
    setShowCreateModal,
    metrics
  } = useProject();

  const isAtRisk = activeProject?.health === 'at_risk';

  return (
    <header className="sticky top-0 z-30 h-14 bg-[#0d1017]/90 backdrop-blur-md border-b border-[#1a2130] px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Project Context */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileMenu}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#151a26] lg:hidden shrink-0"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 truncate">
          <span className="text-xs font-semibold text-slate-200 truncate hidden sm:inline">
            {activeProject?.name || 'Kairo Core Engine'}
          </span>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border flex items-center gap-1 shrink-0 ${
              isAtRisk
                ? 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                : 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isAtRisk ? 'bg-amber-400' : 'bg-emerald-400'}`} />
            {isAtRisk ? 'At Risk' : 'On Track'}
          </span>
        </div>
      </div>

      {/* Center/Right: Search, Filter, Velocity Pill, Create Button */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative hidden md:block w-52 lg:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Filter active tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#131722] border border-[#1f2637] rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Priority Filter */}
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="hidden sm:block bg-[#131722] border border-[#1f2637] rounded-xl px-2.5 py-1.5 text-xs font-medium text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="All">All Priorities</option>
          <option value="Blocker">Blocker</option>
          <option value="High">High</option>
          <option value="Normal">Normal</option>
          <option value="Low">Low</option>
        </select>

        {/* Sprint Velocity Indicator */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-xl bg-[#131722] border border-[#1f2637] text-xs">
          <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-slate-400 text-[11px]">Sprint Velocity:</span>
          <span className="font-mono font-bold text-indigo-300 text-[11px]">
            {metrics.deployedPoints}/{metrics.totalPoints} pts ({metrics.velocityRate}%)
          </span>
        </div>

        {/* Primary Create Action */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm shadow-indigo-600/30 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Task</span>
        </button>
      </div>
    </header>
  );
}
