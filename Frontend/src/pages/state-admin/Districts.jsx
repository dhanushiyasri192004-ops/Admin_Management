import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { Modal } from '../../components/Modal';
import { useTheme } from '../../context/ThemeContext';
import { 
  Building2, 
  ArrowRight, 
  Mail, 
  Phone, 
  GraduationCap, 
  MapPin, 
  Eye 
} from 'lucide-react';

export function StateDistricts() {
  const { isDark } = useTheme();
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const navigate = useNavigate();

  const getAdminDetails = (row) => {
    const adminProfiles = {
      'Salem': {
        id: 'ADM-DST-01',
        employeeCode: 'EMP-TN-DST-004',
        name: 'Ananya Iyer',
        email: 'district_admin@admin.com',
        phone: '+91 98765 43211',
        emergencyPhone: '+91 98765 43299',
        district: 'Salem',
        code: 'DST-SALEM',
        state: 'Tamil Nadu',
        divisionsCount: row.divisions?.length || 2,
        pincodesCount: row.divisions?.reduce((s, d) => s + (d.pincodes?.length || 0), 0) || 4,
        status: row.status || 'Active',
        joinedDate: '10 Jan 2026',
        qualification: 'Master of Public Administration (MPA), B.Tech (IT)',
        experience: '8+ years in Territorial Public Governance & Ops',
        specialization: 'District Logistics & Municipal Governance',
        address: 'Collectorate Administrative Complex, 42 Meyyanur Main Road, Salem - 636004, Tamil Nadu'
      },
      'Coimbatore': {
        id: 'ADM-DST-02',
        employeeCode: 'EMP-TN-DST-008',
        name: 'Sundar Raman',
        email: 'cbe_admin@admin.com',
        phone: '+91 98402 11223',
        emergencyPhone: '+91 98402 11299',
        district: 'Coimbatore',
        code: 'DST-CBE',
        state: 'Tamil Nadu',
        divisionsCount: row.divisions?.length || 2,
        pincodesCount: row.divisions?.reduce((s, d) => s + (d.pincodes?.length || 0), 0) || 4,
        status: row.status || 'Active',
        joinedDate: '12 Jan 2026',
        qualification: 'MBA in Operations & Logistics, B.E. (Computer Science)',
        experience: '10+ years in Zonal Logistics & District Administration',
        specialization: 'Smart City Infrastructure & Last-Mile Field Ops',
        address: 'District Collectorate Office, 15 Avinashi Road, Peelamedu, Coimbatore - 641004, Tamil Nadu'
      }
    };

    if (adminProfiles[row.name]) {
      return { ...adminProfiles[row.name], status: row.status || 'Active' };
    }

    const adminName = row.adminName || `${row.name} Admin`;
    return {
      id: `ADM-DST-${row.code || row.name.slice(0, 3).toUpperCase()}`,
      employeeCode: `EMP-TN-DST-${row.code || '009'}`,
      name: adminName,
      email: row.adminEmail || `${row.name.toLowerCase()}_admin@admin.com`,
      phone: '+91 98400 12345',
      emergencyPhone: '+91 98400 54321',
      district: row.name,
      code: row.id || row.code || `DST-${row.name.toUpperCase()}`,
      state: 'Tamil Nadu',
      divisionsCount: row.divisions?.length || 0,
      pincodesCount: row.divisions?.reduce((s, d) => s + (d.pincodes?.length || 0), 0) || 0,
      status: row.status || 'Active',
      joinedDate: '15 Jan 2026',
      qualification: 'Master of Public Administration, B.E.',
      experience: '7+ years in District Administration',
      specialization: 'Zonal Territory & Field Force Operations',
      address: `District Administrative Complex, Main Road, ${row.name}, Tamil Nadu`
    };
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getDistricts();
      if (res.success) setDistricts(res.districts);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleStatus = async (row) => {
    const currentStatus = row.status || 'Active';
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';

    // Optimistically update status in local state
    setDistricts(prev =>
      prev.map(d => (d.id === row.id || d.name === row.name ? { ...d, status: newStatus } : d))
    );

    try {
      await dataService.updateDistrictStatus(row.id || row.name, newStatus);
    } catch (err) {
      console.error('Failed to update district status', err);
      // Revert upon error
      setDistricts(prev =>
        prev.map(d => (d.id === row.id || d.name === row.name ? { ...d, status: currentStatus } : d))
      );
    }
  };

  const columns = [
    {
      header: 'District Name / ID',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-lg border ${
            isDark ? 'bg-indigo-950/80 border-indigo-700/50 text-indigo-400' : 'bg-blue-50 border-blue-100 text-blue-600'
          }`}>
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{row.name}</div>
            <div className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>ID: {row.id || row.code}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Admins Name',
      accessor: (row) => row.adminName || 'Unassigned',
      render: (row) => {
        const adminName = row.adminName || (row.name === 'Salem' ? 'Ananya Iyer' : row.name === 'Coimbatore' ? 'Sundar Raman' : 'Unassigned');
        const adminEmail = row.adminEmail || `${(row.name || '').toLowerCase()}_admin@admin.com`;
        return (
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
              isDark ? 'bg-indigo-950/80 text-cyan-300 border border-indigo-800/60' : 'bg-blue-100 text-blue-700 border border-blue-200'
            }`}>
              {adminName[0]}
            </div>
            <div>
              <div className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {adminName}
              </div>
              <div className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {adminEmail}
              </div>
            </div>
          </div>
        );
      }
    },
    {
      header: 'Division / Pincodes',
      accessor: (row) => {
        const divCount = row.divisions?.length || 0;
        const pinCount = row.divisions?.reduce((sum, d) => sum + (d.pincodes?.length || 0), 0) || 0;
        return `${divCount} / ${pinCount}`;
      },
      render: (row) => {
        const divCount = row.divisions?.length || 0;
        const pinCount = row.divisions?.reduce((sum, d) => sum + (d.pincodes?.length || 0), 0) || 0;
        const tooltipDetails = row.divisions?.map(d => `${d.name}: ${d.pincodes?.join(', ')}`).join('\n');

        return (
          <div className="flex items-center gap-2 text-xs py-1" title={tooltipDetails}>
            <span className={`inline-flex items-center justify-center min-w-[28px] px-2.5 py-1 rounded-lg border font-bold text-xs ${
              isDark
                ? 'bg-blue-950/60 border-blue-800/60 text-cyan-300'
                : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}>
              {divCount}
            </span>
            <span className="text-slate-400 dark:text-slate-500 font-bold">/</span>
            <span className={`inline-flex items-center justify-center min-w-[28px] px-2.5 py-1 rounded-lg border font-bold text-xs ${
              isDark
                ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-300'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}>
              {pinCount}
            </span>
          </div>
        );
      }
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => {
        const isActive = (row.status || 'Active') === 'Active';
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
            isActive
              ? isDark
                ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/30'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : isDark
                ? 'bg-rose-950/70 text-rose-300 border-rose-500/30'
                : 'bg-rose-50 text-rose-700 border-rose-200'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
            {isActive ? 'Active' : 'Inactive'}
          </span>
        );
      }
    },
    {
      header: 'Hierarchy Action',
      accessor: 'actions',
      render: (row) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/state-admin/divisions?district=${encodeURIComponent(row.name)}`);
          }}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition shadow-xs cursor-pointer ${
            isDark
              ? 'bg-slate-800 border-slate-700 text-blue-400 hover:bg-slate-700'
              : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
          }`}
        >
          <span>View Divisions</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            State Districts Management
          </h2>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Overview of all authorized districts under this State. Click a row to view Admin details, or "View Divisions" to drill down.
          </p>
        </div>

        {/* Drill down Breadcrumb hint */}
        <div className={`flex items-center gap-2 text-xs border rounded-xl px-3 py-1.5 font-mono ${
          isDark
            ? 'bg-slate-800/80 border-slate-700 text-slate-400'
            : 'bg-slate-100 border-slate-200 text-slate-600'
        }`}>
          <span className="text-blue-600 font-bold">State</span>
          <span>&rarr;</span>
          <span>District</span>
          <span>&rarr;</span>
          <span>Division</span>
          <span>&rarr;</span>
          <span>Pincode</span>
        </div>
      </div>

      <DataTable
        title="Districts Directory"
        subtitle="Hierarchical administration under assigned state. Click any row to inspect Admin details."
        columns={columns}
        data={districts}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search district name or ID..."
        exportFileName="state_districts.csv"
        onRowClick={(row) => setSelectedAdmin(getAdminDetails(row))}
      />

      {/* District Administrator Profile Modal */}
      <Modal
        isOpen={!!selectedAdmin}
        onClose={() => setSelectedAdmin(null)}
        title="District Administrator Profile"
        maxWidth="max-w-2xl"
      >
        {selectedAdmin && (
          <div className="space-y-5">
            {/* Top Profile Header */}
            <div className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200/80'
            }`}>
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                  isDark ? 'bg-indigo-950 border border-indigo-700/60 text-cyan-300' : 'bg-blue-600 text-white shadow-sm'
                }`}>
                  {selectedAdmin.name[0]}
                </div>
                <div>
                  <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {selectedAdmin.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>District Administrator</span>
                    <span>•</span>
                    <span className="font-mono">{selectedAdmin.employeeCode}</span>
                  </div>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-900/50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {selectedAdmin.status}
              </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Contact Card */}
              <div className={`p-4 rounded-xl border space-y-3 ${
                isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50/70 border-slate-200'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/60 pb-2">
                  <Phone className="w-3.5 h-3.5 text-blue-500" />
                  <span>Contact Information</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Official Email:</span>
                    <div className={`font-mono font-medium ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{selectedAdmin.email}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Mobile Number:</span>
                    <div className={`font-mono font-medium ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{selectedAdmin.phone}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Emergency Contact:</span>
                    <div className={`font-mono font-medium ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{selectedAdmin.emergencyPhone || 'N/A'}</div>
                  </div>
                </div>
              </div>

              {/* Jurisdiction Card */}
              <div className={`p-4 rounded-xl border space-y-3 ${
                isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50/70 border-slate-200'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/60 pb-2">
                  <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Jurisdiction & Scope</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Assigned District:</span>
                    <div className={`font-bold ${isDark ? 'text-cyan-300' : 'text-blue-600'}`}>
                      {selectedAdmin.district} (Code: {selectedAdmin.code})
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Supervisory Scope:</span>
                    <div className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                      {selectedAdmin.divisionsCount} Divisions • {selectedAdmin.pincodesCount} Pincodes
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Date of Appointment:</span>
                    <div className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{selectedAdmin.joinedDate}</div>
                  </div>
                </div>
              </div>

              {/* Qualifications & Experience Card */}
              <div className={`p-4 rounded-xl border space-y-3 md:col-span-2 ${
                isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50/70 border-slate-200'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/60 pb-2">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Qualification & Professional Credentials</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Academic Qualification:</span>
                    <div className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{selectedAdmin.qualification}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Relevant Experience:</span>
                    <div className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{selectedAdmin.experience}</div>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 dark:text-slate-400">Functional Domain:</span>
                    <div className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{selectedAdmin.specialization}</div>
                  </div>
                </div>
              </div>

              {/* Official Administrative Address */}
              <div className={`p-4 rounded-xl border space-y-2 md:col-span-2 ${
                isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50/70 border-slate-200'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/60 pb-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>Official Headquarters Address</span>
                </div>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {selectedAdmin.address}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedAdmin(null)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Close Profile
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
