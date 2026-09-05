import React from 'react';
import { TIER_CONFIG } from '../utils/constants';

export function TierBadge({ tier, className = '' }) {
  if (!tier) return null;

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
  let colorStyles = 'bg-slate-800 text-slate-300 border-slate-700';

  if (['active', 'delivered', 'approved', 'verified', 'resolved', 'confirmed', 'available'].includes(s)) {
    colorStyles = 'bg-emerald-950/70 text-emerald-300 border-emerald-500/30';
  } else if (['paid'].includes(s)) {
    colorStyles = 'bg-indigo-950/70 text-indigo-300 border-indigo-500/30';
  } else if (['pending', 'processing', 'scheduled', 'busy'].includes(s)) {
    colorStyles = 'bg-amber-950/70 text-amber-300 border-amber-500/30';
  } else if (['in progress', 'shipped', 'out for delivery', 'on duty'].includes(s)) {
    colorStyles = 'bg-sky-950/70 text-sky-300 border-sky-500/30';
  } else if (['rejected', 'cancelled', 'inactive', 'urgent', 'high'].includes(s)) {
    colorStyles = 'bg-rose-950/70 text-rose-300 border-rose-500/30';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${colorStyles} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {status}
    </span>
  );
}
