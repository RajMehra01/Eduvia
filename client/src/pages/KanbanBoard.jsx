import React from 'react';
import { KanbanSquare, Search, Filter, Plus, Layers, Sparkles } from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import TaskCard from '../components/workspace/TaskCard';

export default function KanbanBoard() {
  const {
    activeProject,
    activeTasks,
    searchQuery,
    setSearchQuery,
    filterPriority,
    setFilterPriority,
    setSelectedTask,
    setShowCreateModal
  } = useProject();

  const columns = [
    {
      id: 'backlog',
      label: 'Backlog',
      accent: 'border-slate-700/60 bg-slate-900/40 text-slate-300',
      dot: 'bg-slate-400'
    },
    {
      id: 'in_progress',
      label: 'In Progress',
      accent: 'border-indigo-800/60 bg-indigo-950/30 text-indigo-300',
      dot: 'bg-indigo-400'
    },
    {
      id: 'review',
      label: 'Code Review',
      accent: 'border-purple-800/60 bg-purple-950/30 text-purple-300',
      dot: 'bg-purple-400'
    },
    {
      id: 'qa',
      label: 'QA Testing',
      accent: 'border-sky-800/60 bg-sky-950/30 text-sky-300',
      dot: 'bg-sky-400'
    },
    {
      id: 'deployed',
      label: 'Deployed',
      accent: 'border-emerald-800/60 bg-emerald-950/30 text-emerald-300',
      dot: 'bg-emerald-400'
    }
  ];

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
      {/* Sprint Header & Filter Panel */}
      <div className="panel-slate rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-950/80 border border-indigo-800/60 text-indigo-400 flex items-center justify-center shrink-0">
            <KanbanSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono font-semibold text-indigo-400 uppercase tracking-wider">
              {activeProject?.keyIdentifier || 'KRO'} • Sprint Kanban Board
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-100">
              {activeProject?.activeSprint || 'Sprint #14 — Deliverable Roadmap'}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="relative flex-1 md:w-60">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search sprint work..."
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
            <span className="hidden sm:inline">Add Item</span>
          </button>
        </div>
      </div>

      {/* 5-Column Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5 items-start overflow-x-auto pb-6">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);
          const colPoints = colTasks.reduce((acc, t) => acc + (t.points || 0), 0);

          return (
            <div
              key={col.id}
              className="bg-[#0f1219] rounded-xl p-2.5 border border-[#1b2233] space-y-3 min-h-[550px] flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Column Header */}
                <div
                  className={`p-2 rounded-lg border flex items-center justify-between font-semibold text-xs ${col.accent}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                    <span className="uppercase tracking-wider text-[11px] font-bold">{col.label}</span>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-[#11151f] text-slate-200 font-mono text-[10px] font-bold border border-[#232b3d]">
                    {colTasks.length} ({colPoints}pt)
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-2.5">
                  {colTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onClick={() => setSelectedTask(task)}
                    />
                  ))}

                  {colTasks.length === 0 && (
                    <div className="py-8 text-center border border-dashed border-[#1c2333] rounded-xl text-slate-400 text-xs">
                      No tasks in {col.label.toLowerCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Fast Add Button */}
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full py-1.5 rounded-lg border border-dashed border-[#20283b] hover:border-indigo-500/50 hover:bg-[#141824] text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors flex items-center justify-center gap-1"
              >
                <Plus className="w-3 h-3 text-slate-400" />
                <span>Add Task</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
