import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { TierBadge, StatusBadge } from '../../components/Badge';

export function DistrictMembershipCards() {
  const { user } = useAuth();
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
      header: 'Points',
      accessor: 'points',
      render: (row) => (
        <span className="font-mono font-bold text-slate-900 dark:text-amber-300 text-xs">
          {row.points?.toLocaleString()} pts
        </span>
      )
    },
    {
      header: 'Division & Pincode',
      accessor: 'pincode',
      render: (row) => (
        <div className="text-xs">
          <span className="font-semibold text-slate-900 dark:text-white">{row.division}</span>
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
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">District Membership Cards Directory</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Loyalty privilege card subscribers (Silver, Gold, Diamond) registered across {user?.district || 'Salem'} District.
        </p>
      </div>

      {/* Tier Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="admin-card p-5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Silver Tier</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">5% Off</span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{counts.silver || 2}</span>
            <span className="text-xs text-slate-500">In District</span>
          </div>
        </div>

        <div className="admin-card p-5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Gold Tier</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 dark:text-amber-300">12% Off</span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{counts.gold || 2}</span>
            <span className="text-xs text-slate-500">In District</span>
          </div>
        </div>

        <div className="admin-card p-5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Diamond VIP Tier</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 dark:text-cyan-300">20% Off</span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{counts.diamond || 1}</span>
            <span className="text-xs text-slate-500">In District</span>
          </div>
        </div>
      </div>

      <DataTable
        title="District Membership Cardholders"
        subtitle="Restricted to assigned district jurisdiction"
        columns={columns}
        data={cardsData.cards}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search cardholder or card number..."
        exportFileName="district_membership_cards.csv"
      />
    </div>
  );
}
