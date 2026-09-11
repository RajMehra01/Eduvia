import React from 'react';
import { CalendarDays, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function TimelineGantt() {
  const { activeProject, activeTasks, setSelectedTask } = useProject();

  const days = [
    'Jul 18', 'Jul 20', 'Jul 22', 'Jul 24', 'Jul 26', 'Jul 28', 'Jul 30', 'Aug 01'
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'deployed':
        return 'bg-[#10B981] border-[#10B981]/80 text-[#0B0D0F]';
      case 'in_progress':
        return 'bg-[#19B5A5] border-[#2DD4BF]/80 text-[#0B0D0F]';
      case 'review':
        return 'bg-[#F2A93B] border-[#F2A93B]/80 text-[#0B0D0F]';
      case 'qa':
        return 'bg-[#0EA5E9] border-[#0EA5E9]/80 text-[#0B0D0F]';
      default:
        return 'bg-[#707A84] border-[#707A84]/80 text-[#F3F4F1]';
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
      <div className="panel-slate rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#1D2329]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F3F4F1] tracking-tight flex items-center gap-2.5">
            <CalendarDays className="w-6 h-6 text-[#2DD4BF]" />
            Milestone Gantt Schedule
          </h1>
          <p className="text-xs text-[#A7B0B8] mt-0.5">
            Synchronized deliverable tracks and target milestone deadlines for {activeProject?.name}.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#171C21] border border-[#1D2329] text-[#2DD4BF]">
            <Calendar className="w-3.5 h-3.5" />
            <span>Sprint #14 (July 15–31)</span>
          </div>
        </div>
      </div>

      {/* Gantt Timeline Container */}
      <div className="panel-slate rounded-2xl p-5 space-y-4 border border-[#1D2329]">
        {/* Timeline Header Date Scale */}
        <div className="grid grid-cols-12 gap-2 pb-3 border-b border-[#1D2329] text-[11px] font-mono text-[#707A84]">
          <div className="col-span-12 sm:col-span-5 font-semibold text-[#A7B0B8]">Deliverable Work Item</div>
          <div className="hidden sm:grid col-span-7 grid-cols-8 text-center">
            {days.map((d, i) => (
              <span key={i} className="text-[#707A84]">{d}</span>
            ))}
          </div>
        </div>

        {/* Deliverable Track Rows */}
        <div className="space-y-3 pt-1">
          {activeTasks.map((task) => {
            const width = getCompletionWidth(task.status);
            const statusColor = getStatusColor(task.status);

            return (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className="p-3 bg-[#171C21] hover:bg-[#1D2329] rounded-xl border border-[#1D2329] space-y-2.5 cursor-pointer transition-colors"
              >
                {/* Task Information Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded capitalize font-bold ${
                        task.status === 'deployed'
                          ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
                          : task.status === 'in_progress'
                          ? 'bg-[#19B5A5]/15 text-[#2DD4BF] border border-[#19B5A5]/30'
                          : task.status === 'review'
                          ? 'bg-[#F2A93B]/15 text-[#F2A93B] border border-[#F2A93B]/30'
                          : 'bg-[#12161A] text-[#A7B0B8] border border-[#1D2329]'
                      }`}
                    >
                      {task.status.replace('_', ' ')}
                    </span>
                    <span className="font-semibold text-[#F3F4F1] truncate hover:text-[#2DD4BF] transition-colors">
                      {task.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 text-[11px] font-mono">
                    <span className="text-[#707A84] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#707A84]" /> Due: {task.dueDate}
                    </span>
                    <span className="text-[#2DD4BF] bg-[#12161A] px-2 py-0.5 rounded border border-[#1D2329]">
                      {task.points} pts
                    </span>
                    <span className="text-[#A7B0B8] font-medium">
                      {task.assignee?.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Visual Gantt Bar Schedule */}
                <div className="w-full bg-[#12161A] h-3.5 rounded-full overflow-hidden p-0.5 border border-[#1D2329] relative">
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
