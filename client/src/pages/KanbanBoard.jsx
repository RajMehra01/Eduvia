import React from 'react';
import { KanbanSquare, Search, Plus } from 'lucide-react';
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
      accent: 'border-[#1D2329] bg-[#171C21] text-[#A7B0B8]',
      dot: 'bg-[#707A84]'
    },
    {
      id: 'in_progress',
      label: 'In Progress',
      accent: 'border-[#19B5A5]/30 bg-[#171C21] text-[#2DD4BF]',
      dot: 'bg-[#2DD4BF]'
    },
    {
      id: 'review',
      label: 'Code Review',
      accent: 'border-[#F2A93B]/30 bg-[#171C21] text-[#F2A93B]',
      dot: 'bg-[#F2A93B]'
    },
    {
      id: 'qa',
      label: 'QA Testing',
      accent: 'border-[#0EA5E9]/30 bg-[#171C21] text-[#0EA5E9]',
      dot: 'bg-[#0EA5E9]'
    },
    {
      id: 'deployed',
      label: 'Deployed',
      accent: 'border-[#10B981]/30 bg-[#171C21] text-[#10B981]',
      dot: 'bg-[#10B981]'
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
      <div className="panel-slate rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-[#1D2329]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#171C21] border border-[#1D2329] text-[#2DD4BF] flex items-center justify-center shrink-0">
            <KanbanSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono font-semibold text-[#2DD4BF] uppercase tracking-wider">
              {activeProject?.keyIdentifier || 'KRO'} • Sprint Kanban Board
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[#F3F4F1]">
              {activeProject?.activeSprint || 'Sprint #14 (July 15–31)'}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="relative flex-1 md:w-60">
            <Search className="w-3.5 h-3.5 text-[#707A84] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search sprint work..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#171C21] border border-[#1D2329] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#F3F4F1] placeholder-[#707A84] focus:outline-none focus:border-[#19B5A5] font-medium"
            />
          </div>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-[#171C21] border border-[#1D2329] rounded-xl px-2.5 py-1.5 text-xs font-semibold text-[#F3F4F1] focus:outline-none focus:border-[#19B5A5] cursor-pointer"
          >
            <option value="All">All Priorities</option>
            <option value="Blocker">Blocker</option>
            <option value="High">High</option>
            <option value="Normal">Normal</option>
            <option value="Low">Low</option>
          </select>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-[#19B5A5] hover:bg-[#149A8C] text-[#0B0D0F] text-xs font-semibold shadow-sm transition-colors flex items-center gap-1 shrink-0"
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
              className="bg-[#12161A] rounded-xl p-2.5 border border-[#1D2329] space-y-3 min-h-[550px] flex flex-col justify-between"
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

                  <span className="px-2 py-0.5 rounded bg-[#12161A] text-[#F3F4F1] font-mono text-[10px] font-bold border border-[#1D2329]">
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
                    <div className="py-8 text-center border border-dashed border-[#1D2329] rounded-xl text-[#707A84] text-xs">
                      No tasks in {col.label.toLowerCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Fast Add Button */}
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full py-1.5 rounded-lg border border-dashed border-[#1D2329] hover:border-[#19B5A5]/50 hover:bg-[#171C21] text-[#707A84] hover:text-[#F3F4F1] text-xs font-medium transition-colors flex items-center justify-center gap-1"
              >
                <Plus className="w-3 h-3 text-[#707A84]" />
                <span>Add Task</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
