import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { User } from 'lucide-react';

export function DivisionalJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getJobs();
      if (res.success) setJobs(res.jobs);
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
      header: 'Job Title',
      accessor: 'title',
      render: (row) => (
        <div>
          <div className="font-bold text-white text-sm">{row.title}</div>
          <div className="text-[11px] text-slate-400 font-mono">ID: {row.id}</div>
        </div>
      )
    },
    {
      header: 'Customer',
      accessor: 'customerName',
      render: (row) => (
        <div>
          <div className="text-white font-medium">{row.customerName}</div>
          <div className="text-[11px] text-slate-400">{row.customerAddress}</div>
        </div>
      )
    },
    {
      header: 'Assigned Tech',
      accessor: 'technicianName',
      render: (row) => (
        <div className="text-xs text-indigo-300 flex items-center gap-1">
          <User className="w-3.5 h-3.5 text-slate-400" />
          {row.technicianName}
        </div>
      )
    },
    {
      header: 'Pincode Zone',
      accessor: 'pincode',
      render: (row) => (
        <div>
          <div className="text-xs font-mono text-emerald-400">PIN: {row.pincode}</div>
          <div className="text-[10px] text-slate-400">ETA: {row.estimatedTime}</div>
        </div>
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
        <h2 className="text-xl font-bold text-white">Division Field Jobs</h2>
        <p className="text-xs text-slate-400">Work orders allocated in this Division.</p>
      </div>

      <DataTable
        title="Division Job Board"
        subtitle="Technician dispatch across division pincodes"
        columns={columns}
        data={jobs}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search jobs..."
        exportFileName="divisional_jobs.csv"
      />
    </div>
  );
}
