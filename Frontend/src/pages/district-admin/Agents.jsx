import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { UserPlus, Phone } from 'lucide-react';

export function DistrictAgents() {
  const { user } = useAuth();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getAgents();
      if (res.success) setAgents(res.agents);
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
      header: 'Agent Details',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/50">
            <UserPlus className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white text-xs">{row.name}</div>
            <div className="text-[11px] text-slate-500">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Phone / Contact',
      accessor: 'phone',
      render: (row) => (
        <span className="text-xs text-slate-700 dark:text-slate-300 font-mono flex items-center gap-1">
          <Phone className="w-3 h-3 text-slate-400" /> {row.phone}
        </span>
      )
    },
    {
      header: 'Referrals & Active Cards',
      accessor: 'totalReferrals',
      render: (row) => (
        <div>
          <div className="font-bold text-slate-900 dark:text-white text-xs">{row.totalReferrals} Referrals</div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">{row.activeSubscribers} Subscribed</div>
        </div>
      )
    },
    {
      header: 'Wallet Balance',
      accessor: 'walletBalance',
      render: (row) => (
        <span className="font-mono font-bold text-slate-900 dark:text-amber-300 text-xs">
          ₹{row.walletBalance?.toLocaleString()}
        </span>
      )
    },
    {
      header: 'Total Earned',
      accessor: 'totalEarned',
      render: (row) => (
        <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">
          ₹{row.totalEarned?.toLocaleString()}
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
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">District Field Agents</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Field onboarding partners registered within {user?.district || 'Salem'} District divisions.
        </p>
      </div>

      <DataTable
        title="Agent Network Roster"
        subtitle="Manage customer acquisition agents and commission accounts"
        columns={columns}
        data={agents}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search agent by name..."
        exportFileName="district_agents.csv"
      />
    </div>
  );
}
