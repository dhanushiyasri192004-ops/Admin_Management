import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { useTheme } from '../../context/ThemeContext';
import { Layers, ArrowRight, ArrowLeft } from 'lucide-react';

export function StateDivisions() {
  const { isDark } = useTheme();
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const districtFilter = searchParams.get('district');

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getDivisions();
      if (res.success) {
        let list = res.divisions || [];
        if (districtFilter) {
          list = list.filter(d => d.districtName?.toLowerCase() === districtFilter.toLowerCase());
        }
        setDivisions(list);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [districtFilter]);

  const columns = [
    {
      header: 'Division Name',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-lg border ${
            isDark ? 'bg-cyan-950/80 border-cyan-700/50 text-cyan-400' : 'bg-blue-50 border-blue-100 text-blue-600'
          }`}>
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{row.name}</div>
            <div className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Division ID: {row.id}</div>
          </div>
        </div>
      )
    },
    {
      header: 'District / State',
      accessor: 'districtName',
      render: (row) => (
        <div className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{row.districtName}</span>, {row.stateName}
        </div>
      )
    },
    {
      header: 'Assigned Pincodes',
      accessor: 'pincodes',
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.pincodes?.map(pin => (
            <span key={pin} className={`font-mono text-[11px] px-2 py-0.5 rounded border font-semibold ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-emerald-300'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}>
              {pin}
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
          onClick={() => navigate(`/state-admin/pincodes?division=${encodeURIComponent(row.name)}`)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition shadow-xs cursor-pointer ${
            isDark
              ? 'bg-slate-800 border-slate-700 text-blue-400 hover:bg-slate-700'
              : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
          }`}
        >
          <span>View Pincodes</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            {districtFilter && (
              <button
                type="button"
                onClick={() => setSearchParams({})}
                className={`p-1 rounded-lg border transition ${
                  isDark
                    ? 'hover:bg-slate-800 text-slate-400 hover:text-white border-slate-700'
                    : 'hover:bg-slate-200 text-slate-600 hover:text-slate-900 border-slate-200'
                }`}
                title="Show all divisions"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              State Divisions Management
            </h2>
          </div>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {districtFilter ? (
              <span>Filtered by District: <strong className="text-blue-600 font-bold">{districtFilter}</strong>. Click "View Pincodes" to drill down further.</span>
            ) : (
              <span>Overview of all administrative divisions operating across this State.</span>
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
          <span className="font-bold">{districtFilter || 'Districts'}</span>
          <span>&rarr;</span>
          <span className="text-blue-600 font-bold">Divisions</span>
          <span>&rarr;</span>
          <span>Pincodes</span>
        </div>
      </div>

      <DataTable
        title={districtFilter ? `Divisions in ${districtFilter}` : "Divisions Directory"}
        subtitle="Hierarchical administration divisions under state jurisdiction"
        columns={columns}
        data={divisions}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search division name or district..."
        exportFileName="state_divisions.csv"
      />
    </div>
  );
}
