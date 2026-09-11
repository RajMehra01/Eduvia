import React from 'react';
import { ListFilter, Search, CheckSquare, ArrowUpDown, Plus } from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import PriorityBadge from '../components/workspace/PriorityBadge';

export default function TaskTableView() {
  const {
    activeProject,
    activeTasks,
    searchQuery,
    setSearchQuery,
    filterPriority,
    setFilterPriority,
    moveTaskStatus,
    setSelectedTask,
    setShowCreateModal
  } = useProject();

  const filteredTasks = activeTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignee?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="space-y-5">
      {/* View Header & Toolbar */}
      <div className="panel-slate rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2.5">
            <ListFilter className="w-6 h-6 text-indigo-400" />
            Sprint Task Data Table
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Dense, filterable engineering catalog of all registered sprint deliverables.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="relative flex-1 md:w-60">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search table work items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#161b26] border border-[#232b3e] rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-[#161b26] border border-[#232b3e] rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="All">All Priorities</option>
            <option value="Blocker">Blocker</option>
            <option value="High">High</option>
            <option value="Normal">Normal</option>
            <option value="Low">Low</option>
          </select>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="panel-slate rounded-2xl overflow-hidden border border-[#1f2637]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#141824] text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-[#1f2637]">
              <tr>
                <th className="p-3.5">Deliverable Title</th>
                <th className="p-3.5">Status Stage</th>
                <th className="p-3.5">Priority</th>
                <th className="p-3.5">Points</th>
                <th className="p-3.5">Assignee</th>
                <th className="p-3.5">Target Date</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#171c2a]">
              {filteredTasks.map((task) => (
                <tr
                  key={task.id}
                  className="hover:bg-[#141824]/60 transition-colors group"
                >
                  {/* Title & Category */}
                  <td className="p-3.5">
                    <div className="flex items-center gap-2.5">
                      <CheckSquare className="w-4 h-4 text-indigo-400 shrink-0" />
                      <div>
                        <div
                          onClick={() => setSelectedTask(task)}
                          className="font-semibold text-slate-200 hover:text-indigo-400 cursor-pointer transition-colors"
                        >
                          {task.title}
                        </div>
                        {task.category && (
                          <span className="text-[10px] text-slate-400 font-medium">
                            {task.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Status Dropdown */}
                  <td className="p-3.5">
                    <select
                      value={task.status}
                      onChange={(e) => moveTaskStatus(task.id, e.target.value)}
                      className="bg-[#161b26] border border-[#252f44] rounded-lg px-2 py-1 text-slate-200 text-xs font-semibold capitalize focus:border-indigo-500 cursor-pointer"
                    >
                      <option value="backlog">Backlog</option>
                      <option value="in_progress">In Progress</option>
                      <option value="review">Code Review</option>
                      <option value="qa">QA Testing</option>
                      <option value="deployed">Deployed</option>
                    </select>
                  </td>

                  {/* Priority */}
                  <td className="p-3.5">
                    <PriorityBadge priority={task.priority} size="xs" />
                  </td>

                  {/* Story Points */}
                  <td className="p-3.5">
                    <span className="font-mono font-medium text-indigo-300 bg-[#171e2c] border border-[#263147] px-2 py-0.5 rounded text-[11px]">
                      {task.points} pts
                    </span>
                  </td>

                  {/* Assignee */}
                  <td className="p-3.5">
                    <div className="flex items-center gap-1.5">
                      {task.assigneeAvatar ? (
                        <img
                          src={task.assigneeAvatar}
                          alt={task.assignee}
                          className="w-4 h-4 rounded-full object-cover border border-slate-700"
                        />
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center text-[9px] text-slate-300">
                          {task.assignee?.charAt(0) || 'U'}
                        </div>
                      )}
                      <span className="font-medium text-slate-300 truncate max-w-[120px]">
                        {task.assignee}
                      </span>
                    </div>
                  </td>

                  {/* Due Date */}
                  <td className="p-3.5 font-mono text-slate-400 text-[11px]">
                    {task.dueDate}
                  </td>

                  {/* Details Action */}
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setSelectedTask(task)}
                      className="px-2.5 py-1 rounded-lg bg-[#1a2030] hover:bg-indigo-600 text-slate-300 hover:text-white font-medium text-xs border border-[#263047] transition-all"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}

              {filteredTasks.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No work items matching the current filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
