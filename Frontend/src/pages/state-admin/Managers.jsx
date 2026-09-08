import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { useTheme } from '../../context/ThemeContext';
import {
  UserCog,
  Phone,
  Building2,
  Layers,
  MapPin,
  Award,
  Users,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  Briefcase
} from 'lucide-react';

const LEVEL_CONFIGS = {
  state: {
    title: 'State Managers',
    subtitle: 'Apex state-level operations managers, nodal coordinators, and zone directors across Tamil Nadu.',
    breadcrumb: 'State Managers',
    badge: 'State Manager',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/60',
    icon: Award,
    tableTitle: 'State Operations Management Directory',
    tableSubtitle: 'Master executive managers overseeing district nodes, strategic ops, and state compliance',
    exportFile: 'state_managers.csv',
    defaultData: [
      {
        id: 'MGR-STA-01',
        name: 'Venkatesan Balasubramanian',
        phone: '+91 94432 10101',
        email: 'venkat.statemgr@forgeindia.in',
        jurisdiction: 'Tamil Nadu (State-wide)',
        assignedArea: 'All 38 Districts Administration',
        subordinates: 38,
        activeTeams: 142,
        performanceSla: '99.2%',
        status: 'Active',
        joinedDate: '01 Dec 2023'
      },
      {
        id: 'MGR-STA-02',
        name: 'Meenakshi Sundaram S',
        phone: '+91 94432 10102',
        email: 'meenakshi.statemgr@forgeindia.in',
        jurisdiction: 'Tamil Nadu (North & Central)',
        assignedArea: '18 Districts Field Governance',
        subordinates: 18,
        activeTeams: 86,
        performanceSla: '98.7%',
        status: 'Active',
        joinedDate: '15 Jan 2024'
      },
      {
        id: 'MGR-STA-03',
        name: 'Anandapadmanabhan R',
        phone: '+91 94432 10103',
        email: 'anand.statemgr@forgeindia.in',
        jurisdiction: 'Tamil Nadu (South & West)',
        assignedArea: '20 Districts Field Governance',
        subordinates: 20,
        activeTeams: 94,
        performanceSla: '98.9%',
        status: 'Active',
        joinedDate: '10 Mar 2024'
      }
    ]
  },
  district: {
    title: 'District Managers',
    subtitle: 'District-level operational leaders managing divisional networks, logistics hubs, and territorial compliance.',
    breadcrumb: 'District Managers',
    badge: 'District Manager',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/60',
    icon: Building2,
    tableTitle: 'District Manager Roster',
    tableSubtitle: 'Regional management leads managing division clusters, field supervisors, and admin operations',
    exportFile: 'district_managers.csv',
    defaultData: [
      {
        id: 'MGR-DST-01',
        name: 'Senthil Kumar Duraisamy',
        phone: '+91 98422 33401',
        email: 'senthil.salem@forgeindia.in',
        jurisdiction: 'Salem District',
        assignedArea: 'Salem North, South & Attur Divisions',
        subordinates: 8,
        activeTeams: 42,
        performanceSla: '98.5%',
        status: 'Active',
        joinedDate: '01 Feb 2024'
      },
      {
        id: 'MGR-DST-02',
        name: 'Kavitha Radhakrishnan',
        phone: '+91 98422 33402',
        email: 'kavitha.cbe@forgeindia.in',
        jurisdiction: 'Coimbatore District',
        assignedArea: 'Coimbatore North, South & Pollachi',
        subordinates: 9,
        activeTeams: 54,
        performanceSla: '99.1%',
        status: 'Active',
        joinedDate: '15 Feb 2024'
      },
      {
        id: 'MGR-DST-03',
        name: 'Rajesh Narayanan M',
        phone: '+91 98422 33403',
        email: 'rajesh.madurai@forgeindia.in',
        jurisdiction: 'Madurai District',
        assignedArea: 'Madurai Urban & Melur Divisions',
        subordinates: 6,
        activeTeams: 38,
        performanceSla: '97.8%',
        status: 'Active',
        joinedDate: '01 Mar 2024'
      },
      {
        id: 'MGR-DST-04',
        name: 'Subashree Srinivasan',
        phone: '+91 98422 33404',
        email: 'subashree.chennai@forgeindia.in',
        jurisdiction: 'Chennai Central',
        assignedArea: 'Central Metro & North Maritime Zones',
        subordinates: 12,
        activeTeams: 68,
        performanceSla: '99.4%',
        status: 'Active',
        joinedDate: '10 Mar 2024'
      }
    ]
  },
  divisional: {
    title: 'Divisional Managers',
    subtitle: 'Divisional operations managers supervising pincode clusters, delivery terminals, and local coordinators.',
    breadcrumb: 'Divisional Managers',
    badge: 'Divisional Manager',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60',
    icon: Layers,
    tableTitle: 'Divisional Manager Directory',
    tableSubtitle: 'Zonal hub leaders monitoring daily dispatch, field workforce, and local customer escalations',
    exportFile: 'divisional_managers.csv',
    defaultData: [
      {
        id: 'MGR-DIV-01',
        name: 'Manoj Prabhakar K',
        phone: '+91 97890 12001',
        email: 'manoj.salemnorth@forgeindia.in',
        jurisdiction: 'Salem North Division',
        assignedArea: 'PIN 636001, 636002 & Shevapet Hub',
        subordinates: 14,
        activeTeams: 26,
        performanceSla: '98.2%',
        status: 'Active',
        joinedDate: '12 Apr 2024'
      },
      {
        id: 'MGR-DIV-02',
        name: 'Revathi Sivasankaran',
        phone: '+91 97890 12002',
        email: 'revathi.salemsouth@forgeindia.in',
        jurisdiction: 'Salem South Division',
        assignedArea: 'PIN 636003, 636004 & Gugai Hub',
        subordinates: 12,
        activeTeams: 22,
        performanceSla: '97.9%',
        status: 'Active',
        joinedDate: '20 Apr 2024'
      },
      {
        id: 'MGR-DIV-03',
        name: 'Ganesh Moorthy V',
        phone: '+91 97890 12003',
        email: 'ganesh.cbecentral@forgeindia.in',
        jurisdiction: 'Coimbatore Central Division',
        assignedArea: 'PIN 641001, 641002 & DB Road Hub',
        subordinates: 18,
        activeTeams: 34,
        performanceSla: '99.0%',
        status: 'Active',
        joinedDate: '01 May 2024'
      }
    ]
  },
  pincode: {
    title: 'Pincode Managers',
    subtitle: 'Hyperlocal pincode managers responsible for last-mile delivery SLA, agent coordination, and merchant liaison.',
    breadcrumb: 'Pincode Managers',
    badge: 'Pincode Manager',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/60',
    icon: MapPin,
    tableTitle: 'Pincode Micro-Zone Manager Roster',
    tableSubtitle: 'Last-mile facility managers and field operations leads assigned to postal zones',
    exportFile: 'pincode_managers.csv',
    defaultData: [
      {
        id: 'MGR-PIN-01',
        name: 'Saravanan Muthuraj',
        phone: '+91 98409 66001',
        email: 'saravanan.636001@forgeindia.in',
        jurisdiction: 'PIN: 636001',
        assignedArea: 'Salem Town Fort Facility',
        subordinates: 6,
        activeTeams: 12,
        performanceSla: '98.8%',
        status: 'Active',
        joinedDate: '01 Jun 2024'
      },
      {
        id: 'MGR-PIN-02',
        name: 'Deepak Chandrasekar',
        phone: '+91 98409 66002',
        email: 'deepak.636002@forgeindia.in',
        jurisdiction: 'PIN: 636002',
        assignedArea: 'Shevapet Market Facility',
        subordinates: 5,
        activeTeams: 10,
        performanceSla: '97.5%',
        status: 'Active',
        joinedDate: '10 Jun 2024'
      },
      {
        id: 'MGR-PIN-03',
        name: 'Bhuvaneshwari P',
        phone: '+91 98409 66003',
        email: 'bhuvana.636003@forgeindia.in',
        jurisdiction: 'PIN: 636003',
        assignedArea: 'Ammapet Colony Service Center',
        subordinates: 7,
        activeTeams: 14,
        performanceSla: '99.1%',
        status: 'Active',
        joinedDate: '18 Jun 2024'
      },
      {
        id: 'MGR-PIN-04',
        name: 'Karthikeyan Natarajan',
        phone: '+91 98409 66004',
        email: 'karthi.636004@forgeindia.in',
        jurisdiction: 'PIN: 636004',
        assignedArea: 'Gugai Industrial Yard',
        subordinates: 4,
        activeTeams: 9,
        performanceSla: '98.2%',
        status: 'Active',
        joinedDate: '25 Jun 2024'
      }
    ]
  }
};

export function StateManagers({ level = 'state' }) {
  const { isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active level from path if not passed explicitly
  let activeLevel = level;
  if (location.pathname.includes('/managers/district')) activeLevel = 'district';
  else if (location.pathname.includes('/managers/divisional')) activeLevel = 'divisional';
  else if (location.pathname.includes('/managers/pincode')) activeLevel = 'pincode';
  else if (location.pathname.includes('/managers/state') || location.pathname.endsWith('/managers')) activeLevel = 'state';

  const config = LEVEL_CONFIGS[activeLevel] || LEVEL_CONFIGS.state;
  const managers = config.defaultData;

  const totalManagersCount = managers.length;
  const totalSubordinatesSum = managers.reduce((acc, m) => acc + (m.subordinates || 0), 0);
  const totalTeamsSum = managers.reduce((acc, m) => acc + (m.activeTeams || 0), 0);

  const LevelIcon = config.icon;

  const columns = [
    {
      header: 'Manager Details',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
            <UserCog className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
              <span>{row.name}</span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${config.badgeColor}`}>
                {config.badge}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Jurisdiction & Area',
      accessor: 'jurisdiction',
      render: (row) => (
        <div>
          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            {row.jurisdiction}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">
            {row.assignedArea}
          </div>
        </div>
      )
    },
    {
      header: 'Contact',
      accessor: 'phone',
      render: (row) => (
        <span className="text-xs text-slate-700 dark:text-slate-300 font-mono flex items-center gap-1">
          <Phone className="w-3 h-3 text-slate-400" /> {row.phone}
        </span>
      )
    },
    {
      header: 'Subordinates & Teams',
      accessor: 'subordinates',
      render: (row) => (
        <div>
          <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
            {row.subordinates} Leads Supervised
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">
            {row.activeTeams} Active Teams
          </div>
        </div>
      )
    },
    {
      header: 'Ops SLA',
      accessor: 'performanceSla',
      render: (row) => (
        <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">
          {row.performanceSla}
        </span>
      )
    },
    {
      header: 'Joined Date',
      accessor: 'joinedDate',
      render: (row) => (
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {row.joinedDate}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status || 'Active'} />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header & Level Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{config.title}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{config.subtitle}</p>
        </div>

        {/* Level Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-auto">
          {[
            { id: 'state', label: 'State', path: '/state-admin/managers/state' },
            { id: 'district', label: 'District', path: '/state-admin/managers/district' },
            { id: 'divisional', label: 'Divisional', path: '/state-admin/managers/divisional' },
            { id: 'pincode', label: 'Pincode', path: '/state-admin/managers/pincode' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeLevel === tab.id
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total {config.title}</span>
            <UserCog className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">{totalManagersCount}</div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">100% active roster</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Supervised Staff</span>
            <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">{totalSubordinatesSum}</div>
          <div className="text-[10px] text-blue-600 dark:text-blue-400 font-medium mt-0.5">Direct reporting leads</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Field Units</span>
            <Briefcase className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">{totalTeamsSum}</div>
          <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium mt-0.5">Active field teams</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Average Ops SLA</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">98.8%</div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">Met monthly target</div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        title={config.tableTitle}
        subtitle={config.tableSubtitle}
        columns={columns}
        data={managers}
        searchPlaceholder={`Search ${config.title.toLowerCase()} by name, jurisdiction, or phone...`}
        searchFields={['name', 'email', 'jurisdiction', 'assignedArea', 'phone']}
        exportFileName={config.exportFile}
      />
    </div>
  );
}
