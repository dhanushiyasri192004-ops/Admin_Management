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

  const handleToggleStatus = async (row) => {
    const currentStatus = row.status || 'Active';
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';

    // Optimistically update status in local state
    setDistricts(prev =>
      prev.map(d => (d.id === row.id || d.name === row.name ? { ...d, status: newStatus } : d))
    );

    try {
      await dataService.updateDistrictStatus(row.id || row.name, newStatus);
    } catch (err) {
      console.error('Failed to update district status', err);
      // Revert upon error
      setDistricts(prev =>
        prev.map(d => (d.id === row.id || d.name === row.name ? { ...d, status: currentStatus } : d))
      );
    }
  };

  const columns = [
    {
      header: 'District Name / ID',
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
            <div className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>ID: {row.id || row.code}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Admins Name',
      accessor: (row) => row.adminName || 'Unassigned',
      render: (row) => {
        const adminName = row.adminName || (row.name === 'Salem' ? 'Ananya Iyer' : row.name === 'Coimbatore' ? 'Sundar Raman' : 'Unassigned');
        const adminEmail = row.adminEmail || `${(row.name || '').toLowerCase()}_admin@admin.com`;
        return (
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
              isDark ? 'bg-indigo-950/80 text-cyan-300 border border-indigo-800/60' : 'bg-blue-100 text-blue-700 border border-blue-200'
            }`}>
              {adminName[0]}
            </div>
            <div>
              <div className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {adminName}
              </div>
              <div className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {adminEmail}
              </div>
            </div>
          </div>
        );
      }
    },
    {
      header: 'Division / Pincodes',
      accessor: (row) => {
        const divCount = row.divisions?.length || 0;
        const pinCount = row.divisions?.reduce((sum, d) => sum + (d.pincodes?.length || 0), 0) || 0;
        return `${divCount} / ${pinCount}`;
      },
      render: (row) => {
        const divCount = row.divisions?.length || 0;
        const pinCount = row.divisions?.reduce((sum, d) => sum + (d.pincodes?.length || 0), 0) || 0;
        const tooltipDetails = row.divisions?.map(d => `${d.name}: ${d.pincodes?.join(', ')}`).join('\n');

        return (
          <div className="flex items-center gap-2 text-xs py-1" title={tooltipDetails}>
            <span className={`inline-flex items-center justify-center min-w-[28px] px-2.5 py-1 rounded-lg border font-bold text-xs ${
              isDark
                ? 'bg-blue-950/60 border-blue-800/60 text-cyan-300'
                : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}>
              {divCount}
            </span>
            <span className="text-slate-400 dark:text-slate-500 font-bold">/</span>
            <span className={`inline-flex items-center justify-center min-w-[28px] px-2.5 py-1 rounded-lg border font-bold text-xs ${
              isDark
                ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-300'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}>
              {pinCount}
            </span>
          </div>
        );
      }
    },
    {
      header: 'Status / Action',
      accessor: 'status',
      render: (row) => {
        const isActive = (row.status || 'Active') === 'Active';
        return (
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
              isActive
                ? isDark
                  ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/30'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : isDark
                  ? 'bg-rose-950/70 text-rose-300 border-rose-500/30'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
              {isActive ? 'Active' : 'Inactive'}
            </span>
            <button
              type="button"
              onClick={() => handleToggleStatus(row)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                isActive
                  ? isDark
                    ? 'bg-slate-800/90 border-slate-700 text-slate-300 hover:text-rose-300 hover:border-rose-900/50 hover:bg-rose-950/40'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50'
                  : isDark
                    ? 'bg-slate-800/90 border-slate-700 text-slate-300 hover:text-emerald-300 hover:border-emerald-900/50 hover:bg-emerald-950/40'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              {isActive ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        );
      }
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
        searchPlaceholder="Search district name or ID..."
        exportFileName="state_districts.csv"
      />
    </div>
  );
}
