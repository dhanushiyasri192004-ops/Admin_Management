import React from 'react';
import { Modal } from './Modal';
import { StatusBadge } from './Badge';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Award, 
  Building2, 
  Layers, 
  Wallet, 
  TrendingUp, 
  Store, 
  Users, 
  ShieldCheck, 
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export function AgentDetailsModal({ isOpen, onClose, agent }) {
  if (!agent) return null;

  const getLevelIcon = (level) => {
    switch (level) {
      case 'state': return Award;
      case 'district': return Building2;
      case 'divisional': return Layers;
      case 'pincode': return MapPin;
      default: return User;
    }
  };

  const Icon = getLevelIcon(agent.level);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Agent Hierarchical Profile" maxWidth="max-w-xl">
      <div className="space-y-4">
        {/* Agent Header */}
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-900/50">
          <div className="p-3 rounded-xl bg-white/10 text-white border border-white/20">
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">{agent.name}</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-300 border border-blue-400/40 uppercase">
                {agent.role || `${agent.level} Agent`}
              </span>
            </div>
            <div className="text-xs text-slate-300 font-mono mt-0.5">{agent.id} • Joined: {agent.joinedDate}</div>
            <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" /> {agent.phone}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {agent.email}</span>
            </div>
          </div>
        </div>

        {/* Hierarchy Reporting Line */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Hierarchical Governance Chain
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <ArrowUp className="w-3.5 h-3.5 text-blue-500" />
                <span className="font-semibold">Reports To (Supervisor):</span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white">
                {agent.supervisorName || 'Apex State Management'}
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-semibold">Jurisdiction & Scope:</span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white">
                {agent.jurisdiction || agent.district || 'Tamil Nadu'}
              </span>
            </div>

            {agent.subordinatesCount > 0 && (
              <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <ArrowDown className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="font-semibold">Subordinates Supervised:</span>
                </div>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {agent.subordinatesCount} Lower-Tier Agents
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Performance & Financial Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-center">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Total Referrals</div>
            <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{agent.totalReferrals || 0}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-center">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Active Cards</div>
            <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{agent.activeSubscribers || 0}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-center">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Vendor Onboardings</div>
            <div className="text-base font-bold text-blue-600 dark:text-blue-400 mt-0.5">{agent.vendorOnboardings || 0}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-center">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Wallet Hold</div>
            <div className="text-base font-bold text-amber-600 dark:text-amber-400 mt-0.5">₹{(agent.walletBalance || 0).toLocaleString()}</div>
          </div>
        </div>

        {/* Total Earned Badge */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50">
          <div className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">
            Cumulative Payout Disbursed
          </div>
          <div className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
            ₹{(agent.totalEarned || 0).toLocaleString()}
          </div>
        </div>
      </div>
    </Modal>
  );
}
