import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DataTable } from '../../components/DataTable';
import { Modal } from '../../components/Modal';
import { useTheme } from '../../context/ThemeContext';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Eye, 
  GraduationCap, 
  Building2, 
  Layers, 
  Users, 
  ShieldCheck 
} from 'lucide-react';

export function StatePincodeAdmins() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const [admins] = useState([
    {
      id: 'ADM-PIN-636001',
      employeeCode: 'EMP-TN-PIN-001',
      name: 'Priya Narayanan',
      email: 'pincode_admin@admin.com',
      phone: '+91 98765 43213',
      emergencyPhone: '+91 98765 43293',
      pincode: '636001',
      area: 'Salem Town Fort',
      division: 'Salem North',
      district: 'Salem',
      state: 'Tamil Nadu',
      totalCustomers: 1420,
      population: '84,500',
      status: 'Active',
      joinedDate: '15 Jan 2026',
      qualification: 'B.Tech in Information Technology, PGD in Operations',
      experience: '5+ years in Hyperlocal Ground Logistics & Operations',
      specialization: 'Last-Mile Delivery Coordination & Merchant Support',
      address: 'Hyperlocal Hub 636001, 12 Town Hall Road, Fort, Salem - 636001, Tamil Nadu'
    },
    {
      id: 'ADM-PIN-636002',
      employeeCode: 'EMP-TN-PIN-002',
      name: 'Suresh Raina',
      email: 'pincode_admin_636002@admin.com',
      phone: '+91 98765 43214',
      emergencyPhone: '+91 98765 43294',
      pincode: '636002',
      area: 'Shevapet & Market',
      division: 'Salem North',
      district: 'Salem',
      state: 'Tamil Nadu',
      totalCustomers: 980,
      population: '62,100',
      status: 'Active',
      joinedDate: '18 Jan 2026',
      qualification: 'B.Com in E-Commerce & Logistics, Supply Chain Certificate',
      experience: '4+ years in Wholesale Market Operations & Field Ops',
      specialization: 'B2B Vendor Management & Delivery Ops',
      address: 'Zonal Pincode Office, 45 Bazaar Street, Shevapet, Salem - 636002, Tamil Nadu'
    },
    {
      id: 'ADM-PIN-636003',
      employeeCode: 'EMP-TN-PIN-003',
      name: 'Venkatesh Babu',
      email: 'venkatesh_babu_admin@admin.com',
      phone: '+91 98403 77889',
      emergencyPhone: '+91 98403 77899',
      pincode: '636003',
      area: 'Ammapet Colony',
      division: 'Salem South',
      district: 'Salem',
      state: 'Tamil Nadu',
      totalCustomers: 1150,
      population: '75,400',
      status: 'Active',
      joinedDate: '20 Jan 2026',
      qualification: 'B.Sc Computer Science, Diploma in Logistics',
      experience: '6+ years in Retail Zone Management & Local Logistics',
      specialization: 'Customer Grievance & Hyperlocal Service Delivery',
      address: 'Pincode Service Center, 7 Colony Main Road, Ammapet, Salem - 636003, Tamil Nadu'
    },
    {
      id: 'ADM-PIN-636004',
      employeeCode: 'EMP-TN-PIN-004',
      name: 'Meena Kumari',
      email: 'meena_kumari_admin@admin.com',
      phone: '+91 98403 99001',
      emergencyPhone: '+91 98403 99099',
      pincode: '636004',
      area: 'Gugai Industrial Area',
      division: 'Salem South',
      district: 'Salem',
      state: 'Tamil Nadu',
      totalCustomers: 720,
      population: '53,200',
      status: 'Active',
      joinedDate: '22 Jan 2026',
      qualification: 'B.A. Public Relations, Diploma in Supply Chain Operations',
      experience: '5+ years in Industrial Area Logistics & Cluster Management',
      specialization: 'Industrial Supplies & Vendor Relations',
      address: 'Gugai Cluster Nodal Office, 18 Industrial Estate Road, Gugai, Salem - 636004, Tamil Nadu'
    },
    {
      id: 'ADM-PIN-641001',
      employeeCode: 'EMP-TN-PIN-005',
      name: 'Arun Kumar',
      email: 'arun_kumar_admin@admin.com',
      phone: '+91 98403 55667',
      emergencyPhone: '+91 98403 55699',
      pincode: '641001',
      area: 'Town Hall & Big Bazaar',
      division: 'Coimbatore Central',
      district: 'Coimbatore',
      state: 'Tamil Nadu',
      totalCustomers: 2300,
      population: '110,000',
      status: 'Active',
      joinedDate: '12 Jan 2026',
      qualification: 'MBA in Logistics & Supply Chain, B.Tech',
      experience: '7+ years in High-Density Urban Zone Management',
      specialization: 'Commercial Hubs & Real-time Field Coordination',
      address: 'Town Hall Central Point, 101 Big Bazaar Street, Coimbatore - 641001, Tamil Nadu'
    },
    {
      id: 'ADM-PIN-641002',
      employeeCode: 'EMP-TN-PIN-006',
      name: 'Deepa Rajan',
      email: 'deepa_rajan_admin@admin.com',
      phone: '+91 98403 88990',
      emergencyPhone: '+91 98403 88999',
      pincode: '641002',
      area: 'RS Puram & DB Road',
      division: 'Coimbatore Central',
      district: 'Coimbatore',
      state: 'Tamil Nadu',
      totalCustomers: 1850,
      population: '95,000',
      status: 'Active',
      joinedDate: '14 Jan 2026',
      qualification: 'M.Sc Operations Management, B.Sc Mathematics',
      experience: '6+ years in Retail & Residential Hub Logistics',
      specialization: 'Premium Customer Accounts & Premium Delivery Operations',
      address: 'RS Puram Zone Office, 33 DB Road, Coimbatore - 641002, Tamil Nadu'
    },
    {
      id: 'ADM-PIN-641003',
      employeeCode: 'EMP-TN-PIN-007',
      name: 'Vijay Ganesh',
      email: 'vijay_ganesh_admin@admin.com',
      phone: '+91 98403 66778',
      emergencyPhone: '+91 98403 66799',
      pincode: '641003',
      area: 'Gandhipuram Central',
      division: 'Coimbatore North',
      district: 'Coimbatore',
      state: 'Tamil Nadu',
      totalCustomers: 1400,
      population: '88,000',
      status: 'Active',
      joinedDate: '16 Jan 2026',
      qualification: 'B.E. Computer Science, MBA in Logistics',
      experience: '5+ years in Zonal Hub Operations & Dispatch Coordination',
      specialization: 'Transit Hubs & Merchant Delivery Integrations',
      address: 'Gandhipuram Transit Office, 7 Cross Cut Road, Coimbatore - 641003, Tamil Nadu'
    },
    {
      id: 'ADM-PIN-641004',
      employeeCode: 'EMP-TN-PIN-008',
      name: 'Bhavani Shankar',
      email: 'bhavani_shankar_admin@admin.com',
      phone: '+91 98403 44112',
      emergencyPhone: '+91 98403 44199',
      pincode: '641004',
      area: 'Peelamedu Tech Zone',
      division: 'Coimbatore North',
      district: 'Coimbatore',
      state: 'Tamil Nadu',
      totalCustomers: 1950,
      population: '102,000',
      status: 'Active',
      joinedDate: '18 Jan 2026',
      qualification: 'M.Tech Information Systems, B.Tech in IT',
      experience: '8+ years in Smart City Tech Zone Logistics & Services',
      specialization: 'IT Corridor Vendor Logistics & Automated Dispatch',
      address: 'Peelamedu Nodal Hub, 15 Avinashi Road, Coimbatore - 641004, Tamil Nadu'
    }
  ]);

  const columns = [
    {
      header: 'NAME',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
            isDark ? 'bg-indigo-950/80 text-cyan-300 border border-indigo-800/60' : 'bg-blue-100 text-blue-700 border border-blue-200'
          }`}>
            {row.name[0]}
          </div>
          <div>
            <div className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>{row.name}</div>
            <div className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{row.employeeCode || row.id}</div>
          </div>
        </div>
      )
    },
    {
      header: 'EMAIL / MOBILE NUMBER',
      accessor: 'email',
      render: (row) => (
        <div className="space-y-0.5">
          <div className={`text-xs font-medium flex items-center gap-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            <Mail className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="font-mono text-[11px]">{row.email}</span>
          </div>
          <div className={`text-xs flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <Phone className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="font-mono text-[11px]">{row.phone}</span>
          </div>
        </div>
      )
    },
    {
      header: 'ASSIGNED PINCODE',
      accessor: 'pincode',
      render: (row) => (
        <div>
          <span className={`font-bold text-xs flex items-center gap-1.5 ${isDark ? 'text-cyan-300' : 'text-blue-600'}`}>
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            PIN: {row.pincode}
          </span>
          <span className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {row.area} • {row.division}
          </span>
        </div>
      )
    },
    {
      header: 'STATUS',
      accessor: 'status',
      render: (row) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-900/50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          {row.status}
        </span>
      )
    },
    {
      header: 'VIEW',
      accessor: 'actions',
      render: (row) => (
        <button
          type="button"
          onClick={() => setSelectedAdmin(row)}
          className={`inline-flex items-center justify-center p-2 rounded-lg border transition shadow-2xs cursor-pointer ${
            isDark
              ? 'bg-slate-800 border-slate-700 text-cyan-300 hover:bg-slate-700 hover:text-white'
              : 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 hover:text-blue-800'
          }`}
          title="View Pincode Admin Profile"
        >
          <Eye className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>State Pincode Administrators</h2>
        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Micro-zone nodal administrators managing hyperlocal territory operations across {user?.state || 'Tamil Nadu'}.
        </p>
      </div>

      <DataTable
        title="Pincode Admins Directory"
        subtitle="Roster of pincode administrators, contact channels and credential status"
        columns={columns}
        data={admins}
        loading={false}
        searchPlaceholder="Search admin by name, pincode, or area..."
        exportFileName="state_pincode_admins.csv"
      />

      {/* Pincode Admin Details Modal */}
      <Modal
        isOpen={!!selectedAdmin}
        onClose={() => setSelectedAdmin(null)}
        title="Pincode Administrator Profile"
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
                    <span>Pincode Administrator</span>
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
                  <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Jurisdiction & Territory</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Assigned Pincode & Area:</span>
                    <div className={`font-bold ${isDark ? 'text-cyan-300' : 'text-blue-600'}`}>
                      PIN: {selectedAdmin.pincode} ({selectedAdmin.area})
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Parent Division & District:</span>
                    <div className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                      {selectedAdmin.division} Division • {selectedAdmin.district} District
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Hyperlocal Coverage:</span>
                    <div className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                      {selectedAdmin.totalCustomers} Customers • Population: {selectedAdmin.population}
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
                  <Building2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>Official Hyperlocal Hub Address</span>
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
