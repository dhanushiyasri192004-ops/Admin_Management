import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { useTheme } from '../../context/ThemeContext';
import { MapPin, ArrowLeft } from 'lucide-react';

export function StatePincodes() {
  const { isDark } = useTheme();
  const [pincodes, setPincodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const divisionFilter = searchParams.get('division');

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getPincodes();
      if (res.success) {
        let list = res.pincodes || [];
        if (divisionFilter) {
          list = list.filter(p => p.divisionName?.toLowerCase() === divisionFilter.toLowerCase());
        }
        setPincodes(list);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [divisionFilter]);

  const columns = [
    {
      header: 'Pincode Zone',
      accessor: 'pincode',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-lg border ${
            isDark ? 'bg-indigo-950/80 border-indigo-700/50 text-indigo-400' : 'bg-blue-50 border-blue-100 text-blue-600'
          }`}>
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className={`font-mono font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>PIN: {row.pincode}</div>
            <div className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{row.areaName}</div>
          </div>
        </div>
      )
    },
    {
      header: 'District & Division',
      accessor: 'districtName',
      render: (row) => (
        <div className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{row.districtName}</span>
          <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{row.divisionName} Division</div>
        </div>
      )
    },
    {
      header: 'Assigned Pincode Admin',
      accessor: 'adminName',
      render: (row) => (
        <div className="text-xs">
          <div className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{row.adminName || 'Unassigned'}</div>
          <div className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{row.adminEmail || 'admin@domain.com'}</div>
        </div>
      )
    },
    {
      header: 'Active Hub Status',
      accessor: 'status',
      render: (row) => (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
          row.status === 'Active'
            ? isDark
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : isDark
            ? 'bg-amber-950/80 text-amber-300 border-amber-700/60'
            : 'bg-amber-50 text-amber-700 border-amber-200'
        }`}>
          ● {row.status || 'Active'}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            {divisionFilter && (
              <button
                type="button"
                onClick={() => setSearchParams({})}
                className={`p-1 rounded-lg border transition ${
                  isDark
                    ? 'hover:bg-slate-800 text-slate-400 hover:text-white border-slate-700'
                    : 'hover:bg-slate-200 text-slate-600 hover:text-slate-900 border-slate-200'
                }`}
                title="Show all pincodes"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              State Pincodes Directory
            </h2>
          </div>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {divisionFilter ? (
              <span>Filtered by Division: <strong className="text-blue-600 font-bold">{divisionFilter}</strong>. Final tier in hierarchy drill-down.</span>
            ) : (
              <span>All registered pincode service zones and appointed local administrators across the State.</span>
            )}
          </p>
        </div>

        {/* Drill down Breadcrumb */}
        <div className={`flex items-center gap-2 text-xs border rounded-xl px-3 py-1.5 font-mono ${
          isDark
            ? 'bg-slate-800/80 border-slate-700 text-slate-400'
            : 'bg-slate-100 border-slate-200 text-slate-600'
        }`}>
          <span>State</span>
          <span>&rarr;</span>
          <span>District</span>
          <span>&rarr;</span>
          <span className="font-bold">{divisionFilter || 'Divisions'}</span>
          <span>&rarr;</span>
          <span className="text-blue-600 font-bold">Pincodes</span>
        </div>
      </div>

      <DataTable
        title={divisionFilter ? `Pincodes in ${divisionFilter} Division` : "State Pincodes Registry"}
        subtitle="Manage pincode coverage and serviceability parameters"
        columns={columns}
        data={pincodes}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search pincode or area name..."
        exportFileName="state_pincodes.csv"
      />
    </div>
  );
}
