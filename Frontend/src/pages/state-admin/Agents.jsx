import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { useTheme } from '../../context/ThemeContext';
import { 
  UserPlus, 
  Phone, 
  Building2, 
  Layers, 
  MapPin, 
  Award, 
  Wallet, 
  TrendingUp, 
  CheckCircle2, 
  Users 
} from 'lucide-react';

const LEVEL_CONFIGS = {
  state: {
    title: 'State Agents',
    subtitle: 'Apex state-level customer onboarding partners, lead coordinators, and network directors across Tamil Nadu.',
    breadcrumb: 'State Agents',
    badge: 'State Agent',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/60',
    icon: Award,
    tableTitle: 'State Agent Network Roster',
    tableSubtitle: 'Master agent network, regional referrals, and commission settlements across all 38 districts',
    exportFile: 'state_agents.csv',
    defaultData: [
      {
        id: 'AGT-STA-01',
        name: 'Thirunavukkarasu R',
        phone: '+91 98940 55101',
        email: 'thiru.state@domain.com',
        jurisdiction: 'Tamil Nadu (State-wide)',
        assignedArea: '38 Districts Coverage',
        totalReferrals: 420,
        activeSubscribers: 340,
        walletBalance: 28500,
        totalEarned: 165000,
        status: 'Active',
        joinedDate: '10 Jan 2024'
      },
      {
        id: 'AGT-STA-02',
        name: 'Jayachandran Mohan',
        phone: '+91 98940 55102',
        email: 'jaya.state@domain.com',
        jurisdiction: 'Tamil Nadu (North Zone)',
        assignedArea: '14 Districts Coverage',
        totalReferrals: 310,
        activeSubscribers: 245,
        walletBalance: 18200,
        totalEarned: 122000,
        status: 'Active',
        joinedDate: '15 Mar 2024'
      },
      {
        id: 'AGT-STA-03',
        name: 'Senthil Nathan K',
        phone: '+91 98940 55107',
        email: 'senthil.state@domain.com',
        jurisdiction: 'Tamil Nadu (South Zone)',
        assignedArea: '16 Districts Coverage',
        totalReferrals: 285,
        activeSubscribers: 210,
        walletBalance: 15400,
        totalEarned: 98500,
        status: 'Active',
        joinedDate: '20 May 2024'
      }
    ]
  },
  district: {
    title: 'District Agents',
    subtitle: 'District-level field directors, territorial sales leads, and regional distribution coordinators.',
    breadcrumb: 'District Agent',
    badge: 'District Agent',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/60',
    icon: Building2,
    tableTitle: 'District Agent Directory',
    tableSubtitle: 'Territorial lead agents managing division clusters and district customer onboarding',
    exportFile: 'district_agents.csv',
    defaultData: [
      {
        id: 'AGT-DST-01',
        name: 'Karthik Subramanian',
        phone: '+91 98401 22345',
        email: 'karthik.district@domain.com',
        jurisdiction: 'Salem District',
        assignedArea: 'Salem North & South Divisions',
        totalReferrals: 195,
        activeSubscribers: 155,
        walletBalance: 14500,
        totalEarned: 84000,
        status: 'Active',
        joinedDate: '01 Feb 2025'
      },
      {
        id: 'AGT-DST-02',
        name: 'Venkatesh Babu',
        phone: '+91 98402 33456',
        email: 'venkat.district@domain.com',
        jurisdiction: 'Coimbatore District',
        assignedArea: 'Coimbatore North & South Divisions',
        totalReferrals: 230,
        activeSubscribers: 190,
        walletBalance: 16800,
        totalEarned: 96000,
        status: 'Active',
        joinedDate: '12 Feb 2025'
      },
      {
        id: 'AGT-DST-03',
        name: 'Madhavan S',
        phone: '+91 98403 44567',
        email: 'madhav.district@domain.com',
        jurisdiction: 'Madurai District',
        assignedArea: 'Madurai Central & South Divisions',
        totalReferrals: 175,
        activeSubscribers: 130,
        walletBalance: 11200,
        totalEarned: 72000,
        status: 'Active',
        joinedDate: '05 Mar 2025'
      }
    ]
  },
  divisional: {
    title: 'Divisional Agents',
    subtitle: 'Divisional cluster sales coordinators, local hub supervisors, and field merchant-customer liaisons.',
    breadcrumb: 'Divisional Agent',
    badge: 'Divisional Agent',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60',
    icon: Layers,
    tableTitle: 'Divisional Agent Registry',
    tableSubtitle: 'Division outreach partners overseeing local postal pincode operations',
    exportFile: 'divisional_agents.csv',
    defaultData: [
      {
        id: 'AGT-DIV-01',
        name: 'Rajendran P',
        phone: '+91 98940 77101',
        email: 'rajendran.div@domain.com',
        jurisdiction: 'Salem North Division',
        assignedArea: 'PIN: 636001, 636002, 636003',
        totalReferrals: 112,
        activeSubscribers: 88,
        walletBalance: 9800,
        totalEarned: 54000,
        status: 'Active',
        joinedDate: '10 Apr 2025'
      },
      {
        id: 'AGT-DIV-02',
        name: 'Anand Kumar V',
        phone: '+91 98940 77102',
        email: 'anand.div@domain.com',
        jurisdiction: 'Salem South Division',
        assignedArea: 'PIN: 636004, 636005, 636006',
        totalReferrals: 98,
        activeSubscribers: 74,
        walletBalance: 7600,
        totalEarned: 46000,
        status: 'Active',
        joinedDate: '18 Apr 2025'
      },
      {
        id: 'AGT-DIV-03',
        name: 'Saravanan M',
        phone: '+91 98940 77103',
        email: 'saravanan.div@domain.com',
        jurisdiction: 'Coimbatore North Division',
        assignedArea: 'PIN: 641001, 641002, 641003',
        totalReferrals: 135,
        activeSubscribers: 105,
        walletBalance: 12400,
        totalEarned: 68000,
        status: 'Active',
        joinedDate: '22 Apr 2025'
      }
    ]
  },
  pincode: {
    title: 'Pincode Agents',
    subtitle: 'Hyper-local pincode service agents, door-to-door customer onboarding, and neighborhood liaisons.',
    breadcrumb: 'Pincode Agent',
    badge: 'Pincode Agent',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/60',
    icon: MapPin,
    tableTitle: 'Pincode Ground Agent Roster',
    tableSubtitle: 'Last-mile postal code franchise associates and active customer membership card distributors',
    exportFile: 'pincode_agents.csv',
    defaultData: [
      {
        id: 'AGT-PIN-01',
        name: 'Naveen Kumar M',
        phone: '+91 98940 55103',
        email: 'naveen.agent@gmail.com',
        jurisdiction: 'PIN: 636001 (Salem Fort)',
        assignedArea: 'Salem Town Fort Zone',
        totalReferrals: 94,
        activeSubscribers: 72,
        walletBalance: 9800,
        totalEarned: 52000,
        status: 'Active',
        joinedDate: '20 Jul 2024'
      },
      {
        id: 'AGT-PIN-02',
        name: 'Dinesh Karthik R',
        phone: '+91 98940 88201',
        email: 'dinesh.pincode@gmail.com',
        jurisdiction: 'PIN: 636002 (Shevapet)',
        assignedArea: 'Shevapet & Market Area',
        totalReferrals: 82,
        activeSubscribers: 61,
        walletBalance: 6500,
        totalEarned: 41000,
        status: 'Active',
        joinedDate: '05 Aug 2024'
      },
      {
        id: 'AGT-PIN-03',
        name: 'Pravin Chandran',
        phone: '+91 98940 88202',
        email: 'pravin.pincode@gmail.com',
        jurisdiction: 'PIN: 636003 (Ammapet)',
        assignedArea: 'Ammapet Colony Hub',
        totalReferrals: 76,
        activeSubscribers: 58,
        walletBalance: 5900,
        totalEarned: 37500,
        status: 'Active',
        joinedDate: '12 Aug 2024'
      },
      {
        id: 'AGT-PIN-04',
        name: 'Gowtham Raj',
        phone: '+91 98940 88203',
        email: 'gowtham.pincode@gmail.com',
        jurisdiction: 'PIN: 636004 (Gugai)',
        assignedArea: 'Gugai Industrial Area',
        totalReferrals: 68,
        activeSubscribers: 49,
        walletBalance: 5100,
        totalEarned: 32000,
        status: 'Active',
        joinedDate: '25 Aug 2024'
      }
    ]
  }
};

export function StateAgents({ level = 'state' }) {
  const { isDark } = useTheme();
  const location = useLocation();

  // Determine active level from path if not passed explicitly
  let activeLevel = level;
  if (location.pathname.includes('/agents/district')) activeLevel = 'district';
  else if (location.pathname.includes('/agents/divisional')) activeLevel = 'divisional';
  else if (location.pathname.includes('/agents/pincode')) activeLevel = 'pincode';
  else if (location.pathname.includes('/agents/state') || location.pathname.endsWith('/agents')) activeLevel = 'state';

  const config = LEVEL_CONFIGS[activeLevel] || LEVEL_CONFIGS.state;
  const [agents, setAgents] = useState(config.defaultData);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getAgents();
      if (res.success && res.agents && res.agents.length > 0) {
        // Enhance or match with current level
        if (activeLevel === 'pincode') {
          setAgents(res.agents.map((a, i) => ({
            ...a,
            jurisdiction: `PIN: ${a.pincode || '636001'}`,
            assignedArea: a.division ? `${a.division} Zone` : 'Local Service Zone'
          })));
        } else if (activeLevel === 'divisional') {
          setAgents(res.agents.map((a, i) => ({
            ...a,
            jurisdiction: `${a.division || 'Salem North'} Division`,
            assignedArea: `Pincodes under ${a.district || 'Salem'}`
          })));
        } else if (activeLevel === 'district') {
          setAgents(res.agents.map((a, i) => ({
            ...a,
            jurisdiction: `${a.district || 'Salem'} District`,
            assignedArea: 'All Divisions in District'
          })));
        } else {
          setAgents(config.defaultData);
        }
      } else {
        setAgents(config.defaultData);
      }
    } catch (e) {
      console.error(e);
      setAgents(config.defaultData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeLevel]);

  // Compute KPI summaries
  const totalAgentsCount = agents.length;
  const totalReferralsSum = agents.reduce((acc, a) => acc + (a.totalReferrals || 0), 0);
  const totalEarnedSum = agents.reduce((acc, a) => acc + (a.totalEarned || 0), 0);
  const totalWalletSum = agents.reduce((acc, a) => acc + (a.walletBalance || 0), 0);

  const LevelIcon = config.icon;

  const columns = [
    {
      header: 'Agent Details',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
            <LevelIcon className="w-4 h-4" />
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
      header: 'Jurisdiction & Coverage',
      accessor: 'jurisdiction',
      render: (row) => (
        <div>
          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            {row.jurisdiction || 'Tamil Nadu'}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">
            {row.assignedArea || 'Assigned Zone'}
          </div>
        </div>
      )
    },
    {
      header: 'Phone / Contact',
      accessor: 'phone',
      render: (row) => (
        <span className="text-xs text-slate-700 dark:text-slate-300 font-mono flex items-center gap-1">
          <Phone className="w-3 h-3 text-slate-400" /> {row.phone}
        </span>
      )
    },
    {
      header: 'Referrals & Subscribers',
      accessor: 'totalReferrals',
      render: (row) => (
        <div>
          <div className="font-bold text-slate-900 dark:text-white text-xs">{row.totalReferrals} Referrals</div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">{row.activeSubscribers} Active Cards</div>
        </div>
      )
    },
    {
      header: 'Wallet Balance',
      accessor: 'walletBalance',
      render: (row) => (
        <span className="font-mono font-bold text-slate-900 dark:text-amber-300 text-xs">
          ₹{row.walletBalance?.toLocaleString()}
        </span>
      )
    },
    {
      header: 'Total Earned',
      accessor: 'totalEarned',
      render: (row) => (
        <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">
          ₹{row.totalEarned?.toLocaleString()}
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
      {/* Header & Hierarchy Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{config.title}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{config.subtitle}</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm self-start sm:self-auto">
          <span className="text-slate-400">Agents</span>
          <span className="text-slate-300 dark:text-slate-600">→</span>
          <span className="text-blue-600 dark:text-blue-400 font-bold">{config.breadcrumb}</span>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total {config.title}</span>
            <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">{totalAgentsCount}</div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">100% verified network</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Referrals</span>
            <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">{totalReferralsSum}</div>
          <div className="text-[10px] text-purple-600 dark:text-purple-400 font-medium mt-0.5">Customer enrollments</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Wallet Hold</span>
            <Wallet className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">₹{totalWalletSum.toLocaleString()}</div>
          <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium mt-0.5">Eligible for payout</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Disbursed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">₹{totalEarnedSum.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">Cumulative earnings</div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        title={config.tableTitle}
        subtitle={config.tableSubtitle}
        columns={columns}
        data={agents}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder={`Search ${config.title.toLowerCase()} by name, jurisdiction, or phone...`}
        exportFileName={config.exportFile}
      />
    </div>
  );
}
