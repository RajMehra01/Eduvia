import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  KanbanSquare,
  CalendarDays,
  Users2,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PriorityBadge from '../workspace/PriorityBadge';

export default function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState('kanban');

  const tabs = [
    { id: 'overview', label: 'Project Health', icon: Layers },
    { id: 'kanban', label: 'Sprint Kanban', icon: KanbanSquare },
    { id: 'gantt', label: 'Milestone Gantt', icon: CalendarDays },
    { id: 'workload', label: 'Team Workload', icon: Users2 },
    { id: 'velocity', label: 'Sprint Velocity', icon: TrendingUp }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-4 font-sans">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[#2DD4BF] font-bold">KRO • Core Engine</span>
              <span className="px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-mono text-[10px]">
                On Track
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-[#171C21] rounded-xl border border-[#1D2329]">
                <div className="text-[#707A84] text-[11px]">Sprint Velocity</div>
                <div className="text-xl font-bold font-mono text-[#2DD4BF] mt-1">17% Deployed</div>
              </div>
              <div className="p-3 bg-[#171C21] rounded-xl border border-[#1D2329]">
                <div className="text-[#707A84] text-[11px]">Active Scope</div>
                <div className="text-xl font-bold font-mono text-[#F3F4F1] mt-1">29 Story Pts</div>
              </div>
              <div className="p-3 bg-[#171C21] rounded-xl border border-[#1D2329]">
                <div className="text-[#707A84] text-[11px]">Active Deliverables</div>
                <div className="text-xl font-bold font-mono text-[#F3F4F1] mt-1">6 Tasks Registered</div>
              </div>
            </div>
          </div>
        );

      case 'kanban':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans">
            <div className="bg-[#171C21] p-3 rounded-xl border border-[#1D2329] space-y-2">
              <div className="text-[11px] font-bold text-[#A7B0B8] uppercase tracking-wider">Backlog (5pt)</div>
              <div className="bg-[#12161A] p-2.5 rounded-lg border border-[#1D2329] space-y-1.5">
                <PriorityBadge priority="Blocker" size="xs" />
                <div className="font-semibold text-xs text-[#F3F4F1]">JWT Refresh Token Rotation</div>
              </div>
            </div>
            <div className="bg-[#171C21] p-3 rounded-xl border border-[#1D2329] space-y-2">
              <div className="text-[11px] font-bold text-[#2DD4BF] uppercase tracking-wider">In Progress (8pt)</div>
              <div className="bg-[#12161A] p-2.5 rounded-lg border border-[#1D2329] space-y-1.5">
                <PriorityBadge priority="High" size="xs" />
                <div className="font-semibold text-xs text-[#F3F4F1]">Interactive Accordion Module</div>
              </div>
            </div>
            <div className="bg-[#171C21] p-3 rounded-xl border border-[#1D2329] space-y-2">
              <div className="text-[11px] font-bold text-[#10B981] uppercase tracking-wider">Deployed (5pt)</div>
              <div className="bg-[#12161A] p-2.5 rounded-lg border border-[#10B981]/30 space-y-1.5">
                <PriorityBadge priority="High" size="xs" />
                <div className="font-semibold text-xs text-[#F3F4F1]">Distributed ACID Transactions</div>
              </div>
            </div>
          </div>
        );

      case 'gantt':
        return (
          <div className="space-y-3 font-sans">
            <div className="flex justify-between text-xs font-mono text-[#A7B0B8] pb-2 border-b border-[#1D2329]">
              <span>Milestone Deliverable Track</span>
              <span>Sprint #14 (July 15–31)</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-[#171C21] rounded-xl border border-[#1D2329] space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="font-semibold text-[#F3F4F1]">ACID SQL Transactions</span>
                  <span className="font-mono text-[#10B981]">Deployed (100%)</span>
                </div>
                <div className="w-full bg-[#12161A] h-2 rounded-full overflow-hidden border border-[#1D2329]">
                  <div className="bg-[#10B981] h-full w-full rounded-full" />
                </div>
              </div>
              <div className="p-2.5 bg-[#171C21] rounded-xl border border-[#1D2329] space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="font-semibold text-[#F3F4F1]">Interactive Video Accordion</span>
                  <span className="font-mono text-[#2DD4BF]">In Progress (50%)</span>
                </div>
                <div className="w-full bg-[#12161A] h-2 rounded-full overflow-hidden border border-[#1D2329]">
                  <div className="bg-[#19B5A5] h-full w-[50%] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'workload':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
            <div className="p-3 bg-[#171C21] rounded-xl border border-[#1D2329] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#F3F4F1]">Marcus Vance</span>
                <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-[10px] font-semibold">
                  Healthy (33%)
                </span>
              </div>
              <div className="w-full bg-[#12161A] h-1.5 rounded-full overflow-hidden border border-[#1D2329]">
                <div className="bg-[#19B5A5] h-full w-[33%] rounded-full" />
              </div>
              <div className="text-[10px] font-mono text-[#A7B0B8]">13 / 40 Story Points Assigned</div>
            </div>
            <div className="p-3 bg-[#171C21] rounded-xl border border-[#1D2329] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#F3F4F1]">Elena Rostova</span>
                <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-[10px] font-semibold">
                  Healthy (23%)
                </span>
              </div>
              <div className="w-full bg-[#12161A] h-1.5 rounded-full overflow-hidden border border-[#1D2329]">
                <div className="bg-[#19B5A5] h-full w-[23%] rounded-full" />
              </div>
              <div className="text-[10px] font-mono text-[#A7B0B8]">8 / 35 Story Points Assigned</div>
            </div>
          </div>
        );

      case 'velocity':
        return (
          <div className="space-y-4 font-sans">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#A7B0B8]">Sprint Throughput</span>
              <span className="text-[#2DD4BF] font-bold">5 / 29 pts Deployed (17%)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#12161A] overflow-hidden flex gap-0.5 p-0.5 border border-[#1D2329]">
              <div className="bg-[#707A84] rounded-l-full w-[17%]" title="Backlog: 5 pts" />
              <div className="bg-[#19B5A5] w-[28%]" title="In Progress: 8 pts" />
              <div className="bg-[#F2A93B] w-[28%]" title="Review: 8 pts" />
              <div className="bg-[#0EA5E9] w-[10%]" title="QA: 3 pts" />
              <div className="bg-[#10B981] rounded-r-full w-[17%]" title="Deployed: 5 pts" />
            </div>
            <div className="flex justify-between text-[11px] text-[#A7B0B8] font-mono">
              <span>Backlog: 5pt</span>
              <span>In Prog: 8pt</span>
              <span>Review: 8pt</span>
              <span>QA: 3pt</span>
              <span className="text-[#10B981] font-bold">Deployed: 5pt</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono font-semibold text-[#2DD4BF] uppercase tracking-wider">
          Complete Operational Suite
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#F3F4F1] tracking-tight">
          One system for the entire sprint lifecycle.
        </h2>
        <p className="text-xs sm:text-sm text-[#A7B0B8] max-w-xl mx-auto">
          Explore interactive views designed specifically to eliminate friction between engineering planning and production releases.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                active
                  ? 'bg-[#19B5A5] text-[#0B0D0F] shadow-sm'
                  : 'bg-[#171C21] text-[#A7B0B8] hover:text-[#F3F4F1] border border-[#1D2329]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Tab Card Display */}
      <div className="panel-slate rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto border border-[#1D2329] shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        <div className="pt-6 mt-6 border-t border-[#1D2329] flex items-center justify-between">
          <span className="text-xs text-[#A7B0B8]">Ready to explore the active workspace?</span>
          <Link
            to="/app"
            className="text-xs font-semibold text-[#2DD4BF] hover:text-[#19B5A5] flex items-center gap-1 transition-colors"
          >
            <span>Open live workspace</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
