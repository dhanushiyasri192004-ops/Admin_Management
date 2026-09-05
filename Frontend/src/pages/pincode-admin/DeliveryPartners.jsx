import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { Truck, Phone, Star } from 'lucide-react';

export function PincodeDeliveryPartners() {
  const { user } = useAuth();
  const pincode = user?.pincode || '636001';

  const [partners, setPartners] = useState([
    {
      id: `DEL-${pincode}-01`,
      name: 'Ravi Teja',
      phone: '+91 98405 11223',
      vehicle: 'Motorcycle (TN-30-AB-1234)',
      pincode: pincode,
      rating: 4.8,
      completedDeliveries: 342,
      status: 'On Duty'
    },
    {
      id: `DEL-${pincode}-02`,
      name: 'Manoj Kumar',
      phone: '+91 98405 44556',
      vehicle: 'Electric Scooter (TN-30-CD-5678)',
      pincode: pincode,
      rating: 4.6,
      completedDeliveries: 218,
      status: 'Available'
    }
  ]);

  const columns = [
    {
      header: 'Delivery Partner',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-600">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white text-xs">{row.name}</div>
            <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
              <Phone className="w-3 h-3" /> {row.phone}
            </div>
          </div>
        </div>
      )
    },
    {
      header: 'Vehicle Info',
      accessor: 'vehicle',
      render: (row) => <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{row.vehicle}</span>
    },
    {
      header: 'Station Pincode',
      accessor: 'pincode',
      render: (row) => (
        <span className="font-mono text-xs text-blue-600 dark:text-cyan-400 font-bold">
          PIN: {row.pincode}
        </span>
      )
    },
    {
      header: 'Rating & Trips',
      accessor: 'rating',
      render: (row) => (
        <div className="flex items-center gap-1.5 text-xs">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-bold text-slate-900 dark:text-white">{row.rating}</span>
          <span className="text-slate-500 text-[10px]">({row.completedDeliveries} drops)</span>
        </div>
      )
    },
    {
      header: 'Shift Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Pincode Delivery Fleet</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Last-mile delivery executives stationed exclusively for PIN {pincode} dispatches.
        </p>
      </div>

      <DataTable
        title="Delivery Partners"
        subtitle={`Active courier fleet deployed for Pincode ${pincode}`}
        columns={columns}
        data={partners}
        searchPlaceholder="Search courier name..."
        exportFileName="pincode_delivery_partners.csv"
      />
    </div>
  );
}
