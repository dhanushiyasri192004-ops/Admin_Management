import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { MapPin, ArrowRight } from 'lucide-react';

export function DivisionalPincodes() {
  const [pincodes, setPincodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getPincodes();
      if (res.success) setPincodes(res.pincodes);
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
      header: 'Pincode Zone',
      accessor: 'pincode',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-100 dark:border-emerald-700/50 text-emerald-600 dark:text-emerald-400">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="font-mono font-bold text-slate-900 dark:text-white text-sm">PIN: {row.pincode}</div>
            <div className="text-xs text-slate-500 dark:text-slate-300">{row.areaName}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Assigned Pincode Admin',
      accessor: 'assignedAdmin',
      render: (row) => <span className="font-semibold text-blue-600 dark:text-cyan-300 text-xs">{row.assignedAdmin}</span>
    },
    {
      header: 'Population & Customers',
      accessor: 'totalCustomers',
      render: (row) => (
        <div>
          <div className="font-bold text-slate-900 dark:text-white text-xs">{row.totalCustomers} Customers</div>
          <div className="text-[11px] text-slate-500">Pop: {row.population}</div>
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
    },
    {
      header: 'Hierarchy Action',
      accessor: 'actions',
      render: (row) => (
        <button
          onClick={() => navigate(`/divisional-admin/customers?pincode=${row.pincode}`)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-slate-700 transition shadow-sm"
        >
          <span>View Customers</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Division Pincodes Directory</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Registered pincode zones within this Division. Click "View Customers" to inspect end users.
          </p>
        </div>

        {/* Drill down Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 font-mono">
          <span className="text-slate-500 font-bold">Division</span>
          <span>&rarr;</span>
          <span className="text-blue-600 font-bold">Pincodes</span>
          <span>&rarr;</span>
          <span>Customers / Vendors</span>
        </div>
      </div>

      <DataTable
        title="Pincode Coverage Directory"
        subtitle="Hierarchy drilldown: Division → Pincode → Customers"
        columns={columns}
        data={pincodes}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search pincode or area..."
        exportFileName="divisional_pincodes.csv"
      />
    </div>
  );
}
