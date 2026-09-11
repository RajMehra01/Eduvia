import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export default function CreateTaskModal({ onClose }) {
  const { addTask, team, activeProjectId } = useProject();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'in_progress',
    priority: 'High',
    points: 3,
    category: 'Backend',
    assignee: team[0]?.name || 'Marcus Vance',
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const assignedMember = team.find(m => m.name === formData.assignee) || team[0];

    const newTask = {
      ...formData,
      id: `task-${Date.now()}`,
      projectId: activeProjectId,
      assigneeAvatar: assignedMember?.avatar,
      subtasks: [],
      comments: []
    };

    addTask(newTask);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#12161A] border border-[#1D2329] rounded-2xl p-6 space-y-5 max-w-lg w-full shadow-2xl text-[#F3F4F1]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1D2329]">
          <div>
            <h3 className="font-bold text-base text-[#F3F4F1]">Create Sprint Task</h3>
            <p className="text-[11px] text-[#A7B0B8]">Register a new work item into the active sprint roadmap.</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#707A84] hover:text-[#F3F4F1] hover:bg-[#171C21]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Task Title */}
          <div>
            <label className="block text-[#A7B0B8] font-semibold mb-1 text-xs">Task Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Implement isolation level READ COMMITTED handler"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#171C21] border border-[#1D2329] rounded-xl px-3.5 py-2.5 text-[#F3F4F1] placeholder-[#707A84] focus:outline-none focus:border-[#19B5A5] font-medium"
            />
          </div>

          {/* Grid: Priority, Points, Column */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[#A7B0B8] font-semibold mb-1 text-xs">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full bg-[#171C21] border border-[#1D2329] rounded-xl px-3 py-2 text-[#F3F4F1] font-medium focus:border-[#19B5A5]"
              >
                <option value="Blocker">Blocker</option>
                <option value="High">High</option>
                <option value="Normal">Normal</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-[#A7B0B8] font-semibold mb-1 text-xs">Story Points</label>
              <select
                value={formData.points}
                onChange={(e) => setFormData({ ...formData, points: Number(e.target.value) })}
                className="w-full bg-[#171C21] border border-[#1D2329] rounded-xl px-3 py-2 text-[#F3F4F1] font-mono font-medium focus:border-[#19B5A5]"
              >
                <option value={1}>1 pt</option>
                <option value={2}>2 pts</option>
                <option value={3}>3 pts</option>
                <option value={5}>5 pts</option>
                <option value={8}>8 pts</option>
              </select>
            </div>

            <div>
              <label className="block text-[#A7B0B8] font-semibold mb-1 text-xs">Status Stage</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-[#171C21] border border-[#1D2329] rounded-xl px-3 py-2 text-[#F3F4F1] font-medium focus:border-[#19B5A5]"
              >
                <option value="backlog">Backlog</option>
                <option value="in_progress">In Progress</option>
                <option value="review">Code Review</option>
                <option value="qa">QA Testing</option>
                <option value="deployed">Deployed</option>
              </select>
            </div>
          </div>

          {/* Grid: Assignee & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#A7B0B8] font-semibold mb-1 text-xs">Assignee</label>
              <select
                value={formData.assignee}
                onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                className="w-full bg-[#171C21] border border-[#1D2329] rounded-xl px-3 py-2 text-[#F3F4F1] font-medium focus:border-[#19B5A5]"
              >
                {team.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name} ({m.role.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#A7B0B8] font-semibold mb-1 text-xs">Engineering Domain</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#171C21] border border-[#1D2329] rounded-xl px-3 py-2 text-[#F3F4F1] font-medium focus:border-[#19B5A5]"
              >
                <option value="Backend">Backend</option>
                <option value="Frontend">Frontend</option>
                <option value="Full Stack">Full Stack</option>
                <option value="Security">Security</option>
                <option value="Architecture">Architecture</option>
                <option value="UI/UX">UI/UX</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-[#A7B0B8] font-semibold mb-1 text-xs">Sprint Target Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full bg-[#171C21] border border-[#1D2329] rounded-xl px-3.5 py-2 text-[#F3F4F1] font-mono text-xs focus:border-[#19B5A5]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[#A7B0B8] font-semibold mb-1 text-xs">Deliverable Description</label>
            <textarea
              rows={3}
              placeholder="Specific technical requirements, testing criteria, and acceptance definitions..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#171C21] border border-[#1D2329] rounded-xl px-3.5 py-2 text-[#F3F4F1] placeholder-[#707A84] focus:outline-none focus:border-[#19B5A5] leading-relaxed"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1D2329]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#171C21] hover:bg-[#1D2329] text-[#A7B0B8] font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#19B5A5] hover:bg-[#149A8C] text-[#0B0D0F] font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Create Task</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
