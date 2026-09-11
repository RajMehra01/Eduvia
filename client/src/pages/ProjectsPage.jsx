import React, { useState } from 'react';
import {
  FolderGit2,
  Plus,
  Search,
  Calendar,
  User,
  ArrowRight
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function ProjectsPage() {
  const { projects, activeProjectId, setActiveProjectId, tasks, createProject } = useProject();
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    keyIdentifier: '',
    description: '',
    ownerName: 'Elena Rostova',
    targetDate: '2026-11-30'
  });

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.keyIdentifier?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'All' || p.status === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProject.name.trim()) return;
    createProject({
      ...newProject,
      keyIdentifier: newProject.keyIdentifier.toUpperCase() || newProject.name.slice(0, 3).toUpperCase()
    });
    setNewProject({
      name: '',
      keyIdentifier: '',
      description: '',
      ownerName: 'Elena Rostova',
      targetDate: '2026-11-30'
    });
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F3F4F1] tracking-tight flex items-center gap-2.5">
            <FolderGit2 className="w-6 h-6 text-[#2DD4BF]" />
            Project Directory
          </h1>
          <p className="text-xs text-[#A7B0B8] mt-0.5">
            Manage multi-project roadmaps, active sprint scopes, and team deliverables.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 rounded-xl bg-[#19B5A5] hover:bg-[#149A8C] text-[#0B0D0F] font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="panel-slate rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border border-[#1D2329]">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#707A84] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search projects by name or key..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#171C21] border border-[#1D2329] rounded-xl pl-9 pr-4 py-2 text-xs text-[#F3F4F1] placeholder-[#707A84] focus:outline-none focus:border-[#19B5A5]"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Active', 'Planning', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                filterStatus === status
                  ? 'bg-[#19B5A5] text-[#0B0D0F] font-semibold'
                  : 'bg-[#171C21] text-[#A7B0B8] hover:text-[#F3F4F1] border border-[#1D2329]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => {
          const isSelected = project.id === activeProjectId;
          const projectTasks = tasks.filter((t) => t.projectId === project.id);
          const totalPoints = projectTasks.reduce((acc, t) => acc + (t.points || 0), 0);
          const deployedPoints = projectTasks
            .filter((t) => t.status === 'deployed')
            .reduce((acc, t) => acc + (t.points || 0), 0);
          const progressPercent = Math.round((deployedPoints / Math.max(totalPoints, 1)) * 100);

          const isAtRisk = project.health === 'at_risk';

          return (
            <div
              key={project.id}
              className={`panel-slate rounded-2xl p-5 space-y-4 transition-all relative flex flex-col justify-between border ${
                isSelected ? 'border-[#19B5A5] ring-1 ring-[#19B5A5]/30' : 'border-[#1D2329]'
              }`}
            >
              <div className="space-y-3">
                {/* Header: Key & Health */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#171C21] border border-[#1D2329] text-[#2DD4BF]">
                    {project.keyIdentifier || 'PRJ'}
                  </span>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                        isAtRisk
                          ? 'bg-[#F2A93B]/15 text-[#F2A93B] border-[#F2A93B]/30'
                          : 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isAtRisk ? 'bg-[#F2A93B]' : 'bg-[#10B981]'}`} />
                      {isAtRisk ? 'At Risk' : 'On Track'}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-mono bg-[#19B5A5] text-[#0B0D0F] font-bold px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Title & Desc */}
                <div>
                  <h3 className="font-bold text-[#F3F4F1] text-base leading-snug">
                    {project.name}
                  </h3>
                  <p className="text-xs text-[#A7B0B8] line-clamp-2 mt-1 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-[#707A84]">Sprint Delivery</span>
                    <span className="text-[#2DD4BF] font-semibold">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-[#12161A] h-1.5 rounded-full overflow-hidden border border-[#1D2329]">
                    <div
                      className="bg-[#19B5A5] h-full rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Footer Meta & Action */}
              <div className="pt-3 border-t border-[#1D2329] space-y-3">
                <div className="flex items-center justify-between text-[11px] text-[#707A84]">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#707A84]" />
                    {project.ownerName}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[#707A84]" />
                    {project.targetDate}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <span className="text-xs font-mono text-[#707A84]">
                    {projectTasks.length} tasks • {totalPoints} pts
                  </span>

                  <button
                    onClick={() => setActiveProjectId(project.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
                      isSelected
                        ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
                        : 'bg-[#171C21] hover:bg-[#19B5A5] text-[#2DD4BF] hover:text-[#0B0D0F] border border-[#1D2329]'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Select'}
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="bg-[#12161A] border border-[#1D2329] rounded-2xl p-6 space-y-4 max-w-md w-full shadow-2xl text-[#F3F4F1]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-base text-[#F3F4F1]">Create New Project</h3>
            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#A7B0B8] font-semibold mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Core Pipeline Engine"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="w-full bg-[#171C21] border border-[#1D2329] rounded-xl px-3 py-2 text-[#F3F4F1] focus:border-[#19B5A5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A7B0B8] font-semibold mb-1">Key Identifier</label>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="e.g. CPE"
                    value={newProject.keyIdentifier}
                    onChange={(e) => setNewProject({ ...newProject, keyIdentifier: e.target.value.toUpperCase() })}
                    className="w-full bg-[#171C21] border border-[#1D2329] rounded-xl px-3 py-2 text-[#F3F4F1] font-mono uppercase focus:border-[#19B5A5]"
                  />
                </div>

                <div>
                  <label className="block text-[#A7B0B8] font-semibold mb-1">Target Date</label>
                  <input
                    type="date"
                    value={newProject.targetDate}
                    onChange={(e) => setNewProject({ ...newProject, targetDate: e.target.value })}
                    className="w-full bg-[#171C21] border border-[#1D2329] rounded-xl px-3 py-2 text-[#F3F4F1] font-mono focus:border-[#19B5A5]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A7B0B8] font-semibold mb-1">Project Lead / Owner</label>
                <input
                  type="text"
                  value={newProject.ownerName}
                  onChange={(e) => setNewProject({ ...newProject, ownerName: e.target.value })}
                  className="w-full bg-[#171C21] border border-[#1D2329] rounded-xl px-3 py-2 text-[#F3F4F1] focus:border-[#19B5A5]"
                />
              </div>

              <div>
                <label className="block text-[#A7B0B8] font-semibold mb-1">Description</label>
                <textarea
                  rows="3"
                  placeholder="Summary of architectural deliverables..."
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full bg-[#171C21] border border-[#1D2329] rounded-xl px-3 py-2 text-[#F3F4F1] focus:border-[#19B5A5]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#171C21] text-[#A7B0B8] hover:bg-[#1D2329] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#19B5A5] hover:bg-[#149A8C] text-[#0B0D0F] font-semibold"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
