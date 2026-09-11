import React from 'react';
import { CheckSquare, Calendar, ArrowRight, MessageSquare } from 'lucide-react';
import PriorityBadge from './PriorityBadge';
import { useProject } from '../../context/ProjectContext';

export default function TaskCard({ task, onClick }) {
  const { moveTaskStatus } = useProject();

  const completedSubtasks = task.subtasks?.filter(s => s.completed)?.length || 0;
  const totalSubtasks = task.subtasks?.length || 0;
  const commentCount = task.comments?.length || 0;

  const getPointsBadge = (pts) => {
    return (
      <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded border border-[#263147] bg-[#171e2c] text-indigo-300">
        {pts} pt{pts > 1 ? 's' : ''}
      </span>
    );
  };

  return (
    <div
      onClick={onClick}
      className="card-slate rounded-xl p-3.5 cursor-pointer space-y-2.5 shadow-sm group select-none"
    >
      {/* Top Meta: Priority, Category, Story Points */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <PriorityBadge priority={task.priority} size="xs" />
          {task.category && (
            <span className="text-[10px] text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700/50 font-medium">
              {task.category}
            </span>
          )}
        </div>
        {getPointsBadge(task.points || 3)}
      </div>

      {/* Task Title */}
      <h4 className="font-semibold text-slate-100 text-[13px] leading-snug group-hover:text-indigo-400 transition-colors line-clamp-2">
        {task.title}
      </h4>

      {/* Task Description */}
      {task.description && (
        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed font-normal">
          {task.description}
        </p>
      )}

      {/* Subtasks Progress & Comment Counter */}
      {(totalSubtasks > 0 || commentCount > 0) && (
        <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-0.5">
          {totalSubtasks > 0 && (
            <div className="flex items-center gap-1.5 font-medium">
              <CheckSquare className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className={completedSubtasks === totalSubtasks ? 'text-emerald-400' : ''}>
                {completedSubtasks}/{totalSubtasks}
              </span>
            </div>
          )}
          {commentCount > 0 && (
            <div className="flex items-center gap-1 font-medium">
              <MessageSquare className="w-3 h-3 text-slate-400" />
              <span>{commentCount}</span>
            </div>
          )}
        </div>
      )}

      {/* Assignee & Due Date Footer */}
      <div className="pt-2 border-t border-[#1c2333] flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 min-w-0">
          {task.assigneeAvatar ? (
            <img
              src={task.assigneeAvatar}
              alt={task.assignee}
              className="w-4 h-4 rounded-full object-cover border border-slate-700 shrink-0"
            />
          ) : (
            <div className="w-4 h-4 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] text-slate-300 font-bold">
              {task.assignee?.charAt(0) || 'U'}
            </div>
          )}
          <span className="text-slate-300 truncate max-w-[90px] text-[11px]">
            {task.assignee?.split(' ')[0] || 'Unassigned'}
          </span>
        </div>

        {task.dueDate && (
          <span className="text-slate-400 font-mono text-[10px] flex items-center gap-1 shrink-0">
            <Calendar className="w-3 h-3 text-slate-400" />
            {task.dueDate.slice(5)}
          </span>
        )}
      </div>

      {/* Column Shift Quick Transition Pills */}
      <div
        className="pt-1.5 flex items-center justify-between border-t border-[#171c2a] text-[10px]"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-slate-400 text-[10px]">Shift:</span>
        <div className="flex items-center gap-1">
          {task.status !== 'backlog' && (
            <button
              onClick={() => moveTaskStatus(task.id, 'backlog')}
              className="px-1.5 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Move to Backlog"
            >
              Backlog
            </button>
          )}
          {task.status !== 'in_progress' && (
            <button
              onClick={() => moveTaskStatus(task.id, 'in_progress')}
              className="px-1.5 py-0.5 rounded bg-indigo-950/70 border border-indigo-800/60 hover:bg-indigo-900/80 text-indigo-300 font-medium transition-colors"
              title="Move to In Progress"
            >
              Prog
            </button>
          )}
          {task.status !== 'review' && (
            <button
              onClick={() => moveTaskStatus(task.id, 'review')}
              className="px-1.5 py-0.5 rounded bg-sky-950/60 border border-sky-800/50 hover:bg-sky-900/70 text-sky-300 transition-colors"
              title="Move to Code Review"
            >
              Review
            </button>
          )}
          {task.status !== 'deployed' && (
            <button
              onClick={() => moveTaskStatus(task.id, 'deployed')}
              className="px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/50 hover:bg-emerald-900/70 text-emerald-300 font-medium transition-colors"
              title="Move to Deployed"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
