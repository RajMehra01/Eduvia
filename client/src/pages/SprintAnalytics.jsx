import React from 'react';
import {
  TrendingUp,
  BarChart3,
  PieChart,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function SprintAnalytics() {
  const { activeProject, activeTasks, team, metrics } = useProject();

  const totalPoints = Math.max(metrics.totalPoints, 1);
  const deployedPoints = metrics.deployedPoints;
  const inProgressPoints = metrics.inProgressPoints;
  const reviewPoints = metrics.reviewPoints;
  const backlogPoints = metrics.backlogPoints;
  const velocity = metrics.velocityRate;

  // Status distribution items
  const statusStats = [
    { label: 'Deployed / Done', count: activeTasks.filter(t => t.status === 'deployed').length, points: deployedPoints, color: 'bg-emerald-500', text: 'text-emerald-400' },
    { label: 'In Progress', count: activeTasks.filter(t => t.status === 'in_progress').length, points: inProgressPoints, color: 'bg-indigo-500', text: 'text-indigo-400' },
    { label: 'Code Review & QA', count: activeTasks.filter(t => t.status === 'review' || t.status === 'qa').length, points: reviewPoints, color: 'bg-sky-500', text: 'text-sky-400' },
    { label: 'Sprint Backlog', count: activeTasks.filter(t => t.status === 'backlog').length, points: backlogPoints, color: 'bg-slate-500', text: 'text-slate-400' }
  ];

  // Priority distribution items
  const priorityStats = [
    { label: 'Blocker (P0)', count: activeTasks.filter(t => t.priority === 'Blocker').length, color: 'bg-rose-500', text: 'text-rose-400' },
    { label: 'High Priority (P1)', count: activeTasks.filter(t => t.priority === 'High').length, color: 'bg-amber-500', text: 'text-amber-400' },
    { label: 'Normal (P2)', count: activeTasks.filter(t => t.priority === 'Normal').length, color: 'bg-indigo-500', text: 'text-indigo-400' },
    { label: 'Low Priority (P3)', count: activeTasks.filter(t => t.priority === 'Low').length, color: 'bg-slate-500', text: 'text-slate-400' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="panel-slate rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2.5">
            <TrendingUp className="w-6 h-6 text-indigo-400" />
            Sprint Velocity & Burn-Down Telemetry
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time delivery throughput, story points breakdown, and estimation accuracy for {activeProject?.name}.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-xl bg-indigo-950/70 border border-indigo-800/60 text-indigo-300 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Target Velocity: 35 pts / sprint</span>
          </span>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-slate rounded-xl p-4 space-y-2">
          <div className="text-xs font-medium text-slate-400">Total Sprint Backlog</div>
          <div className="text-2xl font-mono font-bold text-slate-100">{metrics.totalPoints} pts</div>
          <p className="text-[11px] text-slate-400">{activeTasks.length} active registered deliverables</p>
        </div>

        <div className="card-slate rounded-xl p-4 space-y-2">
          <div className="text-xs font-medium text-slate-400">Deployed Story Points</div>
          <div className="text-2xl font-mono font-bold text-emerald-400">{deployedPoints} pts</div>
          <p className="text-[11px] text-slate-400">Verified and deployed to production</p>
        </div>

        <div className="card-slate rounded-xl p-4 space-y-2">
          <div className="text-xs font-medium text-slate-400">In-Flight Story Points</div>
          <div className="text-2xl font-mono font-bold text-indigo-400">{inProgressPoints} pts</div>
          <p className="text-[11px] text-slate-400">Under active implementation</p>
        </div>

        <div className="card-slate rounded-xl p-4 space-y-2">
          <div className="text-xs font-medium text-slate-400">Current Sprint Velocity</div>
          <div className="text-2xl font-mono font-bold text-indigo-300">{velocity}%</div>
          <p className="text-[11px] text-slate-400">On pace for sprint milestone targets</p>
        </div>
      </div>

      {/* 2 Analytical Breakdowns: Status Distribution + Priority Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Breakdown */}
        <div className="panel-slate rounded-2xl p-5 space-y-4 border border-[#1f2637]">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-400" /> Story Points by Workflow Status
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Total {metrics.totalPoints} pts</span>
          </div>

          {/* Stacked Progress Bar */}
          <div className="w-full h-3 rounded-full bg-[#181d2a] overflow-hidden flex gap-0.5 p-0.5 border border-[#222a3d]">
            {statusStats.map((item, i) => (
              <div
                key={i}
                className={`h-full ${item.color}`}
                style={{ width: `${(item.points / totalPoints) * 100}%` }}
                title={`${item.label}: ${item.points} pts`}
              />
            ))}
          </div>

          {/* Detailed Rows */}
          <div className="space-y-2 pt-2">
            {statusStats.map((item, i) => (
              <div
                key={i}
                className="p-3 bg-[#131722] rounded-xl border border-[#1c2336] flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  <span className="font-semibold text-slate-200">{item.label}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({item.count} tasks)</span>
                </div>
                <div className="font-mono font-bold text-right">
                  <span className={item.text}>{item.points} pts</span>
                  <span className="text-slate-400 ml-2 text-[10px]">
                    {Math.round((item.points / totalPoints) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="panel-slate rounded-2xl p-5 space-y-4 border border-[#1f2637]">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-indigo-400" /> Deliverable Priority Breakdown
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Total {activeTasks.length} tasks</span>
          </div>

          <div className="space-y-2.5 pt-1">
            {priorityStats.map((item, i) => {
              const pct = Math.round((item.count / Math.max(activeTasks.length, 1)) * 100);

              return (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-300 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${item.color}`} />
                      {item.label}
                    </span>
                    <span className="font-mono text-slate-200 font-semibold">
                      {item.count} items ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#181d2a] h-2 rounded-full overflow-hidden border border-[#222a3d]">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#1c2333] text-[11px] text-slate-400">
            Sprint risk level is currently evaluated as <strong className="text-emerald-400">Low</strong> based on resolved blocker count.
          </div>
        </div>
      </div>
    </div>
  );
}
