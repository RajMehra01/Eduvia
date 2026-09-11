import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
        className="relative rounded-2xl md:rounded-3xl border border-[#1D2329] bg-[#12161A] shadow-2xl overflow-hidden"
      >
        {/* Workspace Header Chrome */}
        <div className="h-11 bg-[#171C21] border-b border-[#1D2329] px-4 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#F2A93B]/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80" />
            <span className="text-[11px] font-mono text-[#707A84] ml-2 hidden sm:inline">
              kairo.internal/workspace/proj-101
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#A7B0B8]">
            <span className="w-2 h-2 rounded-full bg-[#19B5A5]" />
            <span className="hidden sm:inline">Sprint #14 (July 15–31)</span>
          </div>
        </div>

        {/* Inner Composed Live Kairo Workspace UI */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-[#0B0D0F]">
          {/* Top Context Bar */}
          <div className="panel-slate rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono font-semibold text-[#2DD4BF]">
                <span>KRO-401 • SPRINT #14</span>
                <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-[10px]">
                  On Track
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#F3F4F1] mt-1">
                Kairo Core Engineering Engine
              </h3>
              <p className="text-xs text-[#A7B0B8]">
                Real-time sprint kanban, story points estimation, and workload balance matrix.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-xl bg-[#171C21] border border-[#1D2329] text-xs font-mono">
                <span className="text-[#707A84]">Active Velocity: </span>
                <span className="text-[#2DD4BF] font-bold">5 / 29 pts (17%)</span>
              </div>
            </div>
          </div>

          {/* Kanban Snippet Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Column 1: Backlog */}
            <div className="bg-[#12161A] rounded-xl p-3 border border-[#1D2329] space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-[#A7B0B8] pb-1 border-b border-[#1D2329]">
                <span>BACKLOG</span>
                <span className="font-mono text-[10px]">1 task (5pt)</span>
              </div>
              <div className="card-slate rounded-lg p-3 space-y-2 border border-[#1D2329]">
                <div className="flex items-center justify-between">
                  <PriorityBadge priority="Blocker" size="xs" />
                  <span className="text-[10px] font-mono text-[#2DD4BF] bg-[#12161A] px-1.5 py-0.5 rounded border border-[#1D2329]">5 pts</span>
                </div>
                <h5 className="text-xs font-semibold text-[#F3F4F1]">JWT Refresh Token Rotation & Throttling</h5>
                <p className="text-[10px] text-[#A7B0B8] line-clamp-2">Harden auth endpoints against replay attacks using sliding expiration.</p>
                <div className="text-[10px] text-[#707A84] font-mono">Due: 2026-07-30</div>
              </div>
            </div>

            {/* Column 2: In Progress */}
            <div className="bg-[#12161A] rounded-xl p-3 border border-[#1D2329] space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-[#2DD4BF] pb-1 border-b border-[#1D2329]">
                <span>IN PROGRESS</span>
                <span className="font-mono text-[10px]">2 tasks (8pt)</span>
              </div>
              <div className="card-slate rounded-lg p-3 space-y-2 border border-[#1D2329]">
                <div className="flex items-center justify-between">
                  <PriorityBadge priority="High" size="xs" />
                  <span className="text-[10px] font-mono text-[#2DD4BF] bg-[#12161A] px-1.5 py-0.5 rounded border border-[#1D2329]">3 pts</span>
                </div>
                <h5 className="text-xs font-semibold text-[#F3F4F1]">Interactive Video Accordion Module</h5>
                <p className="text-[10px] text-[#A7B0B8] line-clamp-2">Collapsible player container with progress synchronization.</p>
                <div className="text-[10px] text-[#707A84] font-mono">Due: 2026-07-28</div>
              </div>
            </div>

            {/* Column 3: Code Review */}
            <div className="bg-[#12161A] rounded-xl p-3 border border-[#1D2329] space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-[#F2A93B] pb-1 border-b border-[#1D2329]">
                <span>CODE REVIEW</span>
                <span className="font-mono text-[10px]">1 task (8pt)</span>
              </div>
              <div className="card-slate rounded-lg p-3 space-y-2 border border-[#1D2329]">
                <div className="flex items-center justify-between">
                  <PriorityBadge priority="High" size="xs" />
                  <span className="text-[10px] font-mono text-[#2DD4BF] bg-[#12161A] px-1.5 py-0.5 rounded border border-[#1D2329]">8 pts</span>
                </div>
                <h5 className="text-xs font-semibold text-[#F3F4F1]">Dynamic Section Drag & Drop Canvas</h5>
                <p className="text-[10px] text-[#A7B0B8] line-clamp-2">Pointer-event reorder controls with collision detection.</p>
                <div className="text-[10px] text-[#707A84] font-mono">Due: 2026-07-29</div>
              </div>
            </div>

            {/* Column 4: Deployed */}
            <div className="bg-[#12161A] rounded-xl p-3 border border-[#1D2329] space-y-2.5 hidden lg:block">
              <div className="flex items-center justify-between text-xs font-semibold text-[#10B981] pb-1 border-b border-[#1D2329]">
                <span>DEPLOYED</span>
                <span className="font-mono text-[10px]">1 task (5pt)</span>
              </div>
              <div className="card-slate rounded-lg p-3 space-y-2 border border-[#10B981]/30">
                <div className="flex items-center justify-between">
                  <PriorityBadge priority="High" size="xs" />
                  <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/15 px-1.5 py-0.5 rounded border border-[#10B981]/30">5 pts</span>
                </div>
                <h5 className="text-xs font-semibold text-[#F3F4F1]">Distributed ACID SQL Transactions</h5>
                <p className="text-[10px] text-[#A7B0B8] line-clamp-2">Row-level rollback handling across multi-tenant shards.</p>
                <div className="text-[10px] text-[#10B981] font-mono">Verified in Production</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Restrained Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0B0D0F] via-[#0B0D0F]/60 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
}
