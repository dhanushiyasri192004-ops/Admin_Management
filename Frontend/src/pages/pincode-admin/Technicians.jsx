import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { Wrench, Phone, Star } from 'lucide-react';

export function PincodeTechnicians() {
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getTechnicians();
      if (res.success) setTechs(res.technicians);
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
      header: 'Technician Name',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-950/60 border border-indigo-700/40 text-indigo-400">
            <Wrench className="w-5 h-5" />
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
      header: 'Specialization',
      accessor: 'specialization',
      render: (row) => <span className="font-semibold text-indigo-300 text-xs">{row.specialization}</span>
    },
    {
      header: 'Rating & Performance',
      accessor: 'rating',
      render: (row) => (
        <div>
          <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{row.rating} / 5.0</span>
          </div>
          <div className="text-[11px] text-slate-400">{row.jobsCompleted} completed jobs</div>
        </div>
      )
    },
    {
      header: 'Active Jobs',
      accessor: 'activeJobs',
      render: (row) => <span className="font-mono font-bold text-white text-xs">{row.activeJobs} Active</span>
    },
    {
      header: 'Availability',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Total Pincode Technicians</h2>
        <p className="text-xs text-slate-400">Field workforce allocated to your assigned Pincode.</p>
      </div>

      <DataTable
        title="Pincode Technicians Directory"
        subtitle="Manage service personnel"
        columns={columns}
        data={techs}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search technician..."
        exportFileName="pincode_technicians.csv"
      />
    </div>
  );
}
