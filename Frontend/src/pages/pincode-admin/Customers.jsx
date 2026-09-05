import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { TierBadge, StatusBadge } from '../../components/Badge';
import { Users, Phone, MapPin } from 'lucide-react';

export function PincodeCustomers() {
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
      header: 'Address in Pincode',
      accessor: 'address',
      render: (row) => (
        <div>
          <div className="text-xs text-slate-300">{row.address}</div>
          <div className="font-mono text-[11px] text-emerald-400">PIN: {row.pincode}</div>
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
        <h2 className="text-xl font-bold text-white">Total Pincode Customers</h2>
        <p className="text-xs text-slate-400">Restricted to your assigned pincode jurisdiction.</p>
      </div>

      <DataTable
        title="Pincode Registered Customers"
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
        exportFileName="pincode_customers.csv"
      />
    </div>
  );
}
