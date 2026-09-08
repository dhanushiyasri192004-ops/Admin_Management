import React from 'react';
import { TIER_CONFIG } from '../utils/constants';

export function TierBadge({ tier, className = '' }) {
  if (!tier || tier.toLowerCase() === 'customer' || tier.toLowerCase() === 'customers') {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 ${className}`}>
        Customer
      </span>
    );
  }

  const config = TIER_CONFIG[tier] || TIER_CONFIG.Silver;

  let iconColor = 'text-slate-400';
  if (tier === 'Diamond') iconColor = 'text-cyan-400';
  if (tier === 'Gold') iconColor = 'text-amber-400';

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.badgeClass} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full bg-current ${iconColor}`}></span>
      {tier} Card
    </span>
  );
}

export function StatusBadge({ status, className = '' }) {
  if (!status) return null;

  const s = status.toLowerCase();
  let colorStyles = 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';

  if (['active', 'delivered', 'approved', 'verified', 'resolved', 'confirmed', 'available'].includes(s)) {
    colorStyles = 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-500/30';
  } else if (['paid'].includes(s)) {
    colorStyles = 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-500/30';
  } else if (['pending', 'processing', 'scheduled', 'busy'].includes(s)) {
    colorStyles = 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-500/30';
  } else if (['in progress', 'shipped', 'out for delivery', 'on duty'].includes(s)) {
    colorStyles = 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/70 dark:text-sky-300 dark:border-sky-500/30';
  } else if (['rejected', 'cancelled', 'inactive', 'urgent', 'high'].includes(s)) {
    colorStyles = 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-500/30';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${colorStyles} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {status}
    </span>
  );
}
