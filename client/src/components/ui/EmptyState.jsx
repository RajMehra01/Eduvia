import React from 'react';
import Button from './Button';

export default function EmptyState({
  icon: Icon,
  title = 'No items found',
  description = 'Try adjusting your search query or filters to find what you need.',
  actionLabel,
  onAction,
  className = ''
}) {
  return (
    <div className={`bg-white rounded-2xl p-10 border border-dashed border-slate-300 text-center flex flex-col items-center justify-center space-y-4 ${className}`}>
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-xs">
          <Icon className="w-7 h-7" />
        </div>
      )}
      <div className="space-y-1.5 max-w-sm">
        <h4 className="text-base font-bold text-slate-800">{title}</h4>
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
      </div>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
