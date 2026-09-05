import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { UserCheck, Phone } from 'lucide-react';

export function PincodeExecutives() {
  const [executives, setExecutives] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getExecutives();
      if (res.success) setExecutives(res.executives);
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
      header: 'Executive Name',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-700/40 text-cyan-400">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white text-sm">{row.name}</div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <Phone className="w-3 h-3 text-slate-500" />
              {row.phone}
            </div>
          </div>
        </div>
      )
    },
    {
      header: 'Designation Role',
      accessor: 'role',
      render: (row) => <span className="font-semibold text-slate-200 text-xs">{row.role}</span>
    },
    {
      header: 'Active Territory',
      accessor: 'activeTerritory',
      render: (row) => <span className="text-xs text-indigo-300">{row.activeTerritory}</span>
    },
    {
      header: 'Merchant Onboarded',
      accessor: 'merchantsOnboarded',
      render: (row) => <span className="font-bold text-white">{row.merchantsOnboarded} Merchants</span>
    },
    {
      header: 'Performance Score',
      accessor: 'performanceScore',
      render: (row) => <span className="font-bold text-emerald-400 font-mono">{row.performanceScore}</span>
    },
    {
      header: 'Duty Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Total Pincode Executives</h2>
        <p className="text-xs text-slate-400">Field relationship & operations executives assigned to this Pincode.</p>
      </div>

      <DataTable
        title="Field Executives Directory"
        subtitle="Manage ground operations personnel"
        columns={columns}
        data={executives}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search executive..."
        exportFileName="pincode_executives.csv"
      />
    </div>
  );
}
