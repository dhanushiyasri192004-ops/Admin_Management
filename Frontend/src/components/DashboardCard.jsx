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
      bg: 'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800/40',
      badge: 'text-indigo-700 bg-indigo-50 border-indigo-200 dark:text-indigo-400 dark:bg-indigo-950/60 dark:border-indigo-700/30'
    },
    emerald: {
      bg: 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40',
      badge: 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/60 dark:border-emerald-700/30'
    },
    amber: {
      bg: 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/40',
      badge: 'text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/60 dark:border-amber-700/30'
    },
    sky: {
      bg: 'bg-sky-50 text-sky-600 border-sky-100 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800/40',
      badge: 'text-sky-700 bg-sky-50 border-sky-200 dark:text-sky-400 dark:bg-sky-950/60 dark:border-sky-700/30'
    },
    rose: {
      bg: 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/40',
      badge: 'text-rose-700 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/60 dark:border-rose-700/30'
    },
    purple: {
      bg: 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800/40',
      badge: 'text-purple-700 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-950/60 dark:border-purple-700/30'
    }
  };

  const scheme = schemeClasses[colorScheme] || schemeClasses.indigo;

  return (
    <div
      onClick={onClick}
      className={`admin-card bg-white dark:bg-[#131f37] border border-slate-200 dark:border-[#1f3358] rounded-2xl p-5 relative overflow-hidden transition-all duration-200 hover:shadow-md ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1.5 tracking-tight font-sans">
            {value}
          </h3>
        </div>

        {Icon && (
          <div className={`p-3 rounded-xl border ${scheme.bg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-xs">
        <span className="text-slate-500 dark:text-slate-400 truncate max-w-[170px]">{subtitle || 'Updated just now'}</span>

        {trend && (
          <span
            className={`inline-flex items-center gap-0.5 font-semibold px-2 py-0.5 rounded-full border text-[11px] ${
              trendDirection === 'up'
                ? 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/50 dark:border-emerald-800/40'
                : 'text-rose-700 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/50 dark:border-rose-800/40'
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
