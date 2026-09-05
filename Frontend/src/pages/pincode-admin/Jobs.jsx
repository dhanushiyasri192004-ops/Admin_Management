import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { User, Clock } from 'lucide-react';

export function PincodeJobs() {
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

  const updateStatus = async (jobId, nextStatus) => {
    try {
      await dataService.updateJobStatus(jobId, { status: nextStatus });
      loadData();
    } catch (e) {
      alert(e.message || 'Job update failed');
    }
  };

  const columns = [
    {
      header: 'Job Title',
      accessor: 'title',
      render: (row) => (
        <div>
          <div className="font-bold text-white text-sm">{row.title}</div>
          <div className="text-[11px] text-slate-400 font-mono">Job ID: {row.id}</div>
        </div>
      )
    },
    {
      header: 'Customer Details',
      accessor: 'customerName',
      render: (row) => (
        <div>
          <div className="text-white font-medium text-xs">{row.customerName}</div>
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
      header: 'ETA',
      accessor: 'estimatedTime',
      render: (row) => <span className="text-xs text-slate-300">{row.estimatedTime}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Manage Status',
      accessor: 'actions',
      render: (row) => (
        <select
          value={row.status}
          onChange={(e) => updateStatus(row.id, e.target.value)}
          className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-500"
        >
          <option value="Scheduled">Scheduled</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Total Pincode Jobs</h2>
        <p className="text-xs text-slate-400">Work orders dispatched to technicians within this Pincode.</p>
      </div>

      <DataTable
        title="Local Field Jobs"
        subtitle="Manage job status and allocations"
        columns={columns}
        data={jobs}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search jobs..."
        exportFileName="pincode_jobs.csv"
      />
    </div>
  );
}
