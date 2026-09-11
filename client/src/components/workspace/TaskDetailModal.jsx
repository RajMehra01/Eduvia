import React, { useState } from 'react';
import { X, CheckSquare, MessageSquare, Trash2, Calendar, User, Tag, Plus } from 'lucide-react';
import PriorityBadge from './PriorityBadge';
import { useProject } from '../../context/ProjectContext';

export default function TaskDetailModal({ task, onClose }) {
  const { updateTask, deleteTask, toggleSubtask, addSubtask, addComment, team } = useProject();
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  if (!task) return null;

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;
    addSubtask(task.id, newSubtaskTitle.trim());
    setNewSubtaskTitle('');
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    addComment(task.id, newCommentText.trim(), 'Elena Rostova');
    setNewCommentText('');
  };

  const handleDelete = () => {
    deleteTask(task.id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#12161A] border border-[#1D2329] rounded-2xl p-6 space-y-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto text-[#F3F4F1]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1D2329]">
          <div className="flex items-center gap-2.5 flex-wrap">
            <PriorityBadge priority={task.priority} />
            <span className="text-xs font-mono font-medium text-[#2DD4BF] bg-[#171C21] border border-[#1D2329] px-2.5 py-0.5 rounded-md">
              {task.points || 3} Story Points
            </span>
            {task.category && (
              <span className="text-xs font-medium text-[#A7B0B8] bg-[#171C21] border border-[#1D2329] px-2 py-0.5 rounded-md">
                {task.category}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!isDeleting ? (
              <button
                onClick={() => setIsDeleting(true)}
                className="p-1.5 rounded-lg text-[#707A84] hover:text-[#EF4444] hover:bg-[#EF4444]/15 transition-colors"
                title="Delete Task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-1.5 bg-[#EF4444]/15 border border-[#EF4444]/30 px-2 py-1 rounded-lg text-xs">
                <span className="text-[#EF4444] text-[11px]">Confirm?</span>
                <button
                  onClick={handleDelete}
                  className="px-1.5 py-0.5 rounded bg-[#EF4444] hover:bg-rose-600 text-white font-bold text-[11px]"
                >
                  Yes
                </button>
                <button
                  onClick={() => setIsDeleting(false)}
                  className="px-1.5 py-0.5 rounded bg-[#171C21] hover:bg-[#1D2329] text-[#A7B0B8] text-[11px]"
                >
                  No
                </button>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#707A84] hover:text-[#F3F4F1] hover:bg-[#171C21] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Task Title & Description */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-[#F3F4F1] tracking-tight leading-snug">
            {task.title}
          </h2>
          <p className="text-xs text-[#A7B0B8] leading-relaxed font-normal">
            {task.description || 'No detailed description provided.'}
          </p>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#171C21] p-4 rounded-xl border border-[#1D2329] text-xs">
          <div>
            <div className="text-[#707A84] font-medium text-[11px] mb-1 flex items-center gap-1">
              <User className="w-3 h-3 text-[#707A84]" /> Assignee
            </div>
            <select
              value={task.assignee || ''}
              onChange={(e) => updateTask({ ...task, assignee: e.target.value })}
              className="w-full bg-[#12161A] border border-[#1D2329] rounded-lg px-2 py-1 text-[#F3F4F1] text-xs font-medium focus:border-[#19B5A5]"
            >
              {team.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="text-[#707A84] font-medium text-[11px] mb-1 flex items-center gap-1">
              <Tag className="w-3 h-3 text-[#707A84]" /> Status
            </div>
            <select
              value={task.status}
              onChange={(e) => updateTask({ ...task, status: e.target.value })}
              className="w-full bg-[#12161A] border border-[#1D2329] rounded-lg px-2 py-1 text-[#F3F4F1] text-xs font-semibold capitalize focus:border-[#19B5A5]"
            >
              <option value="backlog">Backlog</option>
              <option value="in_progress">In Progress</option>
              <option value="review">Code Review</option>
              <option value="qa">QA Testing</option>
              <option value="deployed">Deployed</option>
            </select>
          </div>

          <div>
            <div className="text-[#707A84] font-medium text-[11px] mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#707A84]" /> Due Date
            </div>
            <input
              type="date"
              value={task.dueDate || ''}
              onChange={(e) => updateTask({ ...task, dueDate: e.target.value })}
              className="w-full bg-[#12161A] border border-[#1D2329] rounded-lg px-2 py-1 text-[#F3F4F1] font-mono text-xs focus:border-[#19B5A5]"
            />
          </div>

          <div>
            <div className="text-[#707A84] font-medium text-[11px] mb-1">Story Points</div>
            <select
              value={task.points || 3}
              onChange={(e) => updateTask({ ...task, points: Number(e.target.value) })}
              className="w-full bg-[#12161A] border border-[#1D2329] rounded-lg px-2 py-1 text-[#F3F4F1] font-mono text-xs font-bold focus:border-[#19B5A5]"
            >
              <option value={1}>1 pt</option>
              <option value={2}>2 pts</option>
              <option value={3}>3 pts</option>
              <option value={5}>5 pts</option>
              <option value={8}>8 pts</option>
            </select>
          </div>
        </div>

        {/* Subtask Checklist */}
        <div className="space-y-3 pt-2 border-t border-[#1D2329]">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[#F3F4F1] text-xs flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-[#2DD4BF]" /> Subtask Checklist
            </h3>
            <span className="text-[11px] text-[#707A84] font-mono">
              {task.subtasks?.filter((s) => s.completed).length || 0}/{task.subtasks?.length || 0} completed
            </span>
          </div>

          <div className="space-y-1.5">
            {task.subtasks?.map((st) => (
              <label
                key={st.id}
                className="flex items-center gap-2.5 p-2 bg-[#171C21] hover:bg-[#1D2329] rounded-lg border border-[#1D2329] cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={st.completed}
                  onChange={() => toggleSubtask(task.id, st.id)}
                  className="w-4 h-4 rounded bg-[#12161A] border-[#1D2329] text-[#19B5A5] focus:ring-[#19B5A5]"
                />
                <span
                  className={`text-xs ${
                    st.completed ? 'line-through text-[#707A84]' : 'text-[#F3F4F1] font-medium'
                  }`}
                >
                  {st.title}
                </span>
              </label>
            ))}
          </div>

          <form onSubmit={handleAddSubtask} className="flex gap-2 pt-1">
            <input
              type="text"
              placeholder="Add subtask deliverable..."
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
              className="flex-1 bg-[#171C21] border border-[#1D2329] rounded-lg px-3 py-1.5 text-xs text-[#F3F4F1] placeholder-[#707A84] focus:outline-none focus:border-[#19B5A5]"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-[#19B5A5] hover:bg-[#149A8C] text-[#0B0D0F] text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </form>
        </div>

        {/* Activity Comments Stream */}
        <div className="space-y-3 pt-2 border-t border-[#1D2329]">
          <h3 className="font-semibold text-[#F3F4F1] text-xs flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#2DD4BF]" /> Activity & Comments
          </h3>

          <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
            {task.comments?.length === 0 ? (
              <p className="text-[11px] text-[#707A84] italic">No activity comments recorded yet.</p>
            ) : (
              task.comments?.map((c, idx) => (
                <div key={idx} className="bg-[#171C21] p-3 rounded-lg border border-[#1D2329] space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-[#F3F4F1]">{c.author}</span>
                    <span className="text-[10px] text-[#707A84] font-mono">{c.time}</span>
                  </div>
                  <p className="text-xs text-[#A7B0B8] leading-relaxed font-normal">{c.text}</p>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              placeholder="Write an engineering update or comment..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="flex-1 bg-[#171C21] border border-[#1D2329] rounded-lg px-3 py-1.5 text-xs text-[#F3F4F1] placeholder-[#707A84] focus:outline-none focus:border-[#19B5A5]"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-lg bg-[#1D2329] hover:bg-[#262F38] text-[#F3F4F1] border border-[#1D2329] text-xs font-semibold transition-colors"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
