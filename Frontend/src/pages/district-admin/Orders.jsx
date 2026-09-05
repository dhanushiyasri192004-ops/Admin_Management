import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge, TierBadge } from '../../components/Badge';
import { ShoppingBag, MapPin } from 'lucide-react';

export function DistrictOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getOrders();
      if (res.success) setOrders(res.orders);
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
      header: 'Order Details',
      accessor: 'orderNumber',
      render: (row) => (
        <div>
          <div className="font-bold text-white text-sm">{row.orderNumber}</div>
          <div className="text-[11px] text-slate-400">{row.orderDate}</div>
          <div className="text-[11px] text-indigo-400 font-mono mt-0.5">
            {row.items?.map(i => `${i.name} (x${i.qty})`).join(', ')}
          </div>
        </div>
      )
    },
    {
      header: 'Customer & Tier',
      accessor: 'customerName',
      render: (row) => (
        <div>
          <div className="font-bold text-white text-xs">{row.customerName}</div>
          <TierBadge tier={row.membershipTier} className="mt-1" />
        </div>
      )
    },
    {
      header: 'Division & Pincode',
      accessor: 'pincode',
      render: (row) => (
        <div>
          <div className="text-xs text-slate-300">{row.division}</div>
          <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3" /> PIN: {row.pincode}
          </div>
        </div>
      )
    },
    {
      header: 'Amount & Net',
      accessor: 'netPayable',
      render: (row) => (
        <div>
          <div className="font-bold text-emerald-400 text-sm">₹{row.netPayable?.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500">{row.paymentMode}</div>
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
        <h2 className="text-xl font-bold text-white">District Orders</h2>
        <p className="text-xs text-slate-400">Customer orders originating in this District.</p>
      </div>

      <DataTable
        title="District Orders Ledger"
        subtitle="Localized district order dispatches"
        columns={columns}
        data={orders}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search order..."
        exportFileName="district_orders.csv"
      />
    </div>
  );
}
