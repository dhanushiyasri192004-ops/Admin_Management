import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DataTable } from '../../components/DataTable';
import { ShieldCheck, Mail, Phone, Layers, Building2 } from 'lucide-react';

export function StateDivisionAdmins() {
  const { user } = useAuth();
  const [admins, setAdmins] = useState([
    {
      id: 'ADM-DIV-01',
      name: 'Karthik Subramanian',
      email: 'divisional_admin@admin.com',
      phone: '+91 98401 23456',
      division: 'Salem North',
      district: 'Salem',
      pincodes: ['636001', '636002'],
      status: 'Active',
      joinedDate: '15 Jan 2026'
    },
    {
      id: 'ADM-DIV-02',
      name: 'Venkatesh Rao',
      email: 'div_admin_south@admin.com',
      phone: '+91 98402 88991',
      division: 'Salem South',
      district: 'Salem',
      pincodes: ['636003', '636004'],
      status: 'Active',
      joinedDate: '20 Jan 2026'
    },
    {
      id: 'ADM-DIV-03',
      name: 'Ramesh Krishnan',
      email: 'div_cbe_central@admin.com',
      phone: '+91 98402 44556',
      division: 'Coimbatore Central',
      district: 'Coimbatore',
      pincodes: ['641001', '641002'],
      status: 'Active',
      joinedDate: '18 Jan 2026'
    },
    {
      id: 'ADM-DIV-04',
      name: 'Meera S',
      email: 'div_cbe_north@admin.com',
      phone: '+91 98402 77889',
      division: 'Coimbatore North',
      district: 'Coimbatore',
      pincodes: ['641003', '641004'],
      status: 'Active',
      joinedDate: '22 Jan 2026'
    }
  ]);

  const columns = [
    {
      header: 'Division Administrator',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
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
      header: 'Assigned Division & District',
      accessor: 'division',
      render: (row) => (
        <div>
          <span className="font-bold text-blue-600 dark:text-cyan-300 text-xs flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            {row.division} Division
          </span>
          <span className="text-[11px] text-slate-500">{row.district} District</span>
        </div>
      )
    },
    {
      header: 'Covered Pincodes',
      accessor: 'pincodes',
      render: (row) => (
        <div className="flex gap-1 flex-wrap">
          {row.pincodes.map((pin) => (
            <span
              key={pin}
              className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              {pin}
            </span>
          ))}
        </div>
      )
    },
    {
      header: 'Contact',
      accessor: 'phone',
      render: (row) => (
        <span className="text-xs text-slate-600 dark:text-slate-400 font-mono flex items-center gap-1">
          <Phone className="w-3 h-3 text-slate-400" /> {row.phone}
        </span>
      )
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
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">State Division Administrators</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Roster of divisional administrators managing regional operational clusters across {user?.state || 'Tamil Nadu'}.
        </p>
      </div>

      <DataTable
        title="Division Admins Directory"
        subtitle="Divisional hierarchy administrators and contact records"
        columns={columns}
        data={admins}
        loading={false}
        searchPlaceholder="Search admin by name, division, or district..."
        exportFileName="state_division_admins.csv"
      />
    </div>
  );
}
