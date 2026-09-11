import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Layers,
  ArrowRight,
  Users,
  Calendar,
  Zap
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import PriorityBadge from '../components/workspace/PriorityBadge';

export default function DashboardOverview() {
  const { activeProject, activeTasks, team, metrics, setSelectedTask, setShowCreateModal } = useProject();

  const inProgressTasks = activeTasks.filter(t => t.status === 'in_progress');
  const blockerTasks = activeTasks.filter(t => t.priority === 'Blocker');
  const upcomingDeadlines = [...activeTasks]
    .sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1))
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome Context */}
      <div className="panel-slate rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-semibold text-indigo-400 uppercase tracking-wider">
              {activeProject?.keyIdentifier} • Sprint Roadmap
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-indigo-950/70 text-indigo-300 border border-indigo-800/60">
              Active
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
            {activeProject?.name}
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            {activeProject?.description}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-colors flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Create Sprint Task</span>
          </button>
          <Link
            to="/app/kanban"
            className="px-4 py-2 rounded-xl bg-[#161b26] hover:bg-[#1a2130] text-slate-200 border border-[#232b3e] text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <span>Open Kanban</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* 4 Core Velocity & Scope Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-slate rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Sprint Velocity</span>
            <div className="p-1.5 rounded-lg bg-indigo-950/60 text-indigo-400 border border-indigo-800/50">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-slate-100">{metrics.velocityRate}%</span>
            <span className="text-[11px] text-slate-400 font-mono">completion rate</span>
          </div>
          <div className="w-full bg-[#1c2333] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(metrics.velocityRate, 100)}%` }}
            />
          </div>
        </div>

        <div className="card-slate rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Deployed Deliverables</span>
            <div className="p-1.5 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-emerald-400">{metrics.deployedPoints}</span>
            <span className="text-[11px] text-slate-400 font-mono">/ {metrics.totalPoints} story pts</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {activeTasks.filter(t => t.status === 'deployed').length} tasks deployed to production
          </p>
        </div>

        <div className="card-slate rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">In-Flight Bandwidth</span>
            <div className="p-1.5 rounded-lg bg-amber-950/60 text-amber-400 border border-amber-800/50">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-amber-400">{metrics.inProgressPoints}</span>
            <span className="text-[11px] text-slate-400 font-mono">pts in progress</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {inProgressTasks.length} active tasks currently being engineered
          </p>
        </div>

        <div className="card-slate rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Blockers & High Risk</span>
            <div className="p-1.5 rounded-lg bg-rose-950/60 text-rose-400 border border-rose-800/50">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-rose-400">{blockerTasks.length}</span>
            <span className="text-[11px] text-slate-400 font-mono">critical items</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {blockerTasks.reduce((acc, t) => acc + (t.points || 0), 0)} blocker points requiring immediate review
          </p>
        </div>
      </div>

      {/* Main Grid: Left Column (Sprint Progress & Upcoming Deadlines) + Right Column (Workload & Team) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (2 Cols wide on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sprint Delivery Pipeline Progress */}
          <div className="panel-slate rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-100">Sprint Delivery Pipeline</h3>
                <p className="text-[11px] text-slate-400">Distribution of active story points across Kanban workflow stages</p>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-300">
                {metrics.totalPoints} Total Points
              </span>
            </div>

            {/* Segmented Pipeline Bar */}
            <div className="w-full h-3 rounded-full bg-[#181d2a] overflow-hidden flex gap-0.5 p-0.5 border border-[#222a3d]">
              <div
                className="bg-slate-500 rounded-l-full"
                style={{ width: `${(metrics.backlogPoints / Math.max(metrics.totalPoints, 1)) * 100}%` }}
                title={`Backlog: ${metrics.backlogPoints} pts`}
              />
              <div
                className="bg-indigo-500"
                style={{ width: `${(metrics.inProgressPoints / Math.max(metrics.totalPoints, 1)) * 100}%` }}
                title={`In Progress: ${metrics.inProgressPoints} pts`}
              />
              <div
                className="bg-sky-500"
                style={{ width: `${(metrics.reviewPoints / Math.max(metrics.totalPoints, 1)) * 100}%` }}
                title={`Review/QA: ${metrics.reviewPoints} pts`}
              />
              <div
                className="bg-emerald-500 rounded-r-full"
                style={{ width: `${(metrics.deployedPoints / Math.max(metrics.totalPoints, 1)) * 100}%` }}
                title={`Deployed: ${metrics.deployedPoints} pts`}
              />
            </div>

            {/* Pipeline Stage Badges Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
              <div className="p-2 rounded-lg bg-[#141822] border border-[#1e2535] flex items-center justify-between">
                <span className="text-slate-400 text-[11px] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-500" /> Backlog
                </span>
                <span className="font-mono font-semibold text-slate-200">{metrics.backlogPoints} pt</span>
              </div>
              <div className="p-2 rounded-lg bg-[#141822] border border-[#1e2535] flex items-center justify-between">
                <span className="text-slate-400 text-[11px] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" /> In Progress
                </span>
                <span className="font-mono font-semibold text-indigo-300">{metrics.inProgressPoints} pt</span>
              </div>
              <div className="p-2 rounded-lg bg-[#141822] border border-[#1e2535] flex items-center justify-between">
                <span className="text-slate-400 text-[11px] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-500" /> Review / QA
                </span>
                <span className="font-mono font-semibold text-sky-300">{metrics.reviewPoints} pt</span>
              </div>
              <div className="p-2 rounded-lg bg-[#141822] border border-[#1e2535] flex items-center justify-between">
                <span className="text-slate-400 text-[11px] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Deployed
                </span>
                <span className="font-mono font-semibold text-emerald-300">{metrics.deployedPoints} pt</span>
              </div>
            </div>
          </div>

          {/* Upcoming Milestone Deadlines */}
          <div className="panel-slate rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" /> Upcoming Deliverable Deadlines
              </h3>
              <Link to="/app/table" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
                View all tasks →
              </Link>
            </div>

            <div className="divide-y divide-[#1b2232]">
              {upcomingDeadlines.map((task) => (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className="py-2.5 flex items-center justify-between gap-3 hover:bg-[#141925] px-2 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <PriorityBadge priority={task.priority} size="xs" />
                    <span className="text-xs font-semibold text-slate-200 truncate hover:text-indigo-300 transition-colors">
                      {task.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-[11px] font-mono text-indigo-300 bg-[#161c28] px-2 py-0.5 rounded border border-[#222a3d]">
                      {task.points} pts
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Due {task.dueDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Workload & Team Capacity */}
        <div className="space-y-6">
          <div className="panel-slate rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" /> Team Workload
              </h3>
              <Link to="/app/workload" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
                Matrix →
              </Link>
            </div>

            <div className="space-y-3.5">
              {team.map((member) => {
                const assignedTasks = activeTasks.filter(t => t.assignee === member.name);
                const assignedPoints = assignedTasks.reduce((acc, t) => acc + (t.points || 0), 0);
                const loadPercentage = Math.min(Math.round((assignedPoints / member.capacity) * 100), 100);
                const isOverloaded = loadPercentage >= 90;

                return (
                  <div key={member.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-5 h-5 rounded-full object-cover border border-slate-700 shrink-0"
                        />
                        <span className="font-medium text-slate-200 truncate">{member.name}</span>
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-slate-300">
                        {assignedPoints}/{member.capacity} pts ({loadPercentage}%)
                      </span>
                    </div>

                    <div className="w-full bg-[#181d2a] h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isOverloaded ? 'bg-rose-500' : 'bg-indigo-500'
                        }`}
                        style={{ width: `${loadPercentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Shortcuts Card */}
          <div className="panel-slate rounded-2xl p-5 space-y-3">
            <h3 className="font-bold text-sm text-slate-100">Sprint Direct Access</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                to="/app/kanban"
                className="p-3 rounded-xl bg-[#141824] hover:bg-[#181e2e] border border-[#20283b] transition-colors flex flex-col gap-1"
              >
                <span className="font-semibold text-slate-200">Kanban Board</span>
                <span className="text-[10px] text-slate-400">5-column workflow</span>
              </Link>
              <Link
                to="/app/gantt"
                className="p-3 rounded-xl bg-[#141824] hover:bg-[#181e2e] border border-[#20283b] transition-colors flex flex-col gap-1"
              >
                <span className="font-semibold text-slate-200">Milestone Gantt</span>
                <span className="text-[10px] text-slate-400">Visual date tracks</span>
              </Link>
              <Link
                to="/app/workload"
                className="p-3 rounded-xl bg-[#141824] hover:bg-[#181e2e] border border-[#20283b] transition-colors flex flex-col gap-1"
              >
                <span className="font-semibold text-slate-200">Workload Matrix</span>
                <span className="text-[10px] text-slate-400">Capacity heatmap</span>
              </Link>
              <Link
                to="/app/analytics"
                className="p-3 rounded-xl bg-[#141824] hover:bg-[#181e2e] border border-[#20283b] transition-colors flex flex-col gap-1"
              >
                <span className="font-semibold text-slate-200">Sprint Analytics</span>
                <span className="text-[10px] text-slate-400">Burn-down & velocity</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
