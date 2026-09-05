import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { Store, MapPin, Star } from 'lucide-react';

export function DivisionalVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getVendors();
      if (res.success) setVendors(res.vendors);
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
      header: 'Vendor Name',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-700/40 text-amber-600 dark:text-amber-400">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white text-sm">{row.name}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Contact: {row.contactPerson} • {row.phone}</div>
            <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">{row.category}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Pincode Area',
      accessor: 'pincode',
      render: (row) => (
        <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
          📍 PIN: {row.pincode}
        </div>
      )
    },
    {
      header: 'Rating',
      accessor: 'rating',
      render: (row) => (
        <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-bold text-xs">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span>{row.rating} / 5.0</span>
        </div>
      )
    },
    {
      header: 'KYC Status',
      accessor: 'kycStatus',
      render: (row) => <StatusBadge status={row.kycStatus} />
    },
    {
      header: 'Pending Payout',
      accessor: 'pendingPayout',
      render: (row) => (
        <span className="font-bold text-slate-900 dark:text-slate-200">₹{row.pendingPayout?.toLocaleString()}</span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Division Vendors</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Merchant partners operating inside this Division.</p>
      </div>

      <DataTable
        title="Division Vendors Network"
        subtitle="Localized merchant suppliers"
        columns={columns}
        data={vendors}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search vendors..."
        exportFileName="divisional_vendors.csv"
      />
    </div>
  );
}
