import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  KanbanSquare,
  CalendarDays,
  Users2,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Clock,
  ShieldCheck
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
              <span className="font-mono text-indigo-400 font-bold">KRO • Distributed Real-Time Core Engine</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-mono text-[10px]">
                On Track
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-[#131722] rounded-xl border border-[#1e2638]">
                <div className="text-slate-400 text-[11px]">Sprint Velocity</div>
                <div className="text-xl font-bold font-mono text-indigo-300 mt-1">78% Rate</div>
              </div>
              <div className="p-3 bg-[#131722] rounded-xl border border-[#1e2638]">
                <div className="text-slate-400 text-[11px]">Active Scope</div>
                <div className="text-xl font-bold font-mono text-slate-200 mt-1">29 Story Pts</div>
              </div>
              <div className="p-3 bg-[#131722] rounded-xl border border-[#1e2638]">
                <div className="text-slate-400 text-[11px]">Resolved Blockers</div>
                <div className="text-xl font-bold font-mono text-emerald-400 mt-1">100% Cleared</div>
              </div>
            </div>
          </div>
        );

      case 'kanban':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans">
            <div className="bg-[#121622] p-3 rounded-xl border border-[#1e2638] space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Backlog (5pt)</div>
              <div className="bg-[#151a28] p-2.5 rounded-lg border border-[#212b3e] space-y-1.5">
                <PriorityBadge priority="Blocker" size="xs" />
                <div className="font-semibold text-xs text-slate-200">JWT Token Rotation & Throttling</div>
              </div>
            </div>
            <div className="bg-[#121622] p-3 rounded-xl border border-[#1e2638] space-y-2">
              <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">In Progress (8pt)</div>
              <div className="bg-[#151a28] p-2.5 rounded-lg border border-[#212b3e] space-y-1.5">
                <PriorityBadge priority="High" size="xs" />
                <div className="font-semibold text-xs text-slate-200">Interactive Accordion Module</div>
              </div>
            </div>
            <div className="bg-[#121622] p-3 rounded-xl border border-[#1e2638] space-y-2">
              <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Deployed (5pt)</div>
              <div className="bg-[#151a28] p-2.5 rounded-lg border border-emerald-950/50 space-y-1.5">
                <PriorityBadge priority="Blocker" size="xs" />
                <div className="font-semibold text-xs text-slate-200">Distributed ACID Transactions</div>
              </div>
            </div>
          </div>
        );

      case 'gantt':
        return (
          <div className="space-y-3 font-sans">
            <div className="flex justify-between text-xs font-mono text-slate-400 pb-2 border-b border-[#1c2333]">
              <span>Milestone Deliverable Track</span>
              <span>Sprint Target: Jul 31</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-[#131722] rounded-xl border border-[#1e2638] space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="font-semibold text-slate-200">ACID SQL Transaction Sharding</span>
                  <span className="font-mono text-emerald-400">Deployed 100%</span>
                </div>
                <div className="w-full bg-[#1b2233] h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-full rounded-full" />
                </div>
              </div>
              <div className="p-2.5 bg-[#131722] rounded-xl border border-[#1e2638] space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="font-semibold text-slate-200">Interactive Video Accordion Frame</span>
                  <span className="font-mono text-indigo-400">In Progress 60%</span>
                </div>
                <div className="w-full bg-[#1b2233] h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[60%] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'workload':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
            <div className="p-3 bg-[#131722] rounded-xl border border-[#1e2638] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">Marcus Vance</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60 text-[10px] font-semibold">
                  Healthy (65%)
                </span>
              </div>
              <div className="w-full bg-[#1b2233] h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full w-[65%] rounded-full" />
              </div>
              <div className="text-[10px] font-mono text-slate-400">26 / 40 Story Points Allocated</div>
            </div>
            <div className="p-3 bg-[#131722] rounded-xl border border-[#1e2638] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">Elena Rostova</span>
                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/60 text-[10px] font-semibold">
                  At Capacity (80%)
                </span>
              </div>
              <div className="w-full bg-[#1b2233] h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[80%] rounded-full" />
              </div>
              <div className="text-[10px] font-mono text-slate-400">28 / 35 Story Points Allocated</div>
            </div>
          </div>
        );

      case 'velocity':
        return (
          <div className="space-y-4 font-sans">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Sprint Throughput Telemetry</span>
              <span className="text-indigo-300 font-bold">Velocity: 78% Target Reached</span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#181d2a] overflow-hidden flex gap-0.5 p-0.5 border border-[#222a3d]">
              <div className="bg-slate-500 rounded-l-full w-[15%]" title="Backlog: 5 pts" />
              <div className="bg-indigo-500 w-[35%]" title="In Progress: 8 pts" />
              <div className="bg-sky-500 w-[20%]" title="Review/QA: 8 pts" />
              <div className="bg-emerald-500 rounded-r-full w-[30%]" title="Deployed: 5 pts" />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>Backlog: 5pt</span>
              <span>Prog: 8pt</span>
              <span>Review: 8pt</span>
              <span className="text-emerald-400 font-bold">Deployed: 5pt</span>
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
        <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
          Complete Operational Suite
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
          One system for the entire sprint lifecycle.
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
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
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-[#141824] text-slate-400 hover:text-slate-200 border border-[#20283b]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Tab Card Display */}
      <div className="panel-slate rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto border border-[#222b3e] shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        <div className="pt-6 mt-6 border-t border-[#1c2333] flex items-center justify-between">
          <span className="text-xs text-slate-400">Want to test this live with real sprint items?</span>
          <Link
            to="/app"
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
          >
            <span>Open live workspace</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
