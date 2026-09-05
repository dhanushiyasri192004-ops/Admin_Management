import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { Wrench } from 'lucide-react';

export function PincodeBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getBookings();
      if (res.success) setBookings(res.bookings);
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
      header: 'Booking Number',
      accessor: 'bookingNumber',
      render: (row) => (
        <div>
          <div className="font-bold text-white text-sm">{row.bookingNumber}</div>
          <div className="text-[11px] text-slate-400">{row.scheduledDate}</div>
        </div>
      )
    },
    {
      header: 'Service Requested',
      accessor: 'service',
      render: (row) => <span className="font-semibold text-indigo-300 text-xs">{row.service}</span>
    },
    {
      header: 'Customer',
      accessor: 'customerName',
      render: (row) => <span className="text-white font-medium">{row.customerName}</span>
    },
    {
      header: 'Charge',
      accessor: 'charge',
      render: (row) => <span className="font-bold text-emerald-400">₹{row.charge}</span>
    },
    {
      header: 'Assigned Tech',
      accessor: 'technicianAssigned',
      render: (row) => (
        <div className="text-xs text-slate-300 flex items-center gap-1">
          <Wrench className="w-3 h-3 text-slate-400" />
          {row.technicianAssigned || 'Pending'}
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
        <h2 className="text-xl font-bold text-white">Total Pincode Bookings</h2>
        <p className="text-xs text-slate-400">Service appointments scheduled in this Pincode.</p>
      </div>

      <DataTable
        title="Local Service Bookings"
        subtitle="Restricted to assigned pincode"
        columns={columns}
        data={bookings}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search bookings..."
        exportFileName="pincode_bookings.csv"
      />
    </div>
  );
}
