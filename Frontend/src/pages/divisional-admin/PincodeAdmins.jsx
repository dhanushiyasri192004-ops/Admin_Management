import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export function DivisionalPincodeAdmins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getSubordinateAdmins();
      if (res.success) {
        setAdmins(res.admins.filter(a => a.role === 'Pincode Admin'));
      }
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
      header: 'Admin Details',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
            alt={row.name}
            className="w-10 h-10 rounded-xl object-cover border border-cyan-500/40"
          />
          <div>
            <div className="font-bold text-white text-sm">{row.name.split(' (')[0]}</div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <Mail className="w-3 h-3 text-slate-500" />
              {row.email}
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <Phone className="w-3 h-3 text-slate-500" />
              {row.phone}
            </div>
          </div>
        </div>
      )
    },
    {
      header: 'Assigned Pincode',
      accessor: 'pincode',
      render: (row) => (
        <span className="px-3 py-1 rounded-lg font-mono font-bold text-xs bg-emerald-950 text-emerald-300 border border-emerald-700/50 flex items-center gap-1 w-fit">
          <MapPin className="w-3.5 h-3.5" /> PIN: {row.pincode}
        </span>
      )
    },
    {
      header: 'Role Level',
      accessor: 'role',
      render: (row) => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-700/40">
          {row.role}
        </span>
      )
    },
    {
      header: 'Access Scope',
      accessor: () => 'Strict Pincode Isolation',
      render: () => (
        <span className="text-xs text-slate-300">
          Strictly restricted to assigned pincode only
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Supervised Pincode Admins</h2>
        <p className="text-xs text-slate-400">Pincode administrators operating under this Division.</p>
      </div>

      <DataTable
        title="Pincode Administrators Roster"
        subtitle="Manage and monitor subordinate Pincode Admins"
        columns={columns}
        data={admins}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search admin..."
        exportFileName="divisional_pincode_admins.csv"
      />
    </div>
  );
}
