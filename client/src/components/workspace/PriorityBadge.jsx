import React from 'react';
import { AlertCircle, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';

export default function PriorityBadge({ priority, size = 'sm' }) {
  const configs = {
    Blocker: {
      label: 'Blocker',
      bg: 'bg-rose-950/60 text-rose-300 border-rose-800/60',
      dot: 'bg-rose-500',
      icon: AlertCircle
    },
    High: {
      label: 'High',
      bg: 'bg-amber-950/50 text-amber-300 border-amber-800/60',
      dot: 'bg-amber-500',
      icon: AlertTriangle
    },
    Normal: {
      label: 'Normal',
      bg: 'bg-indigo-950/50 text-indigo-300 border-indigo-800/60',
      dot: 'bg-indigo-400',
      icon: ArrowUp
    },
    Low: {
      label: 'Low',
      bg: 'bg-slate-900/70 text-slate-400 border-slate-700/60',
      dot: 'bg-slate-500',
      icon: ArrowDown
    }
  };

  const config = configs[priority] || configs.Normal;
  const Icon = config.icon;

  const sizeClasses = size === 'xs' 
    ? 'text-[10px] px-1.5 py-0.5 gap-1' 
    : 'text-[11px] px-2 py-0.5 gap-1.5 font-medium';

  return (
    <span
      className={`inline-flex items-center rounded-md border font-mono tracking-tight transition-colors ${config.bg} ${sizeClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <Icon className="w-3 h-3 shrink-0" />
      <span>{config.label}</span>
    </span>
  );
}
