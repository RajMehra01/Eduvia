import React from 'react';
import { Users2, Activity, ShieldCheck, AlertTriangle, AlertOctagon, CheckCircle2, ChevronRight } from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function WorkloadMatrix() {
  const { team, activeTasks, setSelectedTask } = useProject();

  const getWorkloadSemantic = (utilization) => {
    if (utilization >= 90) {
      return {
        label: 'Overloaded',
        description: 'Exceeds target safe capacity threshold (>90%)',
        badge: 'bg-rose-950/70 text-rose-300 border-rose-800/60',
        bar: 'bg-rose-500',
        icon: AlertOctagon
      };
    } else if (utilization >= 75) {
      return {
        label: 'At Capacity',
        description: 'Within optimal upper sprint limit (75–90%)',
        badge: 'bg-amber-950/70 text-amber-300 border-amber-800/60',
        bar: 'bg-amber-500',
        icon: AlertTriangle
      };
    } else {
      return {
        label: 'Healthy',
        description: 'Balanced bandwidth with headroom for review (<75%)',
        badge: 'bg-emerald-950/70 text-emerald-300 border-emerald-800/60',
        bar: 'bg-indigo-500',
        icon: ShieldCheck
      };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="panel-slate rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2.5">
            <Users2 className="w-6 h-6 text-indigo-400" />
            Team Workload Allocation Matrix
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Sprint bandwidth capacity heatmap measuring active story point assignments against individual developer limits.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-[11px] font-mono shrink-0">
          <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Healthy &lt;75%
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/50 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> At Capacity 75-90%
          </span>
          <span className="px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800/50 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Overloaded &gt;90%
          </span>
        </div>
      </div>

      {/* Team Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {team.map((member) => {
          const assignedTasks = activeTasks.filter((t) => t.assignee === member.name);
          const totalPoints = assignedTasks.reduce((acc, t) => acc + (t.points || 0), 0);
          const deployedPoints = assignedTasks
            .filter((t) => t.status === 'deployed')
            .reduce((acc, t) => acc + (t.points || 0), 0);
          const utilizationPercent = Math.min(Math.round((totalPoints / member.capacity) * 100), 100);
          const semantic = getWorkloadSemantic(utilizationPercent);
          const SemanticIcon = semantic.icon;

          return (
            <div
              key={member.id}
              className="panel-slate rounded-2xl p-5 space-y-4 flex flex-col justify-between border border-[#1f2637]"
            >
              <div className="space-y-4">
                {/* Member Profile & Status Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-md"
                    />
                    <div>
                      <h3 className="font-bold text-slate-100 text-sm leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-xs text-indigo-400 font-medium mt-0.5">
                        {member.role}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {member.email}
                      </p>
                    </div>
                  </div>

                  {/* Semantic Status Badge */}
                  <div className="text-right shrink-0">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${semantic.badge}`}
                    >
                      <SemanticIcon className="w-3.5 h-3.5" />
                      <span>{semantic.label}</span>
                    </span>
                  </div>
                </div>

                {/* Capacity Progress Bar */}
                <div className="bg-[#141824] p-3 rounded-xl border border-[#1e2638] space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Sprint Capacity</span>
                    <span className="text-slate-200 font-bold">
                      {totalPoints} / {member.capacity} pts ({utilizationPercent}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#1b2233] h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${semantic.bar}`}
                      style={{ width: `${utilizationPercent}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 flex justify-between">
                    <span>{semantic.description}</span>
                    <span className="font-mono text-emerald-400">{deployedPoints} pts deployed</span>
                  </div>
                </div>

                {/* Assigned Tasks Stream */}
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                    <span>Assigned Deliverables ({assignedTasks.length}):</span>
                    <span className="text-[10px] font-mono text-slate-400">Points Breakdown</span>
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {assignedTasks.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTask(t)}
                        className="p-2.5 rounded-lg bg-[#141824] hover:bg-[#181e2e] border border-[#1d2537] flex items-center justify-between gap-3 text-xs cursor-pointer transition-colors group"
                      >
                        <div className="min-w-0 flex items-center gap-2">
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              t.status === 'deployed'
                                ? 'bg-emerald-400'
                                : t.status === 'in_progress'
                                ? 'bg-indigo-400'
                                : 'bg-slate-400'
                            }`}
                          />
                          <span className="truncate text-slate-200 group-hover:text-indigo-400 font-medium">
                            {t.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 font-mono text-[10px]">
                          <span className="text-slate-400 capitalize">{t.status.replace('_', ' ')}</span>
                          <span className="font-bold text-indigo-300 bg-[#1a2133] px-1.5 py-0.5 rounded border border-[#27324d]">
                            {t.points} pt
                          </span>
                        </div>
                      </div>
                    ))}

                    {assignedTasks.length === 0 && (
                      <div className="py-4 text-center text-xs text-slate-400 italic">
                        No tasks currently allocated to this member.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
