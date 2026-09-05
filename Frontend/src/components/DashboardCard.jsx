import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendDirection = 'up',
  colorScheme = 'indigo',
  onClick
}) {
  const schemeClasses = {
    indigo: {
      bg: 'bg-indigo-950/40 text-indigo-400 border-indigo-800/40',
      badge: 'text-indigo-400 bg-indigo-950/60 border-indigo-700/30'
    },
    emerald: {
      bg: 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40',
      badge: 'text-emerald-400 bg-emerald-950/60 border-emerald-700/30'
    },
    amber: {
      bg: 'bg-amber-950/40 text-amber-400 border-amber-800/40',
      badge: 'text-amber-400 bg-amber-950/60 border-amber-700/30'
    },
    sky: {
      bg: 'bg-sky-950/40 text-sky-400 border-sky-800/40',
      badge: 'text-sky-400 bg-sky-950/60 border-sky-700/30'
    },
    rose: {
      bg: 'bg-rose-950/40 text-rose-400 border-rose-800/40',
      badge: 'text-rose-400 bg-rose-950/60 border-rose-700/30'
    },
    purple: {
      bg: 'bg-purple-950/40 text-purple-400 border-purple-800/40',
      badge: 'text-purple-400 bg-purple-950/60 border-purple-700/30'
    }
  };

  const scheme = schemeClasses[colorScheme] || schemeClasses.indigo;

  return (
    <div
      onClick={onClick}
      className={`glass-panel glass-panel-hover rounded-2xl p-5 relative overflow-hidden transition-all duration-200 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
            {title}
          </span>
          <h3 className="text-2xl font-extrabold text-white mt-1.5 tracking-tight font-sans">
            {value}
          </h3>
        </div>

        {Icon && (
          <div className={`p-3 rounded-xl border ${scheme.bg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/60 text-xs">
        <span className="text-slate-400 truncate max-w-[170px]">{subtitle || 'Updated just now'}</span>

        {trend && (
          <span
            className={`inline-flex items-center gap-0.5 font-semibold px-2 py-0.5 rounded-full border text-[11px] ${
              trendDirection === 'up'
                ? 'text-emerald-400 bg-emerald-950/50 border-emerald-800/40'
                : 'text-rose-400 bg-rose-950/50 border-rose-800/40'
            }`}
          >
            {trendDirection === 'up' ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
