import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge, TierBadge } from '../../components/Badge';

export function DivisionalOrders() {
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
      header: 'Customer',
      accessor: 'customerName',
      render: (row) => (
        <div>
          <div className="font-bold text-white text-xs">{row.customerName}</div>
          <TierBadge tier={row.membershipTier} className="mt-1" />
        </div>
      )
    },
    {
      header: 'Pincode Zone',
      accessor: 'pincode',
      render: (row) => (
        <span className="font-mono text-emerald-400 text-xs font-bold">📍 PIN: {row.pincode}</span>
      )
    },
    {
      header: 'Net Payable',
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
        <h2 className="text-xl font-bold text-white">Division Orders</h2>
        <p className="text-xs text-slate-400">Customer orders dispatched within this Division.</p>
      </div>

      <DataTable
        title="Division Orders Ledger"
        subtitle="Localized division customer purchases"
        columns={columns}
        data={orders}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search order ID or customer..."
        exportFileName="divisional_orders.csv"
      />
    </div>
  );
}
