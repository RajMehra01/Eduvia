import React from 'react';
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Calendar,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function SprintAnalytics() {
  const { activeProject, activeTasks, metrics } = useProject();

  const totalPoints = Math.max(metrics.totalPoints, 1);
  const deployedPoints = metrics.deployedPoints;
  const inProgressPoints = metrics.inProgressPoints;
  const reviewPoints = metrics.reviewPoints;
  const backlogPoints = metrics.backlogPoints;
  const velocity = metrics.velocityRate;

  // Status distribution items
  const statusStats = [
    { label: 'Deployed / Verified', count: activeTasks.filter(t => t.status === 'deployed').length, points: deployedPoints, color: 'bg-[#10B981]', text: 'text-[#10B981]' },
    { label: 'In Progress', count: activeTasks.filter(t => t.status === 'in_progress').length, points: inProgressPoints, color: 'bg-[#19B5A5]', text: 'text-[#2DD4BF]' },
    { label: 'Code Review & QA', count: activeTasks.filter(t => t.status === 'review' || t.status === 'qa').length, points: reviewPoints, color: 'bg-[#F2A93B]', text: 'text-[#F2A93B]' },
    { label: 'Sprint Backlog', count: activeTasks.filter(t => t.status === 'backlog').length, points: backlogPoints, color: 'bg-[#707A84]', text: 'text-[#A7B0B8]' }
  ];

  // Priority distribution items
  const priorityStats = [
    { label: 'Blocker (P0)', count: activeTasks.filter(t => t.priority === 'Blocker').length, color: 'bg-[#EF4444]', text: 'text-[#EF4444]' },
    { label: 'High Priority (P1)', count: activeTasks.filter(t => t.priority === 'High').length, color: 'bg-[#F2A93B]', text: 'text-[#F2A93B]' },
    { label: 'Normal (P2)', count: activeTasks.filter(t => t.priority === 'Normal').length, color: 'bg-[#19B5A5]', text: 'text-[#2DD4BF]' },
    { label: 'Low Priority (P3)', count: activeTasks.filter(t => t.priority === 'Low').length, color: 'bg-[#707A84]', text: 'text-[#A7B0B8]' }
  ];

  // Dynamic Sprint Risk Calculation (Reconciled with active tasks)
  const activeBlockers = activeTasks.filter(t => t.priority === 'Blocker' && t.status !== 'deployed').length;
  const highPriorityCount = activeTasks.filter(t => t.priority === 'High' && t.status !== 'deployed').length;

  let riskBadge = 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30';
  let riskLabel = 'Low Risk';
  let riskDescription = 'All blockers resolved and deliverables tracking within healthy sprint velocity.';

  if (activeBlockers > 0) {
    riskBadge = 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30';
    riskLabel = 'Elevated Risk';
    riskDescription = `${activeBlockers} active blocker in sprint backlog requires resolution before release.`;
  } else if (highPriorityCount >= activeTasks.length * 0.5) {
    riskBadge = 'bg-[#F2A93B]/15 text-[#F2A93B] border-[#F2A93B]/30';
    riskLabel = 'Moderate Risk';
    riskDescription = `${highPriorityCount} high-priority tasks in flight require active developer focus.`;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="panel-slate rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#1D2329]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F3F4F1] tracking-tight flex items-center gap-2.5">
            <TrendingUp className="w-6 h-6 text-[#2DD4BF]" />
            Sprint Velocity & Burn-Down Metrics
          </h1>
          <p className="text-xs text-[#A7B0B8] mt-0.5">
            Delivery throughput, story points distribution, and estimation accuracy for {activeProject?.name}.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-xl bg-[#171C21] border border-[#1D2329] text-[#2DD4BF] flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Target Velocity: 35 pts / sprint</span>
          </span>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-slate rounded-xl p-4 space-y-2 border border-[#1D2329]">
          <div className="text-xs font-medium text-[#A7B0B8]">Total Sprint Scope</div>
          <div className="text-2xl font-mono font-bold text-[#F3F4F1]">{metrics.totalPoints} pts</div>
          <p className="text-[11px] text-[#707A84]">{activeTasks.length} active registered deliverables</p>
        </div>

        <div className="card-slate rounded-xl p-4 space-y-2 border border-[#1D2329]">
          <div className="text-xs font-medium text-[#A7B0B8]">Deployed Story Points</div>
          <div className="text-2xl font-mono font-bold text-[#10B981]">{deployedPoints} pts</div>
          <p className="text-[11px] text-[#707A84]">Verified and deployed to production</p>
        </div>

        <div className="card-slate rounded-xl p-4 space-y-2 border border-[#1D2329]">
          <div className="text-xs font-medium text-[#A7B0B8]">In-Progress Points</div>
          <div className="text-2xl font-mono font-bold text-[#2DD4BF]">{inProgressPoints} pts</div>
          <p className="text-[11px] text-[#707A84]">Under active engineering implementation</p>
        </div>

        <div className="card-slate rounded-xl p-4 space-y-2 border border-[#1D2329]">
          <div className="text-xs font-medium text-[#A7B0B8]">Current Sprint Velocity</div>
          <div className="text-2xl font-mono font-bold text-[#F3F4F1]">{velocity}%</div>
          <p className="text-[11px] text-[#707A84]">Completion rate for active sprint cycle</p>
        </div>
      </div>

      {/* 2 Analytical Breakdowns: Status Distribution + Priority Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Breakdown */}
        <div className="panel-slate rounded-2xl p-5 space-y-4 border border-[#1D2329]">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#F3F4F1] flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#2DD4BF]" /> Story Points by Workflow Status
            </h3>
            <span className="text-[11px] font-mono text-[#707A84]">Total {metrics.totalPoints} pts</span>
          </div>

          {/* Stacked Progress Bar */}
          <div className="w-full h-3 rounded-full bg-[#12161A] overflow-hidden flex gap-0.5 p-0.5 border border-[#1D2329]">
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
                className="p-3 bg-[#171C21] rounded-xl border border-[#1D2329] flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  <span className="font-semibold text-[#F3F4F1]">{item.label}</span>
                  <span className="text-[10px] text-[#707A84] font-mono">({item.count} tasks)</span>
                </div>
                <div className="font-mono font-bold text-right">
                  <span className={item.text}>{item.points} pts</span>
                  <span className="text-[#707A84] ml-2 text-[10px]">
                    {Math.round((item.points / totalPoints) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="panel-slate rounded-2xl p-5 space-y-4 border border-[#1D2329]">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#F3F4F1] flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#2DD4BF]" /> Deliverable Priority Breakdown
            </h3>
            <span className="text-[11px] font-mono text-[#707A84]">Total {activeTasks.length} tasks</span>
          </div>

          <div className="space-y-2.5 pt-1">
            {priorityStats.map((item, i) => {
              const pct = Math.round((item.count / Math.max(activeTasks.length, 1)) * 100);

              return (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#A7B0B8] flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${item.color}`} />
                      {item.label}
                    </span>
                    <span className="font-mono text-[#F3F4F1] font-semibold">
                      {item.count} items ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#12161A] h-2 rounded-full overflow-hidden border border-[#1D2329]">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Sprint Risk Feedback (Fixes 9.A) */}
          <div className="pt-3 border-t border-[#1D2329] flex items-start gap-2.5 text-[11px] text-[#A7B0B8]">
            <span className={`px-2 py-0.5 rounded font-mono font-semibold text-[10px] shrink-0 border ${riskBadge}`}>
              {riskLabel}
            </span>
            <p className="leading-relaxed">
              {riskDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
