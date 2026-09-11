import React from 'react';

export default function ProgressBar({
  value = 0,
  max = 100,
  showLabel = true,
  label = 'Course Completion',
  variant = 'blue',
  size = 'md',
  className = ''
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const variants = {
    blue: 'bg-blue-600',
    emerald: 'bg-emerald-600',
    amber: 'bg-amber-500',
    gradient: 'bg-gradient-to-r from-blue-600 to-emerald-500'
  };

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-2.5'
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-medium">
          <span className="text-slate-600">{label}</span>
          <span className="font-semibold text-slate-800">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/80 ${sizes[size] || sizes.md}`}>
        <div
          className={`h-full rounded-full ${variants[variant] || variants.blue} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
