import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { SearchBar } from '../../components/SearchBar';
import { StatusBadge } from '../../components/Badge';
import { Modal } from '../../components/Modal';
import { Store, MapPin, Star, CheckCircle2, Clock, IndianRupee, Filter, RefreshCw, Download, Layers, Plus, UserCheck } from 'lucide-react';

export function DistrictVendors() {
  const { user } = useAuth();
  const districtName = user?.district || 'Salem';

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [kycFilter, setKycFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  // Onboarding Modal State
  const [showOnboardModal, setShowOnboardModal] = useState(false);
  const [onboardForm, setOnboardForm] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    category: 'Services',
    district: districtName,
    division: 'Salem North',
    pincode: '636001',
    address: '',
    assignedAgentName: 'Thirunavukkarasu R'
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getVendors();
      if (res.success) setVendors(res.vendors);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute 4 KPI stats
  const kpiStats = useMemo(() => {
    const total = vendors.length;
    const verified = vendors.filter(v => v.kycStatus === 'Verified').length;
    const pendingKyc = vendors.filter(v => v.kycStatus === 'Pending' || v.kycStatus?.toLowerCase().includes('pending')).length;
    const pendingPayout = vendors.reduce((sum, v) => sum + (Number(v.pendingPayout) || 0), 0);

    return {
      total,
      verified,
      pendingKyc,
      pendingPayout
    };
  }, [vendors]);

  // Filtered vendors list based on active filters
  const filteredVendors = useMemo(() => {
    return vendors.filter(v => {
      // 1. KYC Status
      if (kycFilter && v.kycStatus?.toLowerCase() !== kycFilter.toLowerCase()) {
        return false;
      }

      // 2. Vendor Category
      if (categoryFilter) {
        const cat = (v.category || '').toLowerCase();
        const target = categoryFilter.toLowerCase();
        if (target === 'job' || target === 'jobs') {
          if (!cat.includes('job') && !cat.includes('work') && !cat.includes('recruitment')) return false;
        } else if (!cat.includes(target) && !target.includes(cat)) {
          return false;
        }
      }

      // 3. Rating
      if (ratingFilter) {
        const r = Number(v.rating) || 0;
        if (ratingFilter === '4+' && r < 4.0) return false;
        if (ratingFilter === '3+' && (r < 3.0 || r >= 4.0)) return false;
        if (ratingFilter === 'below_3' && r >= 3.0) return false;
      }

      return true;
    });
  }, [vendors, kycFilter, categoryFilter, ratingFilter]);

  const columns = [
    {
      header: 'Vendor Business',
      accessor: 'name',
      className: 'w-[26%]',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-700/40 text-amber-600 dark:text-amber-400 shrink-0">
            <Store className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-slate-900 dark:text-white text-xs truncate">{row.name}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">Contact: {row.contactPerson} • {row.phone}</div>
            <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">{row.category}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Assigned Agents',
      accessor: 'assignedAgent',
      className: 'w-[20%]',
      render: (row) => {
        const agentName = row.assignedAgent?.name || (row.pincode === '636002' ? 'Naveen Kumar M' : 'Thirunavukkarasu R');
        const agentPhone = row.assignedAgent?.phone || (row.pincode === '636002' ? '+91 98940 55103' : '+91 98940 55101');
        return (
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400 shrink-0">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-slate-800 dark:text-slate-200 text-xs truncate">
                {agentName}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {agentPhone}
              </div>
            </div>
          </div>
        );
      }
    },
    {
      header: 'Location',
      accessor: 'pincode',
      className: 'w-[18%]',
      render: (row) => (
        <div>
          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{row.district || districtName}, {row.division}</div>
          <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 shrink-0" /> PIN: {row.pincode}
          </div>
        </div>
      )
    },
    {
      header: 'Rating & Deliveries',
      accessor: 'rating',
      className: 'w-[22%]',
      render: (row) => {
        const isVerified = row.kycStatus === 'Verified';
        if (!isVerified) {
          return (
            <div>
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">—</span>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 italic">Not Available (Pending KYC)</div>
            </div>
          );
        }
        return (
          <div>
            <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-bold text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 shrink-0" />
              <span>{row.rating} / 5.0</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{row.totalOrdersDelivered || 245} orders fulfilled</div>
          </div>
        );
      }
    },
    {
      header: 'KYC Status',
      accessor: 'kycStatus',
      className: 'w-[14%]',
      render: (row) => <StatusBadge status={row.kycStatus} />
    }
  ];

  const handleOnboardSubmit = (e) => {
    e.preventDefault();
    if (!onboardForm.name || !onboardForm.contactPerson || !onboardForm.phone) {
      alert('Please fill in business name, contact person, and phone number.');
      return;
    }

    const newVendor = {
      id: `VND-00${vendors.length + 1}`,
      name: onboardForm.name,
      contactPerson: onboardForm.contactPerson,
      phone: onboardForm.phone,
      email: onboardForm.email || `${onboardForm.name.toLowerCase().replace(/[^a-z0-9]/g, '')}@vendor.com`,
      category: onboardForm.category,
      state: 'Tamil Nadu',
      district: onboardForm.district,
      division: onboardForm.division,
      pincode: onboardForm.pincode,
      address: onboardForm.address || `${onboardForm.district}, ${onboardForm.division}`,
      rating: 5.0,
      totalOrdersDelivered: 0,
      kycStatus: 'Pending',
      status: 'Active',
      pendingPayout: 0,
      assignedAgent: {
        id: onboardForm.assignedAgentName.includes('Jayachandran') ? 'AGT-702' : onboardForm.assignedAgentName.includes('Naveen') ? 'AGT-703' : 'AGT-701',
        name: onboardForm.assignedAgentName,
        phone: onboardForm.assignedAgentName.includes('Jayachandran') ? '+91 98940 55102' : onboardForm.assignedAgentName.includes('Naveen') ? '+91 98940 55103' : '+91 98940 55101'
      }
    };

    setVendors(prev => [newVendor, ...prev]);
    setShowOnboardModal(false);
    setOnboardForm({
      name: '',
      contactPerson: '',
      phone: '',
      email: '',
      category: 'Services',
      district: districtName,
      division: 'Salem North',
      pincode: '636001',
      address: '',
      assignedAgentName: 'Thirunavukkarasu R'
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header with Title and "New Vendor Onboarding" Button at Top-Right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">District Vendors Network</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Overview of certified merchant partners under {districtName} district jurisdiction.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowOnboardModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Vendor Onboarding</span>
        </button>
      </div>

      {/* 4 KPI Cards in a single row, equal size and consistent styling */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {/* KPI 1: Total Vendors */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Vendors</span>
            <Store className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">
            {kpiStats.total.toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
            100% active network
          </div>
        </div>

        {/* KPI 2: Verified Vendors */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Verified Vendors</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">
            {kpiStats.verified.toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
            Dashboard access enabled
          </div>
        </div>

        {/* KPI 3: Pending KYC */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Pending KYC</span>
            <Clock className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">
            {kpiStats.pendingKyc.toLocaleString()}
          </div>
          <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium mt-0.5">
            Awaiting verification
          </div>
        </div>

        {/* KPI 4: Pending Payout */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Pending Payout</span>
            <IndianRupee className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">
            ₹{kpiStats.pendingPayout.toLocaleString()}
          </div>
          <div className="text-[10px] text-purple-600 dark:text-purple-400 font-medium mt-0.5">
            Across active accounts
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredVendors}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search vendors by name or category..."
        exportFileName="district_vendors.csv"
        customHeader={({ search, setSearch, onRefresh, loading: refreshLoading, handleExportCSV, isDark }) => (
          <div className={`p-4 sm:p-5 border-b ${
            isDark ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-slate-50/50'
          } flex flex-nowrap items-center justify-between gap-2.5 transition-colors`}>
            {/* Left side: Search Bar + Filter Dropdowns */}
            <div className="flex flex-nowrap items-center gap-2.5 min-w-0 flex-1">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search vendors..."
                className="w-36 sm:w-44 shrink flex-1 max-w-[220px]"
              />

              {/* Filter 1: KYC Status */}
              <div className={`h-9 inline-flex items-center gap-2 ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              } border rounded-xl px-2.5 text-xs transition-colors shrink-0`}>
                <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <select
                  value={kycFilter}
                  onChange={(e) => setKycFilter(e.target.value)}
                  className={`bg-transparent border-none ${isDark ? 'text-slate-200' : 'text-slate-800'} text-xs focus:outline-none cursor-pointer pr-1 truncate`}
                  title="Filter by KYC Status"
                >
                  <option value="" className={isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"}>
                    KYC: All
                  </option>
                  <option value="Verified" className={isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"}>
                    Verified
                  </option>
                  <option value="Pending" className={isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"}>
                    Pending
                  </option>
                  <option value="Processing" className={isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"}>
                    Processing
                  </option>
                  <option value="Rejected" className={isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"}>
                    Rejected
                  </option>
                </select>
              </div>

              {/* Filter 2: Vendor Category */}
              <div className={`h-9 inline-flex items-center gap-2 ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              } border rounded-xl px-2.5 text-xs transition-colors shrink-0`}>
                <Layers className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className={`bg-transparent border-none ${isDark ? 'text-slate-200' : 'text-slate-800'} text-xs focus:outline-none cursor-pointer pr-1 max-w-[130px] truncate`}
                  title="Filter by Vendor Category"
                >
                  <option value="" className={isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"}>
                    Category: All
                  </option>
                  <option value="Services" className={isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"}>
                    Services
                  </option>
                  <option value="Product" className={isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"}>
                    Product
                  </option>
                  <option value="Food" className={isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"}>
                    Food
                  </option>
                  <option value="Daily Needs" className={isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"}>
                    Daily Needs
                  </option>
                  <option value="Stay" className={isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"}>
                    Stay
                  </option>
                  <option value="Travel" className={isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"}>
                    Travel
                  </option>
                  <option value="Job" className={isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"}>
                    Job
                  </option>
                </select>
              </div>

              {/* Filter 3: Rating */}
              <div className={`h-9 inline-flex items-center gap-2 ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              } border rounded-xl px-2.5 text-xs transition-colors shrink-0`}>
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400 shrink-0" />
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className={`bg-transparent border-none ${isDark ? 'text-slate-200' : 'text-slate-800'} text-xs focus:outline-none cursor-pointer pr-1 truncate`}
                  title="Filter by Rating"
                >
                  <option value="" className={isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"}>
                    Rating: All
                  </option>
                  <option value="4+" className={isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"}>
                    4★+
                  </option>
                  <option value="3+" className={isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"}>
                    3★+
                  </option>
                  <option value="below_3" className={isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"}>
                    Below 3★
                  </option>
                </select>
              </div>
            </div>

            {/* Right side: Refresh + Export CSV */}
            <div className="flex flex-nowrap items-center gap-2.5 shrink-0">
              {onRefresh && (
                <button
                  type="button"
                  onClick={onRefresh}
                  title="Refresh Data"
                  className={`h-9 w-9 inline-flex items-center justify-center shrink-0 ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                      : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                  } border rounded-xl transition cursor-pointer`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${refreshLoading ? 'animate-spin' : ''}`} />
                </button>
              )}

              <button
                type="button"
                onClick={handleExportCSV}
                title="Export to CSV"
                className={`h-9 inline-flex items-center gap-1.5 px-3.5 shrink-0 ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                    : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                } border rounded-xl text-xs font-semibold transition cursor-pointer`}
              >
                <Download className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">Export CSV</span>
              </button>
            </div>
          </div>
        )}
      />

      {/* New Vendor Onboarding Modal */}
      <Modal
        isOpen={showOnboardModal}
        onClose={() => setShowOnboardModal(false)}
        title="New Vendor Onboarding"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleOnboardSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Vendor Business Name *
              </label>
              <input
                type="text"
                required
                value={onboardForm.name}
                onChange={(e) => setOnboardForm({ ...onboardForm, name: e.target.value })}
                placeholder="e.g. Salem Tech Spares"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Contact Person *
              </label>
              <input
                type="text"
                required
                value={onboardForm.contactPerson}
                onChange={(e) => setOnboardForm({ ...onboardForm, contactPerson: e.target.value })}
                placeholder="e.g. Ramesh Kumar"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Phone Number *
              </label>
              <input
                type="text"
                required
                value={onboardForm.phone}
                onChange={(e) => setOnboardForm({ ...onboardForm, phone: e.target.value })}
                placeholder="+91 94431 10005"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={onboardForm.email}
                onChange={(e) => setOnboardForm({ ...onboardForm, email: e.target.value })}
                placeholder="vendor@company.com"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category *
              </label>
              <select
                value={onboardForm.category}
                onChange={(e) => setOnboardForm({ ...onboardForm, category: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Services">Services</option>
                <option value="Product">Product</option>
                <option value="Food">Food</option>
                <option value="Daily Needs">Daily Needs</option>
                <option value="Stay">Stay</option>
                <option value="Travel">Travel</option>
                <option value="Job">Job</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Assigned Agent *
              </label>
              <select
                value={onboardForm.assignedAgentName}
                onChange={(e) => setOnboardForm({ ...onboardForm, assignedAgentName: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Thirunavukkarasu R">Thirunavukkarasu R (AGT-701)</option>
                <option value="Jayachandran Mohan">Jayachandran Mohan (AGT-702)</option>
                <option value="Naveen Kumar M">Naveen Kumar M (AGT-703)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                District / Division
              </label>
              <input
                type="text"
                value={`${onboardForm.district}, ${onboardForm.division}`}
                readOnly
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Pincode
              </label>
              <input
                type="text"
                value={onboardForm.pincode}
                onChange={(e) => setOnboardForm({ ...onboardForm, pincode: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Shop / Office Street Address
            </label>
            <input
              type="text"
              value={onboardForm.address}
              onChange={(e) => setOnboardForm({ ...onboardForm, address: e.target.value })}
              placeholder="e.g. 55, Bazaar Main Road, Fort"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setShowOnboardModal(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer"
            >
              Complete Onboarding
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
