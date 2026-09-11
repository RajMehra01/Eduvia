import React from 'react';
import { Users2, ShieldCheck, AlertTriangle, AlertOctagon } from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export default function WorkloadMatrix() {
  const { team, activeTasks, setSelectedTask } = useProject();

  const getWorkloadSemantic = (utilization) => {
    if (utilization >= 90) {
      return {
        label: 'Overloaded',
        description: 'Exceeds target safe capacity threshold (>90%)',
        badge: 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30',
        bar: 'bg-[#EF4444]',
        icon: AlertOctagon
      };
    } else if (utilization >= 75) {
      return {
        label: 'At Capacity',
        description: 'Within optimal upper sprint limit (75–90%)',
        badge: 'bg-[#F2A93B]/15 text-[#F2A93B] border-[#F2A93B]/30',
        bar: 'bg-[#F2A93B]',
        icon: AlertTriangle
      };
    } else {
      return {
        label: 'Healthy',
        description: 'Balanced bandwidth with headroom for review (<75%)',
        badge: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30',
        bar: 'bg-[#19B5A5]',
        icon: ShieldCheck
      };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="panel-slate rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#1D2329]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F3F4F1] tracking-tight flex items-center gap-2.5">
            <Users2 className="w-6 h-6 text-[#2DD4BF]" />
            Team Workload Allocation Matrix
          </h1>
          <p className="text-xs text-[#A7B0B8] mt-0.5">
            Sprint capacity heatmap measuring active story point assignments against developer bandwidth limits.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-[11px] font-mono shrink-0">
          <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Healthy &lt;75%
          </span>
          <span className="px-2 py-0.5 rounded bg-[#F2A93B]/15 text-[#F2A93B] border border-[#F2A93B]/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F2A93B]" /> At Capacity 75-90%
          </span>
          <span className="px-2 py-0.5 rounded bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" /> Overloaded &gt;90%
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
              className="panel-slate rounded-2xl p-5 space-y-4 flex flex-col justify-between border border-[#1D2329]"
            >
              <div className="space-y-4">
                {/* Member Profile & Status Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#1D2329] shadow-md"
                    />
                    <div>
                      <h3 className="font-bold text-[#F3F4F1] text-sm leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-xs text-[#2DD4BF] font-medium mt-0.5">
                        {member.role}
                      </p>
                      <p className="text-[10px] text-[#707A84] font-mono">
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
                <div className="bg-[#171C21] p-3 rounded-xl border border-[#1D2329] space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#A7B0B8]">Sprint Capacity</span>
                    <span className="text-[#F3F4F1] font-bold">
                      {totalPoints} / {member.capacity} pts ({utilizationPercent}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#12161A] h-2 rounded-full overflow-hidden border border-[#1D2329]">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${semantic.bar}`}
                      style={{ width: `${utilizationPercent}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-[#707A84] flex justify-between">
                    <span>{semantic.description}</span>
                    <span className="font-mono text-[#10B981]">{deployedPoints} pts deployed</span>
                  </div>
                </div>

                {/* Assigned Tasks Stream */}
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-semibold text-[#A7B0B8] flex items-center justify-between">
                    <span>Assigned Deliverables ({assignedTasks.length}):</span>
                    <span className="text-[10px] font-mono text-[#707A84]">Points Breakdown</span>
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {assignedTasks.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTask(t)}
                        className="p-2.5 rounded-lg bg-[#171C21] hover:bg-[#1D2329] border border-[#1D2329] flex items-center justify-between gap-3 text-xs cursor-pointer transition-colors group"
                      >
                        <div className="min-w-0 flex items-center gap-2">
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              t.status === 'deployed'
                                ? 'bg-[#10B981]'
                                : t.status === 'in_progress'
                                ? 'bg-[#19B5A5]'
                                : 'bg-[#707A84]'
                            }`}
                          />
                          <span className="truncate text-[#F3F4F1] group-hover:text-[#2DD4BF] font-medium">
                            {t.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 font-mono text-[10px]">
                          <span className="text-[#707A84] capitalize">{t.status.replace('_', ' ')}</span>
                          <span className="font-bold text-[#2DD4BF] bg-[#12161A] px-1.5 py-0.5 rounded border border-[#1D2329]">
                            {t.points} pt
                          </span>
                        </div>
                      </div>
                    ))}

                    {assignedTasks.length === 0 && (
                      <div className="py-4 text-center text-xs text-[#707A84] italic">
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
