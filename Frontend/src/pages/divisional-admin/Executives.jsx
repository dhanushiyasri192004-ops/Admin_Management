import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { UserCheck } from 'lucide-react';

export function DivisionalExecutives() {
  const { user } = useAuth();
  const [execs, setExecs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getExecutives();
      if (res.success) setExecs(res.executives);
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
      header: 'Executive Details',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white text-xs">{row.name}</div>
            <div className="text-[11px] text-slate-500">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Department / Role',
      accessor: 'role',
      render: (row) => (
        <div>
          <div className="font-semibold text-slate-800 dark:text-slate-200 text-xs">{row.role}</div>
          <div className="text-[10px] text-slate-500">{row.department}</div>
        </div>
      )
    },
    {
      header: 'Pincode Zone',
      accessor: 'pincode',
      render: (row) => (
        <span className="font-mono text-xs text-blue-600 dark:text-cyan-400 font-semibold">
          PIN: {row.pincode}
        </span>
      )
    },
    {
      header: 'Phone',
      accessor: 'phone',
      render: (row) => <span className="text-xs text-slate-600 dark:text-slate-300 font-mono">{row.phone}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status || 'Active'} />
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Division Field Executives</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Operations managers and field coordinators assigned to {user?.division || 'Salem North'} Division.
        </p>
      </div>

      <DataTable
        title="Division Operations Staff"
        subtitle="Manage field officers within assigned division jurisdiction"
        columns={columns}
        data={execs}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search executive..."
        exportFileName="division_executives.csv"
      />
    </div>
  );
}
