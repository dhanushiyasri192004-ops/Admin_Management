import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge, TierBadge } from '../../components/Badge';

export function PincodeOrders() {
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

  const updateStatus = async (orderId, newStatus) => {
    try {
      await dataService.updateOrderStatus(orderId, newStatus);
      loadData();
    } catch (e) {
      alert(e.message || 'Status update failed');
    }
  };

  const columns = [
    {
      header: 'Order Number',
      accessor: 'orderNumber',
      render: (row) => (
        <div>
          <div className="font-mono font-bold text-white text-sm">{row.orderNumber}</div>
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
    },
    {
      header: 'Manage Status',
      accessor: 'actions',
      render: (row) => (
        <select
          value={row.status}
          onChange={(e) => updateStatus(row.id, e.target.value)}
          className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-500"
        >
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Total Pincode Orders</h2>
        <p className="text-xs text-slate-400">Order processing and dispatch within your assigned Pincode.</p>
      </div>

      <DataTable
        title="Local Pincode Orders"
        subtitle="Manage dispatch status and order lifecycle"
        columns={columns}
        data={orders}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search order..."
        exportFileName="pincode_orders.csv"
      />
    </div>
  );
}
