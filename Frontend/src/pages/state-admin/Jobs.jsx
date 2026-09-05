import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { Briefcase, MapPin, User, Clock } from 'lucide-react';

export function StateJobs() {
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
      header: 'Job Title & Priority',
      accessor: 'title',
      render: (row) => (
        <div>
          <div className="font-bold text-white text-sm">{row.title}</div>
          <div className="text-[11px] text-slate-400 font-mono">Job ID: {row.id}</div>
          <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${
            row.priority === 'Urgent' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-800 text-slate-300'
          }`}>
            {row.priority} Priority
          </span>
        </div>
      )
    },
    {
      header: 'Customer Details',
      accessor: 'customerName',
      render: (row) => (
        <div>
          <div className="font-semibold text-white text-xs">{row.customerName}</div>
          <div className="text-[11px] text-slate-400">{row.customerAddress}</div>
        </div>
      )
    },
    {
      header: 'Assigned Tech',
      accessor: 'technicianName',
      render: (row) => (
        <div className="text-xs text-indigo-300 flex items-center gap-1 font-medium">
          <User className="w-3.5 h-3.5 text-slate-400" />
          {row.technicianName}
        </div>
      )
    },
    {
      header: 'Location & ETA',
      accessor: 'pincode',
      render: (row) => (
        <div>
          <div className="text-xs font-mono text-emerald-400">PIN: {row.pincode}</div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
            <Clock className="w-3 h-3" /> ETA: {row.estimatedTime}
          </div>
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
        <h2 className="text-xl font-bold text-white">State Field Jobs</h2>
        <p className="text-xs text-slate-400">Track field service execution and technician workload across the state.</p>
      </div>

      <DataTable
        title="Field Operations Roster"
        subtitle="Live jobs dispatched across all divisions"
        columns={columns}
        data={jobs}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search jobs by title or technician..."
        exportFileName="state_jobs.csv"
      />
    </div>
  );
}
