import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { Truck, Phone, Star } from 'lucide-react';

export function DistrictDeliveryPartners() {
  const { user } = useAuth();
  const districtName = user?.district || 'Salem';

  const [partners, setPartners] = useState([
    {
      id: 'DEL-SLM-01',
      name: 'Ravi Teja',
      phone: '+91 98405 11223',
      vehicle: 'Motorcycle (TN-30-AB-1234)',
      division: 'Salem North',
      pincode: '636001',
      rating: 4.8,
      completedDeliveries: 342,
      status: 'On Duty'
    },
    {
      id: 'DEL-SLM-02',
      name: 'Manoj Kumar',
      phone: '+91 98405 44556',
      vehicle: 'Electric Scooter (TN-30-CD-5678)',
      division: 'Salem North',
      pincode: '636002',
      rating: 4.6,
      completedDeliveries: 218,
      status: 'Available'
    },
    {
      id: 'DEL-SLM-03',
      name: 'K. Senthil',
      phone: '+91 98405 77889',
      vehicle: 'Motorcycle (TN-30-EF-9012)',
      division: 'Salem South',
      pincode: '636003',
      rating: 4.9,
      completedDeliveries: 512,
      status: 'On Duty'
    },
    {
      id: 'DEL-SLM-04',
      name: 'A. Praveen',
      phone: '+91 98405 99001',
      vehicle: 'Three Wheeler (TN-30-GH-3456)',
      division: 'Salem South',
      pincode: '636004',
      rating: 4.7,
      completedDeliveries: 189,
      status: 'On Duty'
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
      header: 'Vehicle Registered',
      accessor: 'vehicle',
      render: (row) => <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{row.vehicle}</span>
    },
    {
      header: 'Division & Pincode',
      accessor: 'division',
      render: (row) => (
        <div className="text-xs">
          <span className="font-semibold text-slate-900 dark:text-white">{row.division}</span>
          <div className="font-mono text-slate-500 text-[11px]">PIN: {row.pincode}</div>
        </div>
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
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">District Delivery Fleet</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Last-mile delivery executives deployed across all divisions in {districtName} District.
        </p>
      </div>

      <DataTable
        title="District Delivery Partners"
        subtitle={`Fleet operations across divisions in ${districtName}`}
        columns={columns}
        data={partners}
        searchPlaceholder="Search partner or vehicle..."
        exportFileName="district_delivery_partners.csv"
      />
    </div>
  );
}
