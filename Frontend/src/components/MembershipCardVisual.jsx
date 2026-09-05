import React from 'react';
import { CreditCard, Sparkles, Award, ShieldCheck } from 'lucide-react';
import { TIER_CONFIG } from '../utils/constants';

export function MembershipCardVisual({ customer, tier, cardNumber, points, expiryDate, discountPercent }) {
  const currentTier = tier || (customer?.membership?.tier) || 'Silver';
  const cNum = cardNumber || customer?.membership?.cardNumber || 'CARD-0000-0000';
  const pts = points !== undefined ? points : (customer?.membership?.points || 0);
  const exp = expiryDate || customer?.membership?.expiryDate || '2026-12-31';
  const disc = discountPercent || customer?.membership?.discountPercent || (currentTier === 'Diamond' ? 20 : currentTier === 'Gold' ? 12 : 5);
  const custName = customer?.name || 'Valued Member';

  const tierStyles = {
    Diamond: {
      bg: 'card-tier-diamond',
      border: 'border-cyan-300/40',
      icon: <Sparkles className="w-5 h-5 text-cyan-200 animate-pulse" />,
      tag: 'DIAMOND VIP ELITE'
    },
    Gold: {
      bg: 'card-tier-gold',
      border: 'border-amber-300/40',
      icon: <Award className="w-5 h-5 text-amber-100" />,
      tag: 'GOLD PRIVILEGE'
    },
    Silver: {
      bg: 'card-tier-silver',
      border: 'border-slate-300/40',
      icon: <ShieldCheck className="w-5 h-5 text-slate-100" />,
      tag: 'SILVER ADVANTAGE'
    }
  };

  const style = tierStyles[currentTier] || tierStyles.Silver;

  return (
    <div className={`relative overflow-hidden rounded-2xl p-5 text-white shadow-2xl ${style.bg} border ${style.border} transition-all duration-300 hover:scale-[1.02]`}>
      {/* Decorative ambient background overlays */}
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
      <div className="absolute -left-6 -bottom-6 w-24 h-24 rounded-full bg-black/10 blur-lg pointer-events-none"></div>
      
      {/* Top row: Brand & Tier Badge */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase bg-black/20 px-2 py-0.5 rounded backdrop-blur-sm">
            {style.tag}
          </span>
          <h4 className="text-sm font-semibold tracking-wide mt-1 text-white/95">AMS Privilege Card</h4>
        </div>
        <div className="p-2 rounded-xl bg-black/20 backdrop-blur-md">
          {style.icon}
        </div>
      </div>

      {/* Chip & Contactless icon */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-9 h-7 rounded bg-amber-200/90 border border-amber-400/50 flex flex-col justify-around p-1 shadow-inner">
          <div className="h-[1px] bg-amber-700/40 w-full"></div>
          <div className="h-[1px] bg-amber-700/40 w-full"></div>
        </div>
        <CreditCard className="w-6 h-6 text-white/60" />
      </div>

      {/* Card Number */}
      <div className="font-mono text-sm tracking-widest font-bold mb-4 drop-shadow text-white">
        {cNum}
      </div>

      {/* Bottom info */}
      <div className="flex justify-between items-end text-xs text-white/90 pt-2 border-t border-white/15">
        <div>
          <div className="text-[10px] text-white/70 uppercase tracking-wider">Card Holder</div>
          <div className="font-semibold text-sm truncate max-w-[150px]">{custName}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-white/70 uppercase tracking-wider">Perks & Points</div>
          <div className="font-bold text-sm text-emerald-200">{disc}% Off • {pts.toLocaleString()} Pts</div>
        </div>
      </div>
    </div>
  );
}
