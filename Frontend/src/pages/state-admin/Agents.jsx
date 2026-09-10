import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { useTheme } from '../../context/ThemeContext';
import { AgentHierarchyBanner } from '../../components/AgentHierarchyBanner';
import { AgentActivityFlowModal } from '../../components/AgentActivityFlowModal';
import { AgentDetailsModal } from '../../components/AgentDetailsModal';
import { InitiateVendorOnboardingModal } from '../../components/InitiateVendorOnboardingModal';
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
  Users,
  Store,
  ArrowRight,
  GitFork,
  Filter,
  RefreshCw,
  Plus,
  ShieldCheck,
  Clock,
  Eye
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
        level: 'state',
        role: 'State Agent',
        jurisdiction: 'Tamil Nadu (State-wide)',
        assignedArea: '38 Districts Coverage',
        supervisorName: 'Apex Governance',
        subordinatesCount: 3,
        totalReferrals: 420,
        activeSubscribers: 340,
        vendorOnboardings: 128,
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
        level: 'state',
        role: 'State Agent',
        jurisdiction: 'Tamil Nadu (North Zone)',
        assignedArea: '14 Districts Coverage',
        supervisorName: 'Apex Governance',
        subordinatesCount: 2,
        totalReferrals: 310,
        activeSubscribers: 245,
        vendorOnboardings: 94,
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
        level: 'state',
        role: 'State Agent',
        jurisdiction: 'Tamil Nadu (South Zone)',
        assignedArea: '16 Districts Coverage',
        supervisorName: 'Apex Governance',
        subordinatesCount: 2,
        totalReferrals: 285,
        activeSubscribers: 210,
        vendorOnboardings: 82,
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
        level: 'district',
        role: 'District Agent',
        district: 'Salem',
        jurisdiction: 'Salem District',
        assignedArea: 'Salem North & South Divisions',
        supervisorName: 'Thirunavukkarasu R (State Agent)',
        subordinatesCount: 2,
        totalReferrals: 195,
        activeSubscribers: 155,
        vendorOnboardings: 64,
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
        level: 'district',
        role: 'District Agent',
        district: 'Coimbatore',
        jurisdiction: 'Coimbatore District',
        assignedArea: 'Coimbatore North & Central Divisions',
        supervisorName: 'Thirunavukkarasu R (State Agent)',
        subordinatesCount: 2,
        totalReferrals: 230,
        activeSubscribers: 190,
        vendorOnboardings: 76,
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
        level: 'district',
        role: 'District Agent',
        district: 'Madurai',
        jurisdiction: 'Madurai District',
        assignedArea: 'Madurai Central & South Divisions',
        supervisorName: 'Senthil Nathan K (State Agent)',
        subordinatesCount: 1,
        totalReferrals: 175,
        activeSubscribers: 130,
        vendorOnboardings: 48,
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
        level: 'divisional',
        role: 'Divisional Agent',
        district: 'Salem',
        division: 'Salem North',
        jurisdiction: 'Salem North Division',
        assignedArea: 'PIN: 636001, 636002',
        supervisorName: 'Karthik Subramanian (District Agent)',
        subordinatesCount: 2,
        totalReferrals: 112,
        activeSubscribers: 88,
        vendorOnboardings: 38,
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
        level: 'divisional',
        role: 'Divisional Agent',
        district: 'Salem',
        division: 'Salem South',
        jurisdiction: 'Salem South Division',
        assignedArea: 'PIN: 636003, 636004',
        supervisorName: 'Karthik Subramanian (District Agent)',
        subordinatesCount: 2,
        totalReferrals: 98,
        activeSubscribers: 74,
        vendorOnboardings: 29,
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
        level: 'divisional',
        role: 'Divisional Agent',
        district: 'Coimbatore',
        division: 'Coimbatore Central',
        jurisdiction: 'Coimbatore Central Division',
        assignedArea: 'PIN: 641001, 641002',
        supervisorName: 'Venkatesh Babu (District Agent)',
        subordinatesCount: 2,
        totalReferrals: 135,
        activeSubscribers: 105,
        vendorOnboardings: 42,
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
        level: 'pincode',
        role: 'Pincode Agent',
        district: 'Salem',
        division: 'Salem North',
        pincode: '636001',
        jurisdiction: 'PIN: 636001 (Salem Fort)',
        assignedArea: 'Salem Town Fort Zone',
        supervisorName: 'Rajendran P (Divisional Agent)',
        subordinatesCount: 0,
        totalReferrals: 94,
        activeSubscribers: 72,
        vendorOnboardings: 21,
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
        level: 'pincode',
        role: 'Pincode Agent',
        district: 'Salem',
        division: 'Salem North',
        pincode: '636002',
        jurisdiction: 'PIN: 636002 (Shevapet)',
        assignedArea: 'Shevapet & Market Area',
        supervisorName: 'Rajendran P (Divisional Agent)',
        subordinatesCount: 0,
        totalReferrals: 82,
        activeSubscribers: 61,
        vendorOnboardings: 17,
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
        level: 'pincode',
        role: 'Pincode Agent',
        district: 'Salem',
        division: 'Salem South',
        pincode: '636003',
        jurisdiction: 'PIN: 636003 (Ammapet)',
        assignedArea: 'Ammapet Colony Hub',
        supervisorName: 'Anand Kumar V (Divisional Agent)',
        subordinatesCount: 0,
        totalReferrals: 76,
        activeSubscribers: 58,
        vendorOnboardings: 15,
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
        level: 'pincode',
        role: 'Pincode Agent',
        district: 'Salem',
        division: 'Salem South',
        pincode: '636004',
        jurisdiction: 'PIN: 636004 (Gugai)',
        assignedArea: 'Gugai Industrial Area',
        supervisorName: 'Anand Kumar V (Divisional Agent)',
        subordinatesCount: 0,
        totalReferrals: 68,
        activeSubscribers: 49,
        vendorOnboardings: 14,
        walletBalance: 5100,
        totalEarned: 32000,
        status: 'Active',
        joinedDate: '25 Aug 2024'
      },
      {
        id: 'AGT-PIN-05',
        name: 'Kavin Selvan',
        phone: '+91 98940 88204',
        email: 'kavin.cbe@gmail.com',
        level: 'pincode',
        role: 'Pincode Agent',
        district: 'Coimbatore',
        division: 'Coimbatore Central',
        pincode: '641001',
        jurisdiction: 'PIN: 641001 (Gandhipuram)',
        assignedArea: 'Gandhipuram Commercial Hub',
        supervisorName: 'Saravanan M (Divisional Agent)',
        subordinatesCount: 0,
        totalReferrals: 89,
        activeSubscribers: 67,
        vendorOnboardings: 19,
        walletBalance: 7800,
        totalEarned: 44000,
        status: 'Active',
        joinedDate: '02 Sep 2024'
      }
    ]
  }
};

export function StateAgents({ level = 'state' }) {
  const { isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active level from URL pathname
  let activeLevel = level;
  if (location.pathname.includes('/agents/district')) activeLevel = 'district';
  else if (location.pathname.includes('/agents/divisional')) activeLevel = 'divisional';
  else if (location.pathname.includes('/agents/pincode')) activeLevel = 'pincode';
  else if (location.pathname.includes('/agents/state') || location.pathname.endsWith('/agents')) activeLevel = 'state';

  const config = LEVEL_CONFIGS[activeLevel] || LEVEL_CONFIGS.state;

  // View tabs: 'roster' | 'activities' | 'tree'
  const [activeTab, setActiveTab] = useState('roster');

  const [agents, setAgents] = useState(config.defaultData);
  const [activities, setActivities] = useState([]);
  const [hierarchyData, setHierarchyData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters for activities
  const [stageFilter, setStageFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');

  // Modals state
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showOnboardModal, setShowOnboardModal] = useState(false);

  // Fetch agents, activities, and hierarchy
  const loadData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Agents for active level
      const res = await dataService.getAgents({ level: activeLevel });
      if (res.success && res.agents && res.agents.length > 0) {
        setAgents(res.agents);
      } else {
        setAgents(config.defaultData);
      }

      // 2. Fetch Activities matching visibility rules
      const actRes = await dataService.getAgentActivities();
      if (actRes.success && actRes.activities) {
        setActivities(actRes.activities);
      }

      // 3. Fetch Hierarchy Tree
      const hierRes = await dataService.getAgentHierarchy();
      if (hierRes.success && hierRes.tree) {
        setHierarchyData(hierRes.tree);
      }
    } catch (e) {
      console.error('Failed to load agent hierarchy data:', e);
      setAgents(config.defaultData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeLevel]);

  // Handle advancing an activity through the hierarchy
  const handleAdvanceActivity = async (id, notes) => {
    try {
      const res = await dataService.advanceAgentActivity(id, { notes });
      if (res.success) {
        setSelectedActivity(res.activity);
        // Refresh list
        loadData();
      }
    } catch (err) {
      console.error('Failed to advance activity:', err);
    }
  };

  // Handle creating new vendor onboarding activity
  const handleCreateOnboarding = async (formData) => {
    const res = await dataService.createAgentActivity(formData);
    if (res.success) {
      loadData();
      setActiveTab('activities');
    }
  };

  // KPI Calculations
  const totalAgentsCount = agents.length;
  const totalReferralsSum = agents.reduce((acc, a) => acc + (a.totalReferrals || 0), 0);
  const totalOnboardingsSum = agents.reduce((acc, a) => acc + (a.vendorOnboardings || 0), 0);
  const totalWalletSum = agents.reduce((acc, a) => acc + (a.walletBalance || 0), 0);
  const totalEarnedSum = agents.reduce((acc, a) => acc + (a.totalEarned || 0), 0);

  const LevelIcon = config.icon;

  // Filtered activities based on current level & user selections
  const filteredActivities = useMemo(() => {
    return activities.filter(act => {
      // Scoping by level view
      if (activeLevel === 'pincode') {
        // Pincode level focus
      } else if (activeLevel === 'divisional' && districtFilter) {
        if (act.division?.toLowerCase() !== districtFilter.toLowerCase()) return false;
      } else if (activeLevel === 'district' && districtFilter) {
        if (act.district?.toLowerCase() !== districtFilter.toLowerCase()) return false;
      }

      if (stageFilter && act.currentStage?.toLowerCase() !== stageFilter.toLowerCase() && act.status?.toLowerCase() !== stageFilter.toLowerCase()) {
        return false;
      }
      return true;
    });
  }, [activities, activeLevel, stageFilter, districtFilter]);

  // Columns for Agent Roster Table
  const rosterColumns = [
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
      header: 'Hierarchy Supervisor',
      accessor: 'supervisorName',
      render: (row) => (
        <div className="text-xs">
          <div className="font-semibold text-slate-700 dark:text-slate-300">
            {row.supervisorName || 'Apex Governance'}
          </div>
          {row.subordinatesCount > 0 && (
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
              Supervises {row.subordinatesCount} lower agents
            </div>
          )}
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
      header: 'Referrals & Onboardings',
      accessor: 'totalReferrals',
      render: (row) => (
        <div>
          <div className="font-bold text-slate-900 dark:text-white text-xs">
            {row.totalReferrals || 0} Referrals
          </div>
          <div className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
            {row.vendorOnboardings || 0} Vendors Onboarded
          </div>
        </div>
      )
    },
    {
      header: 'Wallet Balance',
      accessor: 'walletBalance',
      render: (row) => (
        <span className="font-mono font-bold text-slate-900 dark:text-amber-300 text-xs">
          ₹{(row.walletBalance || 0).toLocaleString()}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status || 'Active'} />
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (row) => (
        <button
          type="button"
          onClick={() => setSelectedAgent(row)}
          className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Eye className="w-3 h-3" /> Profile
        </button>
      )
    }
  ];

  // Columns for Activity & Vendor Onboarding Flow Table
  const activityColumns = [
    {
      header: 'Activity ID & Details',
      accessor: 'title',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50">
            <Store className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white text-xs">
              {row.title}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              {row.id} • Initiated: {row.createdDate}
            </div>
          </div>
        </div>
      )
    },
    {
      header: '1. Pincode Agent (Ground)',
      accessor: 'pincodeAgent',
      render: (row) => (
        <div>
          <div className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1">
            <MapPin className="w-3 h-3 text-amber-500" />
            {row.pincodeAgent?.name || 'Pincode Agent'}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            PIN: {row.pincode}
          </div>
        </div>
      )
    },
    {
      header: '2. Division Cluster',
      accessor: 'division',
      render: (row) => (
        <div>
          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            {row.divisionalAgent?.name || 'Divisional Agent'}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
            {row.division}
          </div>
        </div>
      )
    },
    {
      header: '3. District Oversight',
      accessor: 'district',
      render: (row) => (
        <div>
          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            {row.districtAgent?.name || 'District Agent'}
          </div>
          <div className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
            {row.district} District
          </div>
        </div>
      )
    },
    {
      header: 'Current Stage & Status',
      accessor: 'status',
      render: (row) => (
        <div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            row.status === 'State Approved'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-300'
              : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/80 dark:text-amber-300 animate-pulse'
          }`}>
            {row.status}
          </span>
          <div className="text-[10px] text-slate-500 mt-1 font-mono">
            Tier: {row.currentStage}
          </div>
        </div>
      )
    },
    {
      header: 'Action',
      accessor: 'actions',
      render: (row) => (
        <button
          type="button"
          onClick={() => setSelectedActivity(row)}
          className="px-2.5 py-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-all flex items-center gap-1 cursor-pointer"
        >
          <span>Audit Flow</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{config.title}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{config.subtitle}</p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setShowOnboardModal(true)}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Initiate Vendor Onboarding</span>
          </button>

          <button
            type="button"
            onClick={loadData}
            title="Refresh Data"
            className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4-Tier Agent Hierarchy & Activity Flow Banner */}
      <AgentHierarchyBanner activeLevel={activeLevel} />

      {/* Top Metric Summary Cards */}
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
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Vendor Onboardings</span>
            <Store className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">{totalOnboardingsSum}</div>
          <div className="text-[10px] text-purple-600 dark:text-purple-400 font-medium mt-0.5">Ground merchant sign-ups</div>
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

      {/* Mode View Tabs: Roster | Activity Flow | Hierarchy Map */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('roster')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'roster'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Agent Network Roster ({agents.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('activities')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'activities'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Store className="w-3.5 h-3.5" />
          <span>Activity & Vendor Onboarding Flow ({activities.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tree')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'tree'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <GitFork className="w-3.5 h-3.5" />
          <span>Hierarchy Tree Map</span>
        </button>
      </div>

      {/* TAB 1: AGENT NETWORK ROSTER */}
      {activeTab === 'roster' && (
        <DataTable
          title={config.tableTitle}
          subtitle={config.tableSubtitle}
          columns={rosterColumns}
          data={agents}
          loading={loading}
          onRefresh={loadData}
          searchPlaceholder={`Search ${config.title.toLowerCase()} by name, jurisdiction, or phone...`}
          exportFileName={config.exportFile}
        />
      )}

      {/* TAB 2: ACTIVITY & VENDOR ONBOARDING FLOW */}
      {activeTab === 'activities' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-blue-500" /> Filter Flow:
              </span>

              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                <option value="">All Flow Stages</option>
                <option value="Divisional Agent">Divisional Review Stage</option>
                <option value="District Agent">District Review Stage</option>
                <option value="State Agent">State Approved / Active</option>
              </select>

              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                <option value="">All Districts</option>
                <option value="Salem">Salem District</option>
                <option value="Coimbatore">Coimbatore District</option>
              </select>
            </div>

            <div className="text-[11px] text-slate-500">
              Showing <span className="font-bold text-slate-900 dark:text-white">{filteredActivities.length}</span> activities moving up hierarchy
            </div>
          </div>

          <DataTable
            title="Upward Activity & Vendor Onboarding Ledger"
            subtitle="Real-time pipeline: Pincode Agent ➔ Vendor Onboarding ➔ Divisional Agent ➔ District Agent ➔ State Agent"
            columns={activityColumns}
            data={filteredActivities}
            loading={loading}
            onRefresh={loadData}
            searchPlaceholder="Search by vendor business, activity ID, or pincode agent..."
            exportFileName="agent_activities_flow.csv"
          />
        </div>
      )}

      {/* TAB 3: HIERARCHY ORGANIZATION TREE */}
      {activeTab === 'tree' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GitFork className="w-4 h-4 text-blue-500" />
              Organizational Tree: State → District → Division → Pincode
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live structural hierarchy mapping supervisory reporting and jurisdiction boundaries across Tamil Nadu.
            </p>
          </div>

          {/* Root: State Agent Level */}
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border-2 border-purple-200 dark:border-purple-800/60 max-w-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-purple-600 text-white font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                      Tier 1 • State Agent (Apex)
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Thirunavukkarasu R</h4>
                    <div className="text-[11px] text-slate-500 font-mono">Tamil Nadu Statewide Governance • 38 Districts</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-purple-700 dark:text-purple-300 bg-white dark:bg-purple-900/60 px-2.5 py-1 rounded-full border border-purple-200 dark:border-purple-700">
                  Complete Visibility
                </span>
              </div>
            </div>

            {/* Branching to District Level */}
            <div className="pl-6 border-l-2 border-dashed border-purple-300 dark:border-purple-800 ml-4 space-y-6">
              {/* Salem District Node */}
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 max-w-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <div>
                        <span className="text-[10px] font-bold uppercase text-blue-700 dark:text-blue-300">
                          Tier 2 • District Agent
                        </span>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          Karthik Subramanian (Salem District)
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                      Supervises 2 Divisions
                    </span>
                  </div>
                </div>

                {/* Branching to Salem North & Salem South Divisions */}
                <div className="pl-6 border-l-2 border-dashed border-blue-300 dark:border-blue-800 ml-4 space-y-4">
                  {/* Division 1: Salem North */}
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 max-w-md">
                      <div className="flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <div>
                          <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-300">
                            Tier 3 • Divisional Agent
                          </span>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">
                            Rajendran P (Salem North Division)
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pincode Agents under Salem North */}
                    <div className="pl-6 border-l-2 border-dashed border-emerald-300 dark:border-emerald-800 ml-3 grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md">
                      <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-amber-600" />
                          <span className="text-xs font-bold text-slate-900 dark:text-white">Naveen Kumar M</span>
                        </div>
                        <div className="text-[10px] text-amber-700 dark:text-amber-300 font-mono mt-0.5">PIN: 636001 (Salem Fort)</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">21 Vendors Onboarded</div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-amber-600" />
                          <span className="text-xs font-bold text-slate-900 dark:text-white">Dinesh Karthik R</span>
                        </div>
                        <div className="text-[10px] text-amber-700 dark:text-amber-300 font-mono mt-0.5">PIN: 636002 (Shevapet)</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">17 Vendors Onboarded</div>
                      </div>
                    </div>
                  </div>

                  {/* Division 2: Salem South */}
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 max-w-md">
                      <div className="flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <div>
                          <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-300">
                            Tier 3 • Divisional Agent
                          </span>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">
                            Anand Kumar V (Salem South Division)
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pincode Agents under Salem South */}
                    <div className="pl-6 border-l-2 border-dashed border-emerald-300 dark:border-emerald-800 ml-3 grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md">
                      <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-amber-600" />
                          <span className="text-xs font-bold text-slate-900 dark:text-white">Pravin Chandran</span>
                        </div>
                        <div className="text-[10px] text-amber-700 dark:text-amber-300 font-mono mt-0.5">PIN: 636003 (Ammapet)</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">15 Vendors Onboarded</div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-amber-600" />
                          <span className="text-xs font-bold text-slate-900 dark:text-white">Gowtham Raj</span>
                        </div>
                        <div className="text-[10px] text-amber-700 dark:text-amber-300 font-mono mt-0.5">PIN: 636004 (Gugai)</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">14 Vendors Onboarded</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coimbatore District Node */}
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 max-w-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <div>
                        <span className="text-[10px] font-bold uppercase text-blue-700 dark:text-blue-300">
                          Tier 2 • District Agent
                        </span>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          Venkatesh Babu (Coimbatore District)
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                      Supervises Central Division
                    </span>
                  </div>
                </div>

                <div className="pl-6 border-l-2 border-dashed border-blue-300 dark:border-blue-800 ml-4 space-y-3">
                  <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 max-w-md">
                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <div>
                        <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-300">
                          Tier 3 • Divisional Agent
                        </span>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          Saravanan M (Coimbatore Central)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pl-6 border-l-2 border-dashed border-emerald-300 dark:border-emerald-800 ml-3 max-w-xs">
                    <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-amber-600" />
                        <span className="text-xs font-bold text-slate-900 dark:text-white">Kavin Selvan</span>
                      </div>
                      <div className="text-[10px] text-amber-700 dark:text-amber-300 font-mono mt-0.5">PIN: 641001 (Gandhipuram)</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">19 Vendors Onboarded</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <AgentActivityFlowModal
        isOpen={Boolean(selectedActivity)}
        onClose={() => setSelectedActivity(null)}
        activity={selectedActivity}
        onAdvance={handleAdvanceActivity}
      />

      <AgentDetailsModal
        isOpen={Boolean(selectedAgent)}
        onClose={() => setSelectedAgent(null)}
        agent={selectedAgent}
      />

      <InitiateVendorOnboardingModal
        isOpen={showOnboardModal}
        onClose={() => setShowOnboardModal(false)}
        onSuccess={handleCreateOnboarding}
      />
    </div>
  );
}
