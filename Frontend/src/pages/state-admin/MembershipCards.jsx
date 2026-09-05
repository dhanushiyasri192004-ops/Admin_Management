import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { TierBadge, StatusBadge } from '../../components/Badge';
import { MembershipCardVisual } from '../../components/MembershipCardVisual';
import { CreditCard, Award, ArrowUpRight, Sparkles } from 'lucide-react';

export function StateMembershipCards() {
  const [cardsData, setCardsData] = useState({ cards: [], counts: {} });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getMembershipCards();
      if (res.success) {
        setCardsData({
          cards: res.cards || [],
          counts: res.counts || {}
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    {
      header: 'Cardholder Details',
      accessor: 'customerName',
      render: (row) => (
        <div>
          <div className="font-bold text-slate-900 dark:text-white text-xs">{row.customerName}</div>
          <div className="font-mono text-[11px] text-blue-600 dark:text-indigo-300 font-bold mt-0.5">{row.cardNumber}</div>
          <div className="text-[10px] text-slate-500">Issued: {row.issueDate}</div>
        </div>
      )
    },
    {
      header: 'Membership Tier',
      accessor: 'tier',
      render: (row) => <TierBadge tier={row.tier} />
    },
    {
      header: 'Perk Discount',
      accessor: 'discountPercent',
      render: (row) => (
        <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">
          {row.discountPercent}% Instant Off
        </span>
      )
    },
    {
      header: 'Reward Points',
      accessor: 'points',
      render: (row) => (
        <span className="font-mono font-bold text-slate-900 dark:text-amber-300 text-xs">
          {row.points?.toLocaleString()} pts
        </span>
      )
    },
    {
      header: 'District / Pincode',
      accessor: 'pincode',
      render: (row) => (
        <div className="text-xs">
          <span className="font-semibold text-slate-900 dark:text-white">{row.district}</span>
          <div className="font-mono text-slate-500 text-[11px]">PIN: {row.pincode}</div>
        </div>
      )
    },
    {
      header: 'Card Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />
    }
  ];

  const counts = cardsData.counts || {};

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">State Membership Cards Management</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          State-wide loyalty tier analytics, privilege card distribution (Silver, Gold, Diamond), and benefits.
        </p>
      </div>

      {/* Tier Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Silver Card Box */}
        <div className="admin-card p-5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-400"></span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Silver Tier</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              5% Off
            </span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{counts.silver || 0}</span>
            <span className="text-xs text-slate-500">Active Cards</span>
          </div>
        </div>

        {/* Gold Card Box */}
        <div className="admin-card p-5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400"></span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Gold Tier</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
              12% Off
            </span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{counts.gold || 0}</span>
            <span className="text-xs text-slate-500">Active Cards</span>
          </div>
        </div>

        {/* Diamond Card Box */}
        <div className="admin-card p-5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Diamond VIP Tier</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300">
              20% Off
            </span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{counts.diamond || 0}</span>
            <span className="text-xs text-slate-500">Active Cards</span>
          </div>
        </div>
      </div>

      {/* Cards Table */}
      <DataTable
        title="State Membership Cardholders"
        subtitle="Full registry of Silver, Gold, and Diamond privilege subscribers"
        columns={columns}
        data={cardsData.cards}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search cardholder or card number..."
        exportFileName="state_membership_cards.csv"
      />
    </div>
  );
}
