import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { MapPin, ArrowLeft } from 'lucide-react';

export function DistrictPincodes() {
  const { user } = useAuth();
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
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-100 dark:border-indigo-700/50 text-indigo-600 dark:text-indigo-400">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="font-mono font-bold text-slate-900 dark:text-white text-sm">PIN: {row.pincode}</div>
            <div className="text-xs text-slate-500 dark:text-slate-300 font-medium">{row.areaName}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Division',
      accessor: 'divisionName',
      render: (row) => (
        <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
          {row.divisionName} Division
        </span>
      )
    },
    {
      header: 'Assigned Pincode Admin',
      accessor: 'assignedAdmin',
      render: (row) => (
        <span className="font-semibold text-blue-600 dark:text-cyan-300 text-xs">{row.assignedAdmin}</span>
      )
    },
    {
      header: 'Customers & Population',
      accessor: 'totalCustomers',
      render: (row) => (
        <div>
          <div className="font-bold text-slate-900 dark:text-white text-xs">{row.totalCustomers} Customers</div>
          <div className="text-[10px] text-slate-500">Pop: {row.population}</div>
        </div>
      )
    },
    {
      header: 'Service Status',
      accessor: 'status',
      render: (row) => (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700/40">
          {row.status}
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
                onClick={() => setSearchParams({})}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition"
                title="Show all district pincodes"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">District Pincodes Directory</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {divisionFilter ? (
              <span>Filtered by Division: <strong className="text-blue-600">{divisionFilter}</strong> in {user?.district || 'Salem'} District.</span>
            ) : (
              <span>All registered pincodes within {user?.district || 'Salem'} District.</span>
            )}
          </p>
        </div>

        {/* Drill down Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 font-mono">
          <span className="text-slate-500">{user?.district || 'District'}</span>
          <span>&rarr;</span>
          <span className="text-slate-500 font-bold">{divisionFilter || 'Divisions'}</span>
          <span>&rarr;</span>
          <span className="text-blue-600 font-bold">Pincodes</span>
        </div>
      </div>

      <DataTable
        title={divisionFilter ? `Pincodes in ${divisionFilter}` : `${user?.district || 'District'} Pincodes List`}
        subtitle="Manage localized pincode zones within district jurisdiction"
        columns={columns}
        data={pincodes}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search pincode or area name..."
        exportFileName="district_pincodes.csv"
      />
    </div>
  );
}
