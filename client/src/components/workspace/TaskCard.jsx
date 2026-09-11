import React from 'react';
import { CheckSquare, Calendar, MessageSquare } from 'lucide-react';
import PriorityBadge from './PriorityBadge';
import { useProject } from '../../context/ProjectContext';

export default function TaskCard({ task, onClick }) {
  const { moveTaskStatus } = useProject();

  const completedSubtasks = task.subtasks?.filter(s => s.completed)?.length || 0;
  const totalSubtasks = task.subtasks?.length || 0;
  const commentCount = task.comments?.length || 0;

  const getPointsBadge = (pts) => {
    return (
      <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded border border-[#1D2329] bg-[#12161A] text-[#2DD4BF]">
        {pts} pt{pts > 1 ? 's' : ''}
      </span>
    );
  };

  return (
    <div
      onClick={onClick}
      className="card-slate rounded-xl p-3.5 cursor-pointer space-y-2.5 shadow-sm group select-none border border-[#1D2329]"
    >
      {/* Top Meta: Priority, Category, Story Points */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <PriorityBadge priority={task.priority} size="xs" />
          {task.category && (
            <span className="text-[10px] text-[#A7B0B8] bg-[#12161A] px-1.5 py-0.5 rounded border border-[#1D2329] font-medium">
              {task.category}
            </span>
          )}
        </div>
        {getPointsBadge(task.points || 3)}
      </div>

      {/* Task Title */}
      <h4 className="font-semibold text-[#F3F4F1] text-[13px] leading-snug group-hover:text-[#2DD4BF] transition-colors line-clamp-2">
        {task.title}
      </h4>

      {/* Task Description */}
      {task.description && (
        <p className="text-[11px] text-[#A7B0B8] line-clamp-2 leading-relaxed font-normal">
          {task.description}
        </p>
      )}

      {/* Subtasks Progress & Comment Counter */}
      {(totalSubtasks > 0 || commentCount > 0) && (
        <div className="flex items-center gap-3 text-[11px] text-[#707A84] pt-0.5">
          {totalSubtasks > 0 && (
            <div className="flex items-center gap-1.5 font-medium">
              <CheckSquare className="w-3.5 h-3.5 text-[#2DD4BF] shrink-0" />
              <span className={completedSubtasks === totalSubtasks ? 'text-[#10B981]' : ''}>
                {completedSubtasks}/{totalSubtasks}
              </span>
            </div>
          )}
          {commentCount > 0 && (
            <div className="flex items-center gap-1 font-medium">
              <MessageSquare className="w-3 h-3 text-[#707A84]" />
              <span>{commentCount}</span>
            </div>
          )}
        </div>
      )}

      {/* Assignee & Due Date Footer */}
      <div className="pt-2 border-t border-[#1D2329] flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 min-w-0">
          {task.assigneeAvatar ? (
            <img
              src={task.assigneeAvatar}
              alt={task.assignee}
              className="w-4 h-4 rounded-full object-cover border border-[#1D2329] shrink-0"
            />
          ) : (
            <div className="w-4 h-4 rounded-full bg-[#12161A] border border-[#1D2329] flex items-center justify-center text-[9px] text-[#A7B0B8] font-bold">
              {task.assignee?.charAt(0) || 'U'}
            </div>
          )}
          <span className="text-[#F3F4F1] truncate max-w-[90px] text-[11px]">
            {task.assignee?.split(' ')[0] || 'Unassigned'}
          </span>
        </div>

        {task.dueDate && (
          <span className="text-[#707A84] font-mono text-[10px] flex items-center gap-1 shrink-0">
            <Calendar className="w-3 h-3 text-[#707A84]" />
            {task.dueDate.slice(5)}
          </span>
        )}
      </div>

      {/* Column Shift Quick Transition Pills */}
      <div
        className="pt-1.5 flex items-center justify-between border-t border-[#1D2329] text-[10px]"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-[#707A84] text-[10px]">Shift:</span>
        <div className="flex items-center gap-1">
          {task.status !== 'backlog' && (
            <button
              onClick={() => moveTaskStatus(task.id, 'backlog')}
              className="px-1.5 py-0.5 rounded bg-[#12161A] hover:bg-[#1D2329] text-[#A7B0B8] transition-colors border border-[#1D2329]"
              title="Move to Backlog"
            >
              Backlog
            </button>
          )}
          {task.status !== 'in_progress' && (
            <button
              onClick={() => moveTaskStatus(task.id, 'in_progress')}
              className="px-1.5 py-0.5 rounded bg-[#19B5A5]/15 border border-[#19B5A5]/30 hover:bg-[#19B5A5]/25 text-[#2DD4BF] font-medium transition-colors"
              title="Move to In Progress"
            >
              Prog
            </button>
          )}
          {task.status !== 'review' && (
            <button
              onClick={() => moveTaskStatus(task.id, 'review')}
              className="px-1.5 py-0.5 rounded bg-[#F2A93B]/15 border border-[#F2A93B]/30 hover:bg-[#F2A93B]/25 text-[#F2A93B] transition-colors"
              title="Move to Code Review"
            >
              Review
            </button>
          )}
          {task.status !== 'deployed' && (
            <button
              onClick={() => moveTaskStatus(task.id, 'deployed')}
              className="px-1.5 py-0.5 rounded bg-[#10B981]/15 border border-[#10B981]/30 hover:bg-[#10B981]/25 text-[#10B981] font-medium transition-colors"
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
