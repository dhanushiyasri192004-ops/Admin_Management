import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { Store, MapPin, Building, Star } from 'lucide-react';

export function StateVendors() {
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
      header: 'Vendor Business',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-700/40 text-amber-400">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white text-sm">{row.name}</div>
            <div className="text-[11px] text-slate-400">Contact: {row.contactPerson} • {row.phone}</div>
            <div className="text-[10px] text-indigo-400 font-medium mt-0.5">{row.category}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Location',
      accessor: 'pincode',
      render: (row) => (
        <div>
          <div className="text-xs font-semibold text-slate-200">{row.district}, {row.division}</div>
          <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3" /> PIN: {row.pincode}
          </div>
        </div>
      )
    },
    {
      header: 'Rating & Deliveries',
      accessor: 'rating',
      render: (row) => (
        <div>
          <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{row.rating} / 5.0</span>
          </div>
          <div className="text-[11px] text-slate-400">{row.totalOrdersDelivered} orders fulfilled</div>
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
        <span className="font-bold text-slate-200">₹{row.pendingPayout?.toLocaleString()}</span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">State Vendors Network</h2>
        <p className="text-xs text-slate-400">Overview of certified merchant partners under state jurisdiction.</p>
      </div>

      <DataTable
        title="Authorized Vendor Merchants"
        subtitle="Manage and view vendor operations"
        columns={columns}
        data={vendors}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search vendors by name or category..."
        exportFileName="state_vendors.csv"
      />
    </div>
  );
}
