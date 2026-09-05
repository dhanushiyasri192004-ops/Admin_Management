import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { UserPlus, Phone, Mail, Wallet } from 'lucide-react';

export function PincodeAgents() {
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
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-950/60 border border-indigo-700/40 text-indigo-400">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white text-sm">{row.name}</div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <Phone className="w-3 h-3 text-slate-500" />
              {row.phone}
            </div>
            <div className="text-[11px] text-slate-400">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Referrals & Subscriptions',
      accessor: 'totalReferrals',
      render: (row) => (
        <div>
          <div className="font-bold text-white">{row.totalReferrals} Total Referrals</div>
          <div className="text-[11px] text-emerald-400 font-semibold">{row.activeSubscribers} Active Cards</div>
        </div>
      )
    },
    {
      header: 'Wallet Balance',
      accessor: 'walletBalance',
      render: (row) => (
        <span className="font-mono font-bold text-amber-300 text-sm">
          ₹{row.walletBalance?.toLocaleString()}
        </span>
      )
    },
    {
      header: 'Total Earned',
      accessor: 'totalEarned',
      render: (row) => (
        <span className="font-bold text-emerald-400">₹{row.totalEarned?.toLocaleString()}</span>
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
        <h2 className="text-xl font-bold text-white">Total Pincode Agents</h2>
        <p className="text-xs text-slate-400">Field sales and customer acquisition agents operating in this Pincode.</p>
      </div>

      <DataTable
        title="Agent Network Roster"
        subtitle="Manage acquisition agents and referral track records"
        columns={columns}
        data={agents}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search agent by name or phone..."
        exportFileName="pincode_agents.csv"
      />
    </div>
  );
}
