import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { MapPin, Sliders, CheckCircle2, XCircle } from 'lucide-react';

export function PincodeManager() {
  const [pincodes, setPincodes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const toggleService = async (pinObj) => {
    const nextStatus = pinObj.status === 'Active' ? 'Disabled' : 'Active';
    try {
      await dataService.updatePincode(pinObj.pincode, { status: nextStatus });
      loadData();
    } catch (e) {
      alert(e.message || 'Failed to update pincode status');
    }
  };

  const columns = [
    {
      header: 'Pincode Zone',
      accessor: 'pincode',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-700/50 text-emerald-400">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="font-mono font-bold text-white text-sm">PIN: {row.pincode}</div>
            <div className="text-xs text-slate-300">{row.areaName}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Assigned Admin',
      accessor: 'assignedAdmin',
      render: (row) => <span className="font-semibold text-cyan-300 text-xs">{row.assignedAdmin}</span>
    },
    {
      header: 'Division & District',
      accessor: 'division',
      render: (row) => (
        <div className="text-xs text-slate-300">
          <div>{row.division}</div>
          <div className="text-slate-400">{row.district}, {row.state}</div>
        </div>
      )
    },
    {
      header: 'Active Customers',
      accessor: 'totalCustomers',
      render: (row) => <span className="font-bold text-white">{row.totalCustomers}</span>
    },
    {
      header: 'Service Status',
      accessor: 'status',
      render: (row) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
          row.status === 'Active'
            ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700/40'
            : 'bg-rose-950/60 text-rose-400 border-rose-700/40'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Manage State',
      accessor: 'actions',
      render: (row) => (
        <button
          onClick={() => toggleService(row)}
          className={`px-3 py-1 rounded-xl text-xs font-bold transition border ${
            row.status === 'Active'
              ? 'bg-rose-950/50 hover:bg-rose-900/80 text-rose-300 border-rose-700/40'
              : 'bg-emerald-950/50 hover:bg-emerald-900/80 text-emerald-300 border-emerald-700/40'
          }`}
        >
          {row.status === 'Active' ? 'Disable Service' : 'Enable Service'}
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Pincode Manager</h2>
        <p className="text-xs text-slate-400">Configure zone serviceability, operational status, and assignments.</p>
      </div>

      <DataTable
        title="Zone Operational Status"
        subtitle="Manage assigned pincode parameters"
        columns={columns}
        data={pincodes}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search pincode..."
        exportFileName="pincode_manager.csv"
      />
    </div>
  );
}
