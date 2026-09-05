import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { Wrench, Phone, Star } from 'lucide-react';

export function DistrictTechnicians() {
  const { user } = useAuth();
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
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
            <Wrench className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white text-xs">{row.name}</div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1">
              <Phone className="w-3 h-3" /> {row.phone}
            </div>
          </div>
        </div>
      )
    },
    {
      header: 'Skill Specialty',
      accessor: 'skills',
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.skills?.map((s, i) => (
            <span key={i} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
              {s}
            </span>
          ))}
        </div>
      )
    },
    {
      header: 'Pincode Station',
      accessor: 'pincode',
      render: (row) => (
        <span className="font-mono text-xs text-blue-600 dark:text-emerald-400 font-bold">
          PIN: {row.pincode}
        </span>
      )
    },
    {
      header: 'Rating & Jobs',
      accessor: 'rating',
      render: (row) => (
        <div className="flex items-center gap-1.5 text-xs">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-bold text-slate-900 dark:text-white">{row.rating}</span>
          <span className="text-slate-500 text-[10px]">({row.completedJobs} jobs)</span>
        </div>
      )
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
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">District Technicians Roster</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Field service specialists assigned within {user?.district || 'Salem'} District divisions.
        </p>
      </div>

      <DataTable
        title="Field Service Engineers"
        subtitle="Manage technician readiness and service performance"
        columns={columns}
        data={techs}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search technician name or skill..."
        exportFileName="district_technicians.csv"
      />
    </div>
  );
}
