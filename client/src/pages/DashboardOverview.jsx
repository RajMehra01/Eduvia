import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
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
  const blockerTasks = activeTasks.filter(t => t.priority === 'Blocker' && t.status !== 'deployed');
  const upcomingDeadlines = [...activeTasks]
    .sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1))
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome Context */}
      <div className="panel-slate rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-[#1D2329]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-semibold text-[#2DD4BF] uppercase tracking-wider">
              {activeProject?.keyIdentifier} • Sprint Roadmap
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#171C21] text-[#2DD4BF] border border-[#1D2329]">
              Active
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F3F4F1] tracking-tight">
            {activeProject?.name}
          </h1>
          <p className="text-xs text-[#A7B0B8] max-w-2xl leading-relaxed">
            {activeProject?.description}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 rounded-xl bg-[#19B5A5] hover:bg-[#149A8C] text-[#0B0D0F] text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Create Sprint Task</span>
          </button>
          <Link
            to="/app/kanban"
            className="px-4 py-2 rounded-xl bg-[#171C21] hover:bg-[#1D2329] text-[#F3F4F1] border border-[#1D2329] text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <span>Open Kanban</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#707A84]" />
          </Link>
        </div>
      </div>

      {/* 4 Core Velocity & Scope Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-slate rounded-xl p-4 space-y-2 border border-[#1D2329]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#A7B0B8]">Sprint Velocity</span>
            <div className="p-1.5 rounded-lg bg-[#19B5A5]/15 text-[#2DD4BF] border border-[#19B5A5]/30">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-[#F3F4F1]">{metrics.velocityRate}%</span>
            <span className="text-[11px] text-[#707A84] font-mono">completion rate</span>
          </div>
          <div className="w-full bg-[#12161A] h-1.5 rounded-full overflow-hidden border border-[#1D2329]">
            <div
              className="bg-[#19B5A5] h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(metrics.velocityRate, 100)}%` }}
            />
          </div>
        </div>

        <div className="card-slate rounded-xl p-4 space-y-2 border border-[#1D2329]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#A7B0B8]">Deployed Deliverables</span>
            <div className="p-1.5 rounded-lg bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-[#10B981]">{metrics.deployedPoints}</span>
            <span className="text-[11px] text-[#707A84] font-mono">/ {metrics.totalPoints} story pts</span>
          </div>
          <p className="text-[11px] text-[#707A84]">
            {activeTasks.filter(t => t.status === 'deployed').length} tasks verified in production
          </p>
        </div>

        <div className="card-slate rounded-xl p-4 space-y-2 border border-[#1D2329]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#A7B0B8]">In-Progress Work</span>
            <div className="p-1.5 rounded-lg bg-[#F2A93B]/15 text-[#F2A93B] border border-[#F2A93B]/30">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-[#F2A93B]">{metrics.inProgressPoints}</span>
            <span className="text-[11px] text-[#707A84] font-mono">pts under review/code</span>
          </div>
          <p className="text-[11px] text-[#707A84]">
            {inProgressTasks.length} active tasks currently being engineered
          </p>
        </div>

        <div className="card-slate rounded-xl p-4 space-y-2 border border-[#1D2329]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#A7B0B8]">Active Blockers</span>
            <div className="p-1.5 rounded-lg bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-[#EF4444]">{blockerTasks.length}</span>
            <span className="text-[11px] text-[#707A84] font-mono">unresolved items</span>
          </div>
          <p className="text-[11px] text-[#707A84]">
            {blockerTasks.reduce((acc, t) => acc + (t.points || 0), 0)} blocker points requiring resolution
          </p>
        </div>
      </div>

      {/* Main Grid: Left Column (Sprint Progress & Upcoming Deadlines) + Right Column (Workload & Team) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (2 Cols wide on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sprint Delivery Pipeline Progress */}
          <div className="panel-slate rounded-2xl p-5 space-y-4 border border-[#1D2329]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#F3F4F1]">Sprint Delivery Pipeline</h3>
                <p className="text-[11px] text-[#A7B0B8]">Distribution of active story points across Kanban workflow stages</p>
              </div>
              <span className="text-xs font-mono font-semibold text-[#F3F4F1]">
                {metrics.totalPoints} Total Points
              </span>
            </div>

            {/* Segmented Pipeline Bar */}
            <div className="w-full h-3 rounded-full bg-[#12161A] overflow-hidden flex gap-0.5 p-0.5 border border-[#1D2329]">
              <div
                className="bg-[#707A84] rounded-l-full"
                style={{ width: `${(metrics.backlogPoints / Math.max(metrics.totalPoints, 1)) * 100}%` }}
                title={`Backlog: ${metrics.backlogPoints} pts`}
              />
              <div
                className="bg-[#19B5A5]"
                style={{ width: `${(metrics.inProgressPoints / Math.max(metrics.totalPoints, 1)) * 100}%` }}
                title={`In Progress: ${metrics.inProgressPoints} pts`}
              />
              <div
                className="bg-[#F2A93B]"
                style={{ width: `${(metrics.reviewPoints / Math.max(metrics.totalPoints, 1)) * 100}%` }}
                title={`Review/QA: ${metrics.reviewPoints} pts`}
              />
              <div
                className="bg-[#10B981] rounded-r-full"
                style={{ width: `${(metrics.deployedPoints / Math.max(metrics.totalPoints, 1)) * 100}%` }}
                title={`Deployed: ${metrics.deployedPoints} pts`}
              />
            </div>

            {/* Pipeline Stage Badges Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
              <div className="p-2 rounded-lg bg-[#171C21] border border-[#1D2329] flex items-center justify-between">
                <span className="text-[#A7B0B8] text-[11px] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#707A84]" /> Backlog
                </span>
                <span className="font-mono font-semibold text-[#F3F4F1]">{metrics.backlogPoints} pt</span>
              </div>
              <div className="p-2 rounded-lg bg-[#171C21] border border-[#1D2329] flex items-center justify-between">
                <span className="text-[#A7B0B8] text-[11px] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#19B5A5]" /> In Progress
                </span>
                <span className="font-mono font-semibold text-[#2DD4BF]">{metrics.inProgressPoints} pt</span>
              </div>
              <div className="p-2 rounded-lg bg-[#171C21] border border-[#1D2329] flex items-center justify-between">
                <span className="text-[#A7B0B8] text-[11px] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F2A93B]" /> Review / QA
                </span>
                <span className="font-mono font-semibold text-[#F2A93B]">{metrics.reviewPoints} pt</span>
              </div>
              <div className="p-2 rounded-lg bg-[#171C21] border border-[#1D2329] flex items-center justify-between">
                <span className="text-[#A7B0B8] text-[11px] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" /> Deployed
                </span>
                <span className="font-mono font-semibold text-[#10B981]">{metrics.deployedPoints} pt</span>
              </div>
            </div>
          </div>

          {/* Upcoming Milestone Deadlines */}
          <div className="panel-slate rounded-2xl p-5 space-y-3 border border-[#1D2329]">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#F3F4F1] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#2DD4BF]" /> Upcoming Deliverable Deadlines
              </h3>
              <Link to="/app/table" className="text-xs text-[#2DD4BF] hover:text-[#19B5A5] font-medium">
                View all tasks →
              </Link>
            </div>

            <div className="divide-y divide-[#1D2329]">
              {upcomingDeadlines.map((task) => (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className="py-2.5 flex items-center justify-between gap-3 hover:bg-[#171C21] px-2 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <PriorityBadge priority={task.priority} size="xs" />
                    <span className="text-xs font-semibold text-[#F3F4F1] truncate hover:text-[#2DD4BF] transition-colors">
                      {task.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-[11px] font-mono text-[#2DD4BF] bg-[#171C21] px-2 py-0.5 rounded border border-[#1D2329]">
                      {task.points} pts
                    </span>
                    <span className="text-[11px] font-mono text-[#707A84]">
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
          <div className="panel-slate rounded-2xl p-5 space-y-4 border border-[#1D2329]">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#F3F4F1] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#2DD4BF]" /> Team Workload
              </h3>
              <Link to="/app/workload" className="text-xs text-[#2DD4BF] hover:text-[#19B5A5] font-medium">
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
                          className="w-5 h-5 rounded-full object-cover border border-[#1D2329] shrink-0"
                        />
                        <span className="font-medium text-[#F3F4F1] truncate">{member.name}</span>
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-[#A7B0B8]">
                        {assignedPoints}/{member.capacity} pts ({loadPercentage}%)
                      </span>
                    </div>

                    <div className="w-full bg-[#12161A] h-1.5 rounded-full overflow-hidden border border-[#1D2329]">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isOverloaded ? 'bg-[#EF4444]' : 'bg-[#19B5A5]'
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
          <div className="panel-slate rounded-2xl p-5 space-y-3 border border-[#1D2329]">
            <h3 className="font-bold text-sm text-[#F3F4F1]">Sprint Direct Access</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                to="/app/kanban"
                className="p-3 rounded-xl bg-[#171C21] hover:bg-[#1D2329] border border-[#1D2329] transition-colors flex flex-col gap-1"
              >
                <span className="font-semibold text-[#F3F4F1]">Kanban Board</span>
                <span className="text-[10px] text-[#707A84]">5-stage workflow</span>
              </Link>
              <Link
                to="/app/gantt"
                className="p-3 rounded-xl bg-[#171C21] hover:bg-[#1D2329] border border-[#1D2329] transition-colors flex flex-col gap-1"
              >
                <span className="font-semibold text-[#F3F4F1]">Milestone Gantt</span>
                <span className="text-[10px] text-[#707A84]">Visual date tracks</span>
              </Link>
              <Link
                to="/app/workload"
                className="p-3 rounded-xl bg-[#171C21] hover:bg-[#1D2329] border border-[#1D2329] transition-colors flex flex-col gap-1"
              >
                <span className="font-semibold text-[#F3F4F1]">Workload Matrix</span>
                <span className="text-[10px] text-[#707A84]">Capacity allocation</span>
              </Link>
              <Link
                to="/app/analytics"
                className="p-3 rounded-xl bg-[#171C21] hover:bg-[#1D2329] border border-[#1D2329] transition-colors flex flex-col gap-1"
              >
                <span className="font-semibold text-[#F3F4F1]">Sprint Analytics</span>
                <span className="text-[10px] text-[#707A84]">Velocity metrics</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
