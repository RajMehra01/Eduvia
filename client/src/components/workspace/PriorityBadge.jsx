import React from 'react';
import { AlertCircle, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';

export default function PriorityBadge({ priority, size = 'sm' }) {
  const configs = {
    Blocker: {
      label: 'Blocker',
      bg: 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30',
      dot: 'bg-[#EF4444]',
      icon: AlertCircle
    },
    High: {
      label: 'High',
      bg: 'bg-[#F2A93B]/15 text-[#F2A93B] border-[#F2A93B]/30',
      dot: 'bg-[#F2A93B]',
      icon: AlertTriangle
    },
    Normal: {
      label: 'Normal',
      bg: 'bg-[#19B5A5]/15 text-[#2DD4BF] border-[#19B5A5]/30',
      dot: 'bg-[#19B5A5]',
      icon: ArrowUp
    },
    Low: {
      label: 'Low',
      bg: 'bg-[#707A84]/15 text-[#A7B0B8] border-[#707A84]/30',
      dot: 'bg-[#707A84]',
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
