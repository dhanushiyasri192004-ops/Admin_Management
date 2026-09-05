import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { Briefcase, User, Clock } from 'lucide-react';

export function DistrictJobs() {
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
      header: 'Pincode & ETA',
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
        <h2 className="text-xl font-bold text-white">District Field Operations</h2>
        <p className="text-xs text-slate-400">Jobs assigned across all divisions in this District.</p>
      </div>

      <DataTable
        title="District Job Board"
        subtitle="Work orders and technician tasks"
        columns={columns}
        data={jobs}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search jobs..."
        exportFileName="district_jobs.csv"
      />
    </div>
  );
}
