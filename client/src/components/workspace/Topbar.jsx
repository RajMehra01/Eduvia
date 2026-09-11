import React from 'react';
import { Menu, Search, Plus, TrendingUp } from 'lucide-react';
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
    <header className="sticky top-0 z-30 h-14 bg-[#0B0D0F]/90 backdrop-blur-md border-b border-[#1D2329] px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Project Context */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileMenu}
          className="p-1.5 rounded-lg text-[#A7B0B8] hover:text-[#F3F4F1] hover:bg-[#171C21] lg:hidden shrink-0"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 truncate">
          <span className="text-xs font-semibold text-[#F3F4F1] truncate hidden sm:inline">
            {activeProject?.name || 'Kairo Core Engine'}
          </span>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border flex items-center gap-1 shrink-0 ${
              isAtRisk
                ? 'bg-[#F2A93B]/15 text-[#F2A93B] border-[#F2A93B]/30'
                : 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isAtRisk ? 'bg-[#F2A93B]' : 'bg-[#10B981]'}`} />
            {isAtRisk ? 'At Risk' : 'On Track'}
          </span>
        </div>
      </div>

      {/* Center/Right: Search, Filter, Velocity Pill, Create Button */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative hidden md:block w-52 lg:w-64">
          <Search className="w-3.5 h-3.5 text-[#707A84] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Filter active tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#12161A] border border-[#1D2329] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#F3F4F1] placeholder-[#707A84] focus:outline-none focus:border-[#19B5A5] transition-colors font-normal"
          />
        </div>

        {/* Priority Filter */}
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="hidden sm:block bg-[#12161A] border border-[#1D2329] rounded-xl px-2.5 py-1.5 text-xs font-medium text-[#A7B0B8] focus:outline-none focus:border-[#19B5A5] cursor-pointer"
        >
          <option value="All">All Priorities</option>
          <option value="Blocker">Blocker</option>
          <option value="High">High</option>
          <option value="Normal">Normal</option>
          <option value="Low">Low</option>
        </select>

        {/* Sprint Velocity Indicator */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-xl bg-[#12161A] border border-[#1D2329] text-xs">
          <TrendingUp className="w-3.5 h-3.5 text-[#2DD4BF]" />
          <span className="text-[#707A84] text-[11px]">Sprint Velocity:</span>
          <span className="font-mono font-bold text-[#2DD4BF] text-[11px]">
            {metrics.deployedPoints}/{metrics.totalPoints} pts ({metrics.velocityRate}%)
          </span>
        </div>

        {/* Primary Create Action */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-3.5 py-1.5 rounded-xl bg-[#19B5A5] hover:bg-[#149A8C] text-[#0B0D0F] font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Task</span>
        </button>
      </div>
    </header>
  );
}
