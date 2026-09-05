import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { TierBadge, StatusBadge } from '../../components/Badge';

export function DivisionalMembershipCards() {
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
      header: 'Tier',
      accessor: 'tier',
      render: (row) => <TierBadge tier={row.tier} />
    },
    {
      header: 'Discount',
      accessor: 'discountPercent',
      render: (row) => (
        <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">
          {row.discountPercent}% Off
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
      header: 'Pincode Zone',
      accessor: 'pincode',
      render: (row) => (
        <span className="font-mono font-semibold text-blue-600 dark:text-emerald-400 text-xs">
          PIN: {row.pincode}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Division Membership Cards</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Privilege subscribers (Silver, Gold, Diamond) within {user?.division || 'Salem North'} Division pincodes.
        </p>
      </div>

      <DataTable
        title="Division Membership Cardholders"
        subtitle="Restricted strictly to assigned division boundaries"
        columns={columns}
        data={cardsData.cards}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search cardholder or number..."
        exportFileName="division_membership_cards.csv"
      />
    </div>
  );
}
