import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { useTheme } from '../../context/ThemeContext';
import { Building2, ArrowRight } from 'lucide-react';

export function StateDistricts() {
  const { isDark } = useTheme();
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getDistricts();
      if (res.success) setDistricts(res.districts);
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
      header: 'District Name',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-lg border ${
            isDark ? 'bg-indigo-950/80 border-indigo-700/50 text-indigo-400' : 'bg-blue-50 border-blue-100 text-blue-600'
          }`}>
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{row.name}</div>
            <div className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Code: {row.code || row.id}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Total Divisions',
      accessor: (row) => row.divisions?.length || 0,
      render: (row) => (
        <span className={`font-semibold text-xs ${isDark ? 'text-cyan-300' : 'text-blue-600'}`}>
          {row.divisions?.length || 0} Divisions
        </span>
      )
    },
    {
      header: 'Divisions & Pincode Coverage',
      accessor: 'divisions',
      render: (row) => (
        <div className="flex flex-wrap gap-1.5">
          {row.divisions?.map(d => (
            <span key={d.id} className={`px-2 py-0.5 rounded border text-xs font-medium ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}>
              {d.name} ({d.pincodes?.length} PINs)
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
          type="button"
          onClick={() => navigate(`/state-admin/divisions?district=${encodeURIComponent(row.name)}`)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition shadow-xs cursor-pointer ${
            isDark
              ? 'bg-slate-800 border-slate-700 text-blue-400 hover:bg-slate-700'
              : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
          }`}
        >
          <span>View Divisions</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            State Districts Management
          </h2>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Overview of all authorized districts under this State. Click "View Divisions" to drill down.
          </p>
        </div>

        {/* Drill down Breadcrumb hint */}
        <div className={`flex items-center gap-2 text-xs border rounded-xl px-3 py-1.5 font-mono ${
          isDark
            ? 'bg-slate-800/80 border-slate-700 text-slate-400'
            : 'bg-slate-100 border-slate-200 text-slate-600'
        }`}>
          <span className="text-blue-600 font-bold">State</span>
          <span>&rarr;</span>
          <span>District</span>
          <span>&rarr;</span>
          <span>Division</span>
          <span>&rarr;</span>
          <span>Pincode</span>
        </div>
      </div>

      <DataTable
        title="Districts Directory"
        subtitle="Hierarchical administration under assigned state"
        columns={columns}
        data={districts}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search district name or code..."
        exportFileName="state_districts.csv"
      />
    </div>
  );
}
