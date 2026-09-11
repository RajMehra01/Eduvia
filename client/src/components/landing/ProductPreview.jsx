import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Layers,
  CheckCircle2,
  TrendingUp,
  Users,
  Calendar,
  AlertTriangle,
  KanbanSquare,
  Activity
} from 'lucide-react';
import PriorityBadge from '../workspace/PriorityBadge';

export default function ProductPreview() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]);

  return (
    <div id="preview" ref={containerRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-24">
      {/* Product Frame Container with Scroll-driven Parallax */}
      <motion.div
        style={{ y, scale }}
        className="relative rounded-2xl md:rounded-3xl border border-[#232b3e] bg-[#0e121a] shadow-2xl overflow-hidden"
      >
        {/* Mock Browser/Workspace Top Header Chrome */}
        <div className="h-11 bg-[#121622] border-b border-[#1c2333] px-4 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-[11px] font-mono text-slate-400 ml-2 hidden sm:inline">
              kairo.internal/workspace/proj-101
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="hidden sm:inline">Sprint #14 Active</span>
          </div>
        </div>

        {/* Inner Composed Live Kairo Workspace UI */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-[#0b0d11]">
          {/* Top Context Bar */}
          <div className="panel-slate rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono font-semibold text-indigo-400">
                <span>KRO-401 • SPRINT #14</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60 text-[10px]">
                  On Track
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-100 mt-1">
                Kairo Distributed Real-Time Core Engine
              </h3>
              <p className="text-xs text-slate-400">
                High-throughput event streaming, distributed transaction pipeline, and workload matrix balancing.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-xl bg-[#151a26] border border-[#232b3e] text-xs font-mono">
                <span className="text-slate-400">Velocity: </span>
                <span className="text-indigo-300 font-bold">78%</span>
              </div>
            </div>
          </div>

          {/* Kanban Snippet Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Column 1: Backlog */}
            <div className="bg-[#0f1219] rounded-xl p-3 border border-[#1b2233] space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 pb-1 border-b border-[#1b2233]">
                <span>BACKLOG</span>
                <span className="font-mono text-[10px]">1 task (5pt)</span>
              </div>
              <div className="card-slate rounded-lg p-3 space-y-2 border border-[#1d2538]">
                <div className="flex items-center justify-between">
                  <PriorityBadge priority="Blocker" size="xs" />
                  <span className="text-[10px] font-mono text-indigo-300 bg-[#161d2b] px-1.5 py-0.5 rounded">5 pts</span>
                </div>
                <h5 className="text-xs font-semibold text-slate-100">JWT Refresh Token Rotation & Throttling</h5>
                <p className="text-[10px] text-slate-400 line-clamp-2">Harden auth endpoints against replay attacks using sliding expiration.</p>
                <div className="text-[10px] text-slate-400 font-mono">Due: 2026-07-30</div>
              </div>
            </div>

            {/* Column 2: In Progress */}
            <div className="bg-[#0f1219] rounded-xl p-3 border border-[#1b2233] space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-indigo-400 pb-1 border-b border-[#1b2233]">
                <span>IN PROGRESS</span>
                <span className="font-mono text-[10px]">2 tasks (8pt)</span>
              </div>
              <div className="card-slate rounded-lg p-3 space-y-2 border border-[#1d2538]">
                <div className="flex items-center justify-between">
                  <PriorityBadge priority="High" size="xs" />
                  <span className="text-[10px] font-mono text-indigo-300 bg-[#161d2b] px-1.5 py-0.5 rounded">3 pts</span>
                </div>
                <h5 className="text-xs font-semibold text-slate-100">Interactive Video Accordion Syllabus Component</h5>
                <p className="text-[10px] text-slate-400 line-clamp-2">Design responsive collapsible module player container with progress sync.</p>
                <div className="text-[10px] text-slate-400 font-mono">Due: 2026-07-28</div>
              </div>
            </div>

            {/* Column 3: Code Review */}
            <div className="bg-[#0f1219] rounded-xl p-3 border border-[#1b2233] space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-purple-400 pb-1 border-b border-[#1b2233]">
                <span>CODE REVIEW</span>
                <span className="font-mono text-[10px]">1 task (8pt)</span>
              </div>
              <div className="card-slate rounded-lg p-3 space-y-2 border border-[#1d2538]">
                <div className="flex items-center justify-between">
                  <PriorityBadge priority="High" size="xs" />
                  <span className="text-[10px] font-mono text-indigo-300 bg-[#161d2b] px-1.5 py-0.5 rounded">8 pts</span>
                </div>
                <h5 className="text-xs font-semibold text-slate-100">Dynamic Section Order Drag Canvas Engine</h5>
                <p className="text-[10px] text-slate-400 line-clamp-2">Pointer-event reorder controls with collision detection.</p>
                <div className="text-[10px] text-slate-400 font-mono">Due: 2026-07-29</div>
              </div>
            </div>

            {/* Column 4: Deployed */}
            <div className="bg-[#0f1219] rounded-xl p-3 border border-[#1b2233] space-y-2.5 hidden lg:block">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 pb-1 border-b border-[#1b2233]">
                <span>DEPLOYED</span>
                <span className="font-mono text-[10px]">1 task (5pt)</span>
              </div>
              <div className="card-slate rounded-lg p-3 space-y-2 border border-emerald-950/40">
                <div className="flex items-center justify-between">
                  <PriorityBadge priority="Blocker" size="xs" />
                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded">5 pts</span>
                </div>
                <h5 className="text-xs font-semibold text-slate-100">Distributed ACID SQL Transactions</h5>
                <p className="text-[10px] text-slate-400 line-clamp-2">Guarantee zero race-condition stock deduction across multi-tenant shards.</p>
                <div className="text-[10px] text-emerald-400 font-mono">Verified in Production</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Restrained Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#0b0d11] via-[#0b0d11]/70 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
}
