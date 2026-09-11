import React from 'react';
import { motion } from 'framer-motion';
import {
  Layers,
  KanbanSquare,
  Users2,
  CalendarDays,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function ProductStory() {
  const chapters = [
    {
      step: '01',
      title: 'Project Visibility Without Fog',
      badge: 'Visibility',
      icon: Layers,
      what: 'Unified multi-project roadmaps with real-time health indicators (On Track, At Risk, Delayed).',
      why: 'Engineering teams often lose sight of deliverable critical paths when buried in complex multi-repo tickets.',
      how: 'Kairo aggregates scope, story points, and health directly into an executive overview that updates on every commit and task status change.',
      preview: (
        <div className="bg-[#121622] rounded-2xl p-4 border border-[#212a3d] space-y-3 font-sans">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-indigo-400 font-bold">KRO • Distributed Core</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60 text-[10px]">
              On Track
            </span>
          </div>
          <div className="w-full bg-[#181d2a] h-2 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full w-[78%] rounded-full" />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>Sprint #14</span>
            <span className="text-indigo-300 font-bold">24 / 29 Story Points (82%)</span>
          </div>
        </div>
      )
    },
    {
      step: '02',
      title: 'Disciplined Sprint Kanban Execution',
      badge: 'Execution',
      icon: KanbanSquare,
      what: '5-stage sprint workflow (Backlog, In Progress, Code Review, QA Testing, Deployed) with Fibonacci story points.',
      why: 'Task boards that allow untracked scope creep cause sprint goals to fail silently.',
      how: 'Every work item carries strict effort estimations (1, 2, 3, 5, 8 pts) with automated stage summaries and subtask completion tracking.',
      preview: (
        <div className="bg-[#121622] rounded-2xl p-4 border border-[#212a3d] space-y-2.5 font-sans">
          <div className="flex items-center justify-between text-xs">
            <span className="px-2 py-0.5 rounded bg-indigo-950/70 border border-indigo-800/50 text-indigo-300 font-bold text-[10px]">
              In Progress • 3 pts
            </span>
            <span className="text-[10px] font-mono text-slate-400">Due Jul 28</span>
          </div>
          <div className="font-semibold text-xs text-slate-100">Interactive Accordion Syllabus Module</div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>2 of 2 subtasks completed</span>
          </div>
        </div>
      )
    },
    {
      step: '03',
      title: 'Team Workload & Burnout Defense',
      badge: 'Capacity',
      icon: Users2,
      what: 'Real-time developer bandwidth allocation measuring assigned story points against individual capacity.',
      why: 'Overloading senior engineers while others are under-utilized leads to missed milestones and technical debt.',
      how: 'Semantic thresholds trigger immediate visual status indicators (Healthy <75%, At Capacity 75–90%, Overloaded >90%) with task breakdowns.',
      preview: (
        <div className="bg-[#121622] rounded-2xl p-4 border border-[#212a3d] space-y-3 font-sans">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">
                MV
              </div>
              <span className="font-semibold text-slate-200">Marcus Vance</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/60 text-[10px] font-semibold">
              At Capacity (75%)
            </span>
          </div>
          <div className="w-full bg-[#181d2a] h-2 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full w-[75%] rounded-full" />
          </div>
          <div className="text-[11px] text-slate-400 flex justify-between font-mono">
            <span>Capacity Limit: 40 pts</span>
            <span className="text-slate-200">30 pts Allocated</span>
          </div>
        </div>
      )
    },
    {
      step: '04',
      title: 'Milestone Gantt & Delivery Velocity',
      badge: 'Velocity',
      icon: CalendarDays,
      what: 'Visual schedule progress tracking milestone dates alongside real-time velocity burndown telemetry.',
      why: 'Stakeholders need clear, predictable delivery timelines without requiring engineers to manually update spreadsheets.',
      how: 'Gantt tracks automatically calculate task progress from active Kanban stages, showing exact deliverable trajectories.',
      preview: (
        <div className="bg-[#121622] rounded-2xl p-4 border border-[#212a3d] space-y-2.5 font-sans">
          <div className="flex justify-between text-xs font-mono text-slate-300">
            <span>Milestone Schedule</span>
            <span className="text-emerald-400 font-bold">Velocity: 78%</span>
          </div>
          <div className="space-y-1.5 pt-1">
            <div className="w-full bg-[#181d2a] h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[100%] rounded-full" />
            </div>
            <div className="w-full bg-[#181d2a] h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full w-[65%] rounded-full" />
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="story" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
          Engineered for Flow
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
          How Kairo transforms project delivery.
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          Every tool in Kairo connects directly to real engineering operations — from architecture sprints to production deployment.
        </p>
      </div>

      {/* Chapters Sequence */}
      <div className="space-y-12">
        {chapters.map((chapter, idx) => {
          const isEven = idx % 2 === 0;
          const Icon = chapter.icon;

          return (
            <motion.div
              key={chapter.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className={`panel-slate rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Text Side: WHAT + WHY + HOW */}
              <div className="flex-1 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-950/70 border border-indigo-800/60 px-2.5 py-1 rounded-lg">
                    {chapter.step}
                  </span>
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    {chapter.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
                  {chapter.title}
                </h3>

                <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                      WHAT IT IS
                    </span>
                    <p className="text-slate-300">{chapter.what}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400/80 font-bold block">
                      WHY IT MATTERS
                    </span>
                    <p className="text-slate-400">{chapter.why}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/80 font-bold block">
                      HOW IT WORKS
                    </span>
                    <p className="text-slate-300">{chapter.how}</p>
                  </div>
                </div>
              </div>

              {/* Composed Visual Side */}
              <div className="w-full lg:w-[420px] shrink-0 bg-[#0d1017] p-4 sm:p-6 rounded-2xl border border-[#1f2738] shadow-xl">
                {chapter.preview}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
