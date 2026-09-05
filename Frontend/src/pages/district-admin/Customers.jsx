import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { TierBadge, StatusBadge } from '../../components/Badge';
import { Users, Phone, MapPin } from 'lucide-react';

export function DistrictCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tierFilter, setTierFilter] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getCustomers({ tier: tierFilter });
      if (res.success) setCustomers(res.customers);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [tierFilter]);

  const columns = [
    {
      header: 'Customer Details',
      accessor: 'name',
      render: (row) => (
        <div>
          <div className="font-bold text-white text-sm">{row.name}</div>
          <div className="text-[11px] text-slate-400">{row.email}</div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
            <Phone className="w-3 h-3 text-slate-500" />
            {row.phone}
          </div>
        </div>
      )
    },
    {
      header: 'Membership Tier',
      accessor: (row) => row.membership?.tier,
      render: (row) => (
        <div>
          <TierBadge tier={row.membership?.tier} />
          <div className="text-[10px] text-slate-400 font-mono mt-1">
            {row.membership?.cardNumber}
          </div>
        </div>
      )
    },
    {
      header: 'Division & Pincode',
      accessor: 'pincode',
      render: (row) => (
        <div>
          <div className="font-semibold text-slate-200">{row.division}</div>
          <div className="text-xs font-mono text-emerald-400 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> PIN: {row.pincode}
          </div>
        </div>
      )
    },
    {
      header: 'Orders & Spend',
      accessor: 'totalSpent',
      render: (row) => (
        <div>
          <div className="font-bold text-white">₹{row.totalSpent?.toLocaleString()}</div>
          <div className="text-[11px] text-slate-400">{row.totalOrders} orders</div>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">District Customer Directory</h2>
        <p className="text-xs text-slate-400">Registered customers within this District scope.</p>
      </div>

      <DataTable
        title="District Customers"
        subtitle="Silver, Gold, and Diamond Cardholders"
        columns={columns}
        data={customers}
        loading={loading}
        onRefresh={loadData}
        filterOptions={[
          { label: 'All Tiers', value: '' },
          { label: 'Diamond Card', value: 'Diamond' },
          { label: 'Gold Card', value: 'Gold' },
          { label: 'Silver Card', value: 'Silver' },
        ]}
        activeFilter={tierFilter}
        onFilterChange={setTierFilter}
        exportFileName="district_customers.csv"
      />
    </div>
  );
}
