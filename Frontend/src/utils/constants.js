export const ADMIN_ROLES = {
  STATE_ADMIN: 'State Admin',
  DISTRICT_ADMIN: 'District Admin',
  DIVISIONAL_ADMIN: 'Divisional Admin',
  PINCODE_ADMIN: 'Pincode Admin'
};

export const MEMBERSHIP_TIERS = {
  SILVER: 'Silver',
  GOLD: 'Gold',
  DIAMOND: 'Diamond'
};

export const TIER_CONFIG = {
  Silver: {
    color: 'slate',
    discount: '5%',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600',
    borderClass: 'border-slate-300 dark:border-slate-500/40',
    gradient: 'from-slate-700 via-slate-600 to-slate-800'
  },
  Gold: {
    color: 'amber',
    discount: '12%',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-500/50',
    borderClass: 'border-amber-300 dark:border-amber-500/50',
    gradient: 'from-amber-600 via-amber-500 to-yellow-600'
  },
  Diamond: {
    color: 'cyan',
    discount: '20%',
    badgeClass: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/80 dark:text-cyan-300 dark:border-cyan-500/50',
    borderClass: 'border-cyan-300 dark:border-cyan-500/50',
    gradient: 'from-cyan-600 via-indigo-500 to-blue-700'
  }
};
