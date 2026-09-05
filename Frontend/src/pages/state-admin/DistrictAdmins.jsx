import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DataTable } from '../../components/DataTable';
import { useTheme } from '../../context/ThemeContext';
import { ShieldAlert, Mail, Phone, Building2, MapPin } from 'lucide-react';

export function StateDistrictAdmins() {
  const { user } = useAuth();
  const { isDark } = useTheme();

  const [admins, setAdmins] = useState([
    {
      id: 'ADM-DST-01',
      name: 'Rajesh Sharma',
      email: 'district_admin@admin.com',
      phone: '+91 98765 43211',
      district: 'Salem',
      code: 'SLM',
      divisionsCount: 2,
      pincodesCount: 4,
      status: 'Active',
      joinedDate: '10 Jan 2026'
    },
    {
      id: 'ADM-DST-02',
      name: 'Sundar Raman',
      email: 'cbe_admin@admin.com',
      phone: '+91 98402 11223',
      district: 'Coimbatore',
      code: 'CBE',
      divisionsCount: 2,
      pincodesCount: 4,
      status: 'Active',
      joinedDate: '12 Jan 2026'
    }
  ]);

  const columns = [
    {
      header: 'District Administrator',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white text-xs">{row.name}</div>
            <div className="text-[11px] text-slate-500 font-mono">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Assigned District',
      accessor: 'district',
      render: (row) => (
        <div>
          <span className="font-bold text-blue-600 dark:text-cyan-300 text-xs flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            {row.district}
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Code: {row.code}</span>
        </div>
      )
    },
    {
      header: 'Coverage Scope',
      accessor: 'divisionsCount',
      render: (row) => (
        <div className="text-xs text-slate-700 dark:text-slate-300">
          <span className="font-semibold">{row.divisionsCount} Divisions</span> • {row.pincodesCount} Pincodes
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
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">State District Administrators</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Supervisory personnel and nodal officers assigned to executive district jurisdictions across {user?.state || 'Tamil Nadu'}.
        </p>
      </div>

      <DataTable
        title="District Admins Directory"
        subtitle="Roster of district administrators and credential status"
        columns={columns}
        data={admins}
        loading={false}
        searchPlaceholder="Search admin by name or district..."
        exportFileName="state_district_admins.csv"
      />
    </div>
  );
}
