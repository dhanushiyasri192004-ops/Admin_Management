import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { DeliveryPartnerDetailsModal } from '../../components/DeliveryPartnerDetailsModal';
import {
  Truck,
  Phone,
  Star,
  MapPin,
  Clock,
  CheckCircle2,
  Package,
  Bike
} from 'lucide-react';

export function StateDeliveryPartners() {
  const { user } = useAuth();
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [partners, setPartners] = useState([
    {
      id: 'DEL-TN-001',
      name: 'Ravi Teja',
      phone: '+91 98405 11223',
      vehicleType: 'Motorcycle',
      registrationNumber: 'TN-30-AB-1234',
      district: 'Salem',
      division: 'Salem North',
      pincode: '636001',
      rating: 4.8,
      totalTrips: 1240,
      shift: 'On Duty',
      status: 'Active',
      deliveryStatus: 'In Transit (ORD-2026-881)',
      verificationStatus: 'Verified',
      activeDeliveries: 2,
      recentDeliveries: [
        { orderId: 'ORD-2026-881', customer: 'Deepak Raj', destination: 'Fairlands, Salem (636001)', time: '10:45 AM Today', status: 'In Transit' },
        { orderId: 'ORD-2026-854', customer: 'Swathi Radhakrishnan', destination: 'Meyyanur Main Road, Salem', time: 'Yesterday, 04:20 PM', status: 'Delivered' },
        { orderId: 'ORD-2026-819', customer: 'Vignesh Kumar', destination: 'Hasthampatti Junction, Salem', time: '05 Mar 2026, 01:15 PM', status: 'Delivered' }
      ]
    },
    {
      id: 'DEL-TN-002',
      name: 'Manoj Kumar',
      phone: '+91 98405 44556',
      vehicleType: 'Electric Scooter',
      registrationNumber: 'TN-30-CD-5678',
      district: 'Salem',
      division: 'Salem North',
      pincode: '636002',
      rating: 4.6,
      totalTrips: 890,
      shift: 'Available',
      status: 'Active',
      deliveryStatus: 'Idle - Ready for Dispatch',
      verificationStatus: 'Verified',
      activeDeliveries: 0,
      recentDeliveries: [
        { orderId: 'ORD-2026-872', customer: 'Kavitha R', destination: 'Suramangalam, Salem', time: '08:30 AM Today', status: 'Delivered' },
        { orderId: 'ORD-2026-831', customer: 'Ramesh Sundaram', destination: 'Alagapuram, Salem', time: 'Yesterday, 06:10 PM', status: 'Delivered' }
      ]
    },
    {
      id: 'DEL-TN-003',
      name: 'K. Senthil',
      phone: '+91 98405 77889',
      vehicleType: 'Motorcycle',
      registrationNumber: 'TN-38-EF-9012',
      district: 'Coimbatore',
      division: 'Coimbatore Central',
      pincode: '641001',
      rating: 4.9,
      totalTrips: 1560,
      shift: 'On Duty',
      status: 'Active',
      deliveryStatus: 'Out for Delivery (ORD-2026-904)',
      verificationStatus: 'Verified',
      activeDeliveries: 1,
      recentDeliveries: [
        { orderId: 'ORD-2026-904', customer: 'Divya Prakash', destination: 'Gandhipuram, Coimbatore', time: '11:15 AM Today', status: 'In Transit' },
        { orderId: 'ORD-2026-865', customer: 'Siddharth Joshi', destination: 'RS Puram, Coimbatore', time: 'Yesterday, 02:40 PM', status: 'Delivered' }
      ]
    },
    {
      id: 'DEL-TN-004',
      name: 'A. Praveen',
      phone: '+91 98405 99001',
      vehicleType: 'Three Wheeler',
      registrationNumber: 'TN-01-GH-3456',
      district: 'Chennai',
      division: 'Chennai Central',
      pincode: '600001',
      rating: 4.7,
      totalTrips: 2100,
      shift: 'On Duty',
      status: 'Active',
      deliveryStatus: 'In Transit (ORD-2026-912)',
      verificationStatus: 'Verified',
      activeDeliveries: 3,
      recentDeliveries: [
        { orderId: 'ORD-2026-912', customer: 'Lakshmi Narayanan', destination: 'T. Nagar, Chennai', time: '10:00 AM Today', status: 'In Transit' },
        { orderId: 'ORD-2026-890', customer: 'Murugan P', destination: 'Anna Nagar, Chennai', time: 'Yesterday, 05:15 PM', status: 'Delivered' }
      ]
    },
    {
      id: 'DEL-TN-005',
      name: 'Suresh Kumar',
      phone: '+91 98405 33445',
      vehicleType: 'Light Commercial Van',
      registrationNumber: 'TN-30-JK-7890',
      district: 'Salem',
      division: 'Salem South',
      pincode: '636003',
      rating: 4.5,
      totalTrips: 640,
      shift: 'Offline',
      status: 'Inactive',
      deliveryStatus: 'Off Duty',
      verificationStatus: 'Verified',
      activeDeliveries: 0,
      recentDeliveries: [
        { orderId: 'ORD-2026-750', customer: 'Anitha S', destination: 'Ammapet, Salem', time: '02 Mar 2026', status: 'Delivered' }
      ]
    },
    {
      id: 'DEL-TN-006',
      name: 'Gokulnath R',
      phone: '+91 98405 66778',
      vehicleType: 'Electric Scooter',
      registrationNumber: 'TN-30-LM-2345',
      district: 'Salem',
      division: 'Salem North',
      pincode: '636001',
      rating: 4.8,
      totalTrips: 1120,
      shift: 'Available',
      status: 'Active',
      deliveryStatus: 'Idle - Ready for Dispatch',
      verificationStatus: 'Verified',
      activeDeliveries: 0,
      recentDeliveries: [
        { orderId: 'ORD-2026-860', customer: 'Vikram Chandran', destination: 'Shevapet, Salem', time: 'Yesterday', status: 'Delivered' }
      ]
    }
  ]);

  // Compute 4 KPI stats
  const kpiStats = useMemo(() => {
    const totalPartners = partners.length;
    const onDuty = partners.filter(p => (p.shift || p.status || '').toLowerCase() === 'on duty').length;
    const available = partners.filter(p => (p.shift || p.status || '').toLowerCase() === 'available').length;
    const activeDeliveries = partners.reduce((acc, p) => acc + (p.activeDeliveries || ((p.shift || p.status || '').toLowerCase() === 'on duty' ? 2 : 0)), 0);

    return {
      totalPartners,
      onDuty,
      available,
      activeDeliveries
    };
  }, [partners]);

  // Table Columns
  const columns = [
    {
      header: 'Partner',
      accessor: (row) => `${row.name} ${row.phone}`,
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/70 text-rose-600 border border-rose-100 dark:border-rose-900 shrink-0">
            <Truck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-slate-900 dark:text-white text-xs">{row.name}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1 mt-0.5">
              <Phone className="w-3 h-3 text-slate-400" />
              <span>{row.phone}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      header: 'Vehicle',
      accessor: (row) => `${row.vehicleType} ${row.registrationNumber}`,
      render: (row) => (
        <div className="text-xs">
          <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Bike className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>{row.vehicleType}</span>
          </div>
          <div className="font-mono text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
            {row.registrationNumber}
          </div>
        </div>
      )
    },
    {
      header: 'Location',
      accessor: (row) => `${row.district} ${row.pincode}`,
      render: (row) => (
        <div className="text-xs">
          <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>{row.district}</span>
          </div>
          <div className="font-mono text-emerald-600 dark:text-emerald-400 text-[11px] mt-0.5 pl-4.5">
            PIN: {row.pincode}
          </div>
        </div>
      )
    },
    {
      header: 'Rating & Trips',
      accessor: 'rating',
      render: (row) => (
        <div className="text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{row.rating}</span>
            <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400">
              ({row.totalTrips.toLocaleString()} trips)
            </span>
          </div>
        </div>
      )
    },
    {
      header: 'Shift',
      accessor: 'shift',
      className: 'whitespace-nowrap min-w-[110px]',
      render: (row) => <StatusBadge status={row.shift} />
    },
    {
      header: 'Status',
      accessor: 'status',
      className: 'whitespace-nowrap min-w-[100px]',
      render: (row) => <StatusBadge status={row.status} />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">State Delivery Partners Fleet</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Last-mile delivery executives and courier dispatchers across all districts in {user?.state || 'Tamil Nadu'}.
        </p>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {/* KPI 1: Total Partners */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Partners</span>
            <Truck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">
            {kpiStats.totalPartners.toLocaleString()}
          </div>
          <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">
            Registered fleet capacity
          </div>
        </div>

        {/* KPI 2: On Duty */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">On Duty</span>
            <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">
            {kpiStats.onDuty.toLocaleString()}
          </div>
          <div className="text-[10px] text-sky-600 dark:text-sky-400 font-medium mt-0.5">
            Active working shift
          </div>
        </div>

        {/* KPI 3: Available */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Available</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">
            {kpiStats.available.toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
            Ready for instant dispatch
          </div>
        </div>

        {/* KPI 4: Active Deliveries */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Deliveries</span>
            <Package className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">
            {kpiStats.activeDeliveries.toLocaleString()}
          </div>
          <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium mt-0.5">
            Orders currently in transit
          </div>
        </div>
      </div>

      {/* Table */}
      <DataTable
        title="State-Wide Delivery Fleet"
        subtitle="Manage logistics partners and delivery fulfillment capacity"
        columns={columns}
        data={partners}
        onRowClick={(partner) => {
          setSelectedPartner(partner);
          setShowDetailsModal(true);
        }}
        searchPlaceholder="Search partner name, vehicle, or PIN..."
        exportFileName="state_delivery_partners.csv"
      />

      {/* Details Modal */}
      <DeliveryPartnerDetailsModal
        partner={selectedPartner}
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
      />
    </div>
  );
}

