import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DataTable } from '../../components/DataTable';
import { ShieldCheck, MapPin, Building2, Layers } from 'lucide-react';

export function StatePincodeAdmins() {
  const { user } = useAuth();
  const [admins, setAdmins] = useState([
    {
      id: 'ADM-PIN-636001',
      name: 'Priya Narayanan',
      email: 'pincode_admin@admin.com',
      phone: '+91 98403 11223',
      pincode: '636001',
      area: 'Salem Town Fort',
      division: 'Salem North',
      district: 'Salem',
      status: 'Active'
    },
    {
      id: 'ADM-PIN-636002',
      name: 'Suresh Raina',
      email: 'pincode_admin_636002@admin.com',
      phone: '+91 98403 44556',
      pincode: '636002',
      area: 'Shevapet & Market',
      division: 'Salem North',
      district: 'Salem',
      status: 'Active'
    },
    {
      id: 'ADM-PIN-636003',
      name: 'Venkatesh Babu',
      email: 'pincode_admin_636003@admin.com',
      phone: '+91 98403 77889',
      pincode: '636003',
      area: 'Ammapet Colony',
      division: 'Salem South',
      district: 'Salem',
      status: 'Active'
    },
    {
      id: 'ADM-PIN-636004',
      name: 'Meena Kumari',
      email: 'pincode_admin_636004@admin.com',
      phone: '+91 98403 99001',
      pincode: '636004',
      area: 'Gugai Industrial Area',
      division: 'Salem South',
      district: 'Salem',
      status: 'Active'
    },
    {
      id: 'ADM-PIN-641001',
      name: 'Arun Kumar',
      email: 'arun_cbe@admin.com',
      phone: '+91 98403 55667',
      pincode: '641001',
      area: 'Town Hall & Big Bazaar',
      division: 'Coimbatore Central',
      district: 'Coimbatore',
      status: 'Active'
    },
    {
      id: 'ADM-PIN-641002',
      name: 'Deepa Rajan',
      email: 'deepa_cbe@admin.com',
      phone: '+91 98403 88990',
      pincode: '641002',
      area: 'RS Puram & DB Road',
      division: 'Coimbatore Central',
      district: 'Coimbatore',
      status: 'Active'
    }
  ]);

  const columns = [
    {
      header: 'Pincode Administrator',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white text-xs">{row.name}</div>
            <div className="text-[11px] text-slate-500 font-mono">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Assigned Pincode',
      accessor: 'pincode',
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span className="font-mono font-bold text-slate-900 dark:text-white text-xs">{row.pincode}</span>
          <span className="text-[11px] text-slate-500 font-medium">({row.area})</span>
        </div>
      )
    },
    {
      header: 'Jurisdiction',
      accessor: 'division',
      render: (row) => (
        <div>
          <div className="text-xs font-semibold text-slate-900 dark:text-white">{row.division}</div>
          <div className="text-[11px] text-slate-500">{row.district} District</div>
        </div>
      )
    },
    {
      header: 'Contact',
      accessor: 'phone',
      render: (row) => <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">{row.phone}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-900/50">
          {row.status}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">State Pincode Administrators</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Micro-zone nodal administrators managing hyperlocal territory operations across {user?.state || 'Tamil Nadu'}.
        </p>
      </div>

      <DataTable
        title="Pincode Administrators Roster"
        subtitle="Directory of field pincode admins and operational contact details"
        columns={columns}
        data={admins}
        loading={false}
        searchPlaceholder="Search admin by name, pincode, or division..."
        exportFileName="state_pincode_admins.csv"
      />
    </div>
  );
}
