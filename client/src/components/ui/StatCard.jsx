import React from 'react';

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive = true,
  className = ''
}) {
  return (
    <div className={`bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 group ${className}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
        </div>
        {Icon && (
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 group-hover:scale-105 transition-transform">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          {subtitle && <span className="text-slate-500">{subtitle}</span>}
          {trend && (
            <span className={`font-semibold ${trendPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
