import React, { useState } from 'react';
import { X, CheckSquare, MessageSquare, Trash2, Calendar, User, Tag, Plus, Check } from 'lucide-react';
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
        className="bg-[#11141c] border border-[#1f2637] rounded-2xl p-6 space-y-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1c2333]">
          <div className="flex items-center gap-2.5 flex-wrap">
            <PriorityBadge priority={task.priority} />
            <span className="text-xs font-mono font-medium text-indigo-300 bg-indigo-950/60 border border-indigo-800/60 px-2.5 py-0.5 rounded-md">
              {task.points || 3} Story Points
            </span>
            {task.category && (
              <span className="text-xs font-medium text-slate-400 bg-slate-800/60 border border-slate-700/50 px-2 py-0.5 rounded-md">
                {task.category}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!isDeleting ? (
              <button
                onClick={() => setIsDeleting(true)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                title="Delete Task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-1.5 bg-rose-950/70 border border-rose-800/60 px-2 py-1 rounded-lg text-xs">
                <span className="text-rose-300 text-[11px]">Confirm?</span>
                <button
                  onClick={handleDelete}
                  className="px-1.5 py-0.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px]"
                >
                  Yes
                </button>
                <button
                  onClick={() => setIsDeleting(false)}
                  className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
                >
                  No
                </button>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Task Title & Description */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-100 tracking-tight leading-snug">
            {task.title}
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            {task.description || 'No detailed description provided.'}
          </p>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#161b26] p-4 rounded-xl border border-[#222a3d] text-xs">
          <div>
            <div className="text-slate-400 font-medium text-[11px] mb-1 flex items-center gap-1">
              <User className="w-3 h-3 text-slate-400" /> Assignee
            </div>
            <select
              value={task.assignee || ''}
              onChange={(e) => updateTask({ ...task, assignee: e.target.value })}
              className="w-full bg-[#11141c] border border-[#2a3449] rounded-lg px-2 py-1 text-slate-200 text-xs font-medium focus:border-indigo-500"
            >
              {team.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="text-slate-400 font-medium text-[11px] mb-1 flex items-center gap-1">
              <Tag className="w-3 h-3 text-slate-400" /> Status
            </div>
            <select
              value={task.status}
              onChange={(e) => updateTask({ ...task, status: e.target.value })}
              className="w-full bg-[#11141c] border border-[#2a3449] rounded-lg px-2 py-1 text-slate-200 text-xs font-semibold capitalize focus:border-indigo-500"
            >
              <option value="backlog">Backlog</option>
              <option value="in_progress">In Progress</option>
              <option value="review">Code Review</option>
              <option value="qa">QA Testing</option>
              <option value="deployed">Deployed</option>
            </select>
          </div>

          <div>
            <div className="text-slate-400 font-medium text-[11px] mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" /> Due Date
            </div>
            <input
              type="date"
              value={task.dueDate || ''}
              onChange={(e) => updateTask({ ...task, dueDate: e.target.value })}
              className="w-full bg-[#11141c] border border-[#2a3449] rounded-lg px-2 py-1 text-slate-200 font-mono text-xs focus:border-indigo-500"
            />
          </div>

          <div>
            <div className="text-slate-400 font-medium text-[11px] mb-1">Story Points</div>
            <select
              value={task.points || 3}
              onChange={(e) => updateTask({ ...task, points: Number(e.target.value) })}
              className="w-full bg-[#11141c] border border-[#2a3449] rounded-lg px-2 py-1 text-slate-200 font-mono text-xs font-bold focus:border-indigo-500"
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
        <div className="space-y-3 pt-2 border-t border-[#1c2333]">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-200 text-xs flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-indigo-400" /> Subtask Checklist
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">
              {task.subtasks?.filter((s) => s.completed).length || 0}/{task.subtasks?.length || 0} completed
            </span>
          </div>

          <div className="space-y-1.5">
            {task.subtasks?.map((st) => (
              <label
                key={st.id}
                className="flex items-center gap-2.5 p-2 bg-[#141822] hover:bg-[#181d2a] rounded-lg border border-[#1f2738] cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={st.completed}
                  onChange={() => toggleSubtask(task.id, st.id)}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                <span
                  className={`text-xs ${
                    st.completed ? 'line-through text-slate-400' : 'text-slate-200 font-medium'
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
              className="flex-1 bg-[#141822] border border-[#222a3d] rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </form>
        </div>

        {/* Activity Comments Stream */}
        <div className="space-y-3 pt-2 border-t border-[#1c2333]">
          <h3 className="font-semibold text-slate-200 text-xs flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-400" /> Activity & Comments
          </h3>

          <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
            {task.comments?.length === 0 ? (
              <p className="text-[11px] text-slate-400 italic">No activity comments recorded yet.</p>
            ) : (
              task.comments?.map((c, idx) => (
                <div key={idx} className="bg-[#141822] p-3 rounded-lg border border-[#1f2738] space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-200">{c.author}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{c.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">{c.text}</p>
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
              className="flex-1 bg-[#141822] border border-[#222a3d] rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
