import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { Layers, ArrowRight } from 'lucide-react';

export function DistrictDivisions() {
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getDivisions();
      if (res.success) setDivisions(res.divisions);
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
      header: 'Division Name',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-cyan-950/80 border border-blue-100 dark:border-cyan-700/50 text-blue-600 dark:text-cyan-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white text-sm">{row.name}</div>
            <div className="text-[11px] text-slate-500 font-mono">Division ID: {row.id}</div>
          </div>
        </div>
      )
    },
    {
      header: 'District / State',
      accessor: 'districtName',
      render: (row) => (
        <div className="text-xs text-slate-700 dark:text-slate-300">
          <span className="font-semibold text-slate-900 dark:text-white">{row.districtName}</span>, {row.stateName}
        </div>
      )
    },
    {
      header: 'Covered Pincodes',
      accessor: 'pincodes',
      render: (row) => (
        <div className="flex flex-wrap gap-1.5">
          {row.pincodes?.map(pin => (
            <span key={pin} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs text-blue-600 dark:text-emerald-300 font-semibold">
              PIN: {pin}
            </span>
          ))}
        </div>
      )
    },
    {
      header: 'Hierarchy Action',
      accessor: 'actions',
      render: (row) => (
        <button
          onClick={() => navigate(`/district-admin/pincodes?division=${encodeURIComponent(row.name)}`)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-slate-700 transition shadow-sm"
        >
          <span>View Pincodes</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">District Divisions Directory</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Assigned divisions in this District. Click "View Pincodes" to drill down into micro zones.
          </p>
        </div>

        {/* Drill down Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 font-mono">
          <span className="text-slate-500 font-bold">District</span>
          <span>&rarr;</span>
          <span className="text-blue-600 font-bold">Divisions</span>
          <span>&rarr;</span>
          <span>Pincodes</span>
        </div>
      </div>

      <DataTable
        title="Assigned Divisions"
        subtitle="Hierarchy drilldown: District → Division → Pincode"
        columns={columns}
        data={divisions}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search divisions..."
        exportFileName="district_divisions.csv"
      />
    </div>
  );
}
