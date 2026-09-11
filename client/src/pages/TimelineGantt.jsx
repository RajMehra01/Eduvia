import React from 'react';
import { CalendarDays, Calendar, Clock, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function TimelineGantt() {
  const { activeProject, activeTasks, setSelectedTask } = useProject();

  const days = [
    'Jul 18', 'Jul 20', 'Jul 22', 'Jul 24', 'Jul 26', 'Jul 28', 'Jul 30', 'Aug 01'
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'deployed':
        return 'bg-emerald-500 border-emerald-400/80 text-emerald-100';
      case 'in_progress':
        return 'bg-indigo-500 border-indigo-400/80 text-indigo-100';
      case 'review':
        return 'bg-purple-500 border-purple-400/80 text-purple-100';
      case 'qa':
        return 'bg-sky-500 border-sky-400/80 text-sky-100';
      default:
        return 'bg-slate-600 border-slate-500/80 text-slate-200';
    }
  };

  const getCompletionWidth = (status) => {
    switch (status) {
      case 'deployed':
        return '100%';
      case 'qa':
        return '85%';
      case 'review':
        return '70%';
      case 'in_progress':
        return '50%';
      default:
        return '20%';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="panel-slate rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2.5">
            <CalendarDays className="w-6 h-6 text-indigo-400" />
            Milestone Gantt Schedule
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Synchronized deliverable tracks and target milestone deadlines for {activeProject?.name}.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#161b26] border border-[#232b3e] text-indigo-300">
            <Calendar className="w-3.5 h-3.5" />
            <span>Sprint #14 (July 15 – 31)</span>
          </div>
        </div>
      </div>

      {/* Gantt Timeline Container */}
      <div className="panel-slate rounded-2xl p-5 space-y-4 border border-[#1f2637]">
        {/* Timeline Header Date Scale */}
        <div className="grid grid-cols-12 gap-2 pb-3 border-b border-[#1c2333] text-[11px] font-mono text-slate-400">
          <div className="col-span-12 sm:col-span-5 font-semibold text-slate-300">Deliverable Work Item</div>
          <div className="hidden sm:grid col-span-7 grid-cols-8 text-center">
            {days.map((d, i) => (
              <span key={i} className="text-slate-400">{d}</span>
            ))}
          </div>
        </div>

        {/* Deliverable Track Rows */}
        <div className="space-y-4 pt-1">
          {activeTasks.map((task) => {
            const width = getCompletionWidth(task.status);
            const statusColor = getStatusColor(task.status);

            return (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className="p-3 bg-[#131722] hover:bg-[#171c2a] rounded-xl border border-[#1c2436] space-y-2.5 cursor-pointer transition-colors"
              >
                {/* Task Information Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded capitalize font-bold ${
                        task.status === 'deployed'
                          ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/60'
                          : task.status === 'in_progress'
                          ? 'bg-indigo-950/70 text-indigo-300 border border-indigo-800/60'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {task.status.replace('_', ' ')}
                    </span>
                    <span className="font-semibold text-slate-200 truncate hover:text-indigo-400 transition-colors">
                      {task.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 text-[11px] font-mono">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> Due: {task.dueDate}
                    </span>
                    <span className="text-indigo-300 bg-[#192030] px-2 py-0.5 rounded border border-[#27324c]">
                      {task.points} pts
                    </span>
                    <span className="text-slate-300 font-medium">
                      {task.assignee?.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Visual Gantt Bar Schedule */}
                <div className="w-full bg-[#181d2a] h-3.5 rounded-full overflow-hidden p-0.5 border border-[#222a3d] relative">
                  <div
                    className={`h-full rounded-full transition-all duration-500 border ${statusColor}`}
                    style={{ width }}
                  >
                    <div className="h-full flex items-center justify-end pr-1.5">
                      {task.status === 'deployed' && (
                        <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
