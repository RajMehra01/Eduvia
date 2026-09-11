import React from 'react';
import { motion } from 'framer-motion';
import {
  Layers,
  KanbanSquare,
  Users2,
  CalendarDays,
  CheckCircle2
} from 'lucide-react';

export default function ProductStory() {
  const chapters = [
    {
      step: '01',
      title: 'Project Visibility Without Noise',
      badge: 'Visibility',
      icon: Layers,
      what: 'Unified multi-project roadmaps with real-time status indicators (On Track, At Risk, Delayed).',
      why: 'Engineering teams often lose sight of critical paths when buried across disparate ticket boards.',
      how: 'Kairo aggregates scope, story points, and sprint status directly into an executive dashboard that updates with every task change.',
      preview: (
        <div className="bg-[#171C21] rounded-2xl p-4 border border-[#1D2329] space-y-3 font-sans">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-[#2DD4BF] font-bold">KRO • Core Engine</span>
            <span className="px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-[10px]">
              On Track
            </span>
          </div>
          <div className="w-full bg-[#12161A] h-2 rounded-full overflow-hidden border border-[#1D2329]">
            <div className="bg-[#19B5A5] h-full w-[65%] rounded-full" />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-[#A7B0B8]">
            <span>Sprint #14</span>
            <span className="text-[#2DD4BF] font-bold">5 / 29 Story Points</span>
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
      how: 'Every work item carries clear effort estimations (1, 2, 3, 5, 8 pts) with stage tracking and subtask checklists.',
      preview: (
        <div className="bg-[#171C21] rounded-2xl p-4 border border-[#1D2329] space-y-2.5 font-sans">
          <div className="flex items-center justify-between text-xs">
            <span className="px-2 py-0.5 rounded bg-[#19B5A5]/15 border border-[#19B5A5]/30 text-[#2DD4BF] font-bold text-[10px]">
              In Progress • 3 pts
            </span>
            <span className="text-[10px] font-mono text-[#707A84]">Due Jul 28</span>
          </div>
          <div className="font-semibold text-xs text-[#F3F4F1]">Interactive Accordion Syllabus Module</div>
          <div className="flex items-center gap-2 text-[11px] text-[#A7B0B8]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
            <span>1 of 2 subtasks completed</span>
          </div>
        </div>
      )
    },
    {
      step: '03',
      title: 'Team Workload & Capacity Defense',
      badge: 'Capacity',
      icon: Users2,
      what: 'Real-time developer bandwidth allocation measuring assigned story points against individual limits.',
      why: 'Overloading senior engineers while others are under-utilized leads to missed milestones and fatigue.',
      how: 'Semantic thresholds trigger immediate visual status indicators (Healthy <75%, At Capacity 75–90%, Overloaded >90%).',
      preview: (
        <div className="bg-[#171C21] rounded-2xl p-4 border border-[#1D2329] space-y-3 font-sans">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#19B5A5] text-[#0B0D0F] font-bold flex items-center justify-center text-[10px]">
                MV
              </div>
              <span className="font-semibold text-[#F3F4F1]">Marcus Vance</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-[10px] font-semibold">
              Healthy (33%)
            </span>
          </div>
          <div className="w-full bg-[#12161A] h-2 rounded-full overflow-hidden border border-[#1D2329]">
            <div className="bg-[#19B5A5] h-full w-[33%] rounded-full" />
          </div>
          <div className="text-[11px] text-[#A7B0B8] flex justify-between font-mono">
            <span>Limit: 40 pts</span>
            <span className="text-[#F3F4F1]">13 pts Assigned</span>
          </div>
        </div>
      )
    },
    {
      step: '04',
      title: 'Milestone Gantt & Delivery Velocity',
      badge: 'Velocity',
      icon: CalendarDays,
      what: 'Visual schedule progress tracking milestone dates alongside real-time velocity metrics.',
      why: 'Stakeholders need clear, predictable delivery timelines without requiring engineers to manually update spreadsheets.',
      how: 'Gantt tracks automatically calculate task progress from active stages, showing deliverable trajectories.',
      preview: (
        <div className="bg-[#171C21] rounded-2xl p-4 border border-[#1D2329] space-y-2.5 font-sans">
          <div className="flex justify-between text-xs font-mono text-[#F3F4F1]">
            <span>Milestone Schedule</span>
            <span className="text-[#2DD4BF] font-bold">Sprint #14 (July 15–31)</span>
          </div>
          <div className="space-y-1.5 pt-1">
            <div className="w-full bg-[#12161A] h-2 rounded-full overflow-hidden border border-[#1D2329]">
              <div className="bg-[#10B981] h-full w-[100%] rounded-full" />
            </div>
            <div className="w-full bg-[#12161A] h-2 rounded-full overflow-hidden border border-[#1D2329]">
              <div className="bg-[#19B5A5] h-full w-[65%] rounded-full" />
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
        <span className="text-xs font-mono font-semibold text-[#2DD4BF] uppercase tracking-wider">
          Engineered for Flow
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#F3F4F1] tracking-tight">
          How Kairo transforms sprint delivery.
        </h2>
        <p className="text-xs sm:text-sm text-[#A7B0B8] max-w-xl mx-auto leading-relaxed">
          Every tool in Kairo connects directly to real engineering execution — from sprint planning to production release.
        </p>
      </div>

      {/* Chapters Sequence */}
      <div className="space-y-10">
        {chapters.map((chapter, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={chapter.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className={`panel-slate rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 border border-[#1D2329] ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Text Side */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#2DD4BF] bg-[#171C21] border border-[#1D2329] px-2.5 py-1 rounded-lg">
                    {chapter.step}
                  </span>
                  <span className="text-xs font-semibold text-[#A7B0B8] uppercase tracking-wider">
                    {chapter.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#F3F4F1] tracking-tight">
                  {chapter.title}
                </h3>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#707A84] font-bold block">
                      WHAT IT IS
                    </span>
                    <p className="text-[#F3F4F1]">{chapter.what}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#F2A93B] font-bold block">
                      WHY IT MATTERS
                    </span>
                    <p className="text-[#A7B0B8]">{chapter.why}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#2DD4BF] font-bold block">
                      HOW IT WORKS
                    </span>
                    <p className="text-[#F3F4F1]">{chapter.how}</p>
                  </div>
                </div>
              </div>

              {/* Composed Visual Side */}
              <div className="w-full lg:w-[400px] shrink-0 bg-[#12161A] p-4 sm:p-5 rounded-2xl border border-[#1D2329] shadow-lg">
                {chapter.preview}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
