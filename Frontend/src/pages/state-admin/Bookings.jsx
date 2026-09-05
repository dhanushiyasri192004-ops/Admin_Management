import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { CalendarCheck, MapPin, Wrench } from 'lucide-react';

export function StateBookings() {
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
      header: 'Booking Ref',
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
      render: (row) => (
        <div className="font-semibold text-indigo-300 text-xs">{row.service}</div>
      )
    },
    {
      header: 'Customer',
      accessor: 'customerName',
      render: (row) => <span className="font-medium text-slate-200">{row.customerName}</span>
    },
    {
      header: 'Location',
      accessor: 'pincode',
      render: (row) => (
        <div className="text-xs font-mono text-emerald-400">
          📍 PIN: {row.pincode} ({row.district})
        </div>
      )
    },
    {
      header: 'Technician Assigned',
      accessor: 'technicianAssigned',
      render: (row) => (
        <div className="text-xs text-slate-300 flex items-center gap-1">
          <Wrench className="w-3 h-3 text-slate-400" />
          {row.technicianAssigned || 'Unassigned'}
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
        <h2 className="text-xl font-bold text-white">State Service Bookings</h2>
        <p className="text-xs text-slate-400">Scheduled on-site repairs and maintenance across all state districts.</p>
      </div>

      <DataTable
        title="Service Appointments"
        subtitle="Tracking technician dispatch and execution"
        columns={columns}
        data={bookings}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search booking ID or customer..."
        exportFileName="state_bookings.csv"
      />
    </div>
  );
}
