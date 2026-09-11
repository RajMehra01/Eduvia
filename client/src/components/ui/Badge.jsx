import React from 'react';

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon: Icon
}) {
  const base = 'inline-flex items-center font-medium rounded-full tracking-normal select-none';

  const variants = {
    default: 'bg-blue-50 text-blue-700 border border-blue-200/80',
    blue: 'bg-blue-50 text-blue-700 border border-blue-200/80',
    emerald: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
    amber: 'bg-amber-50 text-amber-800 border border-amber-200/80',
    rose: 'bg-rose-50 text-rose-700 border border-rose-200/80',
    slate: 'bg-slate-100 text-slate-700 border border-slate-200/80',
    outline: 'bg-white text-slate-600 border border-slate-300'
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-0.5 gap-1.5',
    lg: 'text-xs px-3 py-1 gap-1.5 font-semibold'
  };

  return (
    <span className={`${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`}>
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      {children}
    </span>
  );
}
