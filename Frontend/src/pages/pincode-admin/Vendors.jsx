import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { Store, Star, Phone } from 'lucide-react';

export function PincodeVendors() {
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
      header: 'Vendor Details',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-700/40 text-amber-400">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white text-sm">{row.name}</div>
            <div className="text-[11px] text-slate-400">Person: {row.contactPerson}</div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
              <Phone className="w-3 h-3 text-slate-500" />
              {row.phone}
            </div>
          </div>
        </div>
      )
    },
    {
      header: 'Category & Address',
      accessor: 'category',
      render: (row) => (
        <div>
          <span className="text-xs font-semibold text-indigo-300">{row.category}</span>
          <div className="text-[11px] text-slate-400 mt-0.5">{row.address}</div>
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
      render: (row) => <span className="font-bold text-slate-200">₹{row.pendingPayout?.toLocaleString()}</span>
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Pincode Vendors</h2>
        <p className="text-xs text-slate-400">All local verified merchant shops in your assigned Pincode.</p>
      </div>

      <DataTable
        title="Local Merchants Roster"
        subtitle="Restricted to assigned pincode"
        columns={columns}
        data={vendors}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search vendors..."
        exportFileName="pincode_vendors.csv"
      />
    </div>
  );
}
