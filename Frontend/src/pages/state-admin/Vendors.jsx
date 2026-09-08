import React, { useState, useEffect, useMemo } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { SearchBar } from '../../components/SearchBar';
import { StatusBadge } from '../../components/Badge';
import { Store, MapPin, Building, Star, CheckCircle2, Clock, IndianRupee, Filter, RefreshCw, Download, Layers } from 'lucide-react';

export function StateVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters requested by user
  const [kycFilter, setKycFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [payoutFilter, setPayoutFilter] = useState('');

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

  // Filtered vendors list based on all 4 active filters
  const filteredVendors = useMemo(() => {
    return vendors.filter(v => {
      // 1. KYC Status — All / Verified / Pending / Processing / Rejected
      if (kycFilter && v.kycStatus?.toLowerCase() !== kycFilter.toLowerCase()) {
        return false;
      }

      // 2. Vendor Category — Services, Product, Food, Stay, Travel, Daily Needs, Jobs
      if (categoryFilter) {
        const cat = (v.category || '').toLowerCase();
        const target = categoryFilter.toLowerCase();
        // Match standard category mappings or direct keyword
        if (target === 'services' && !cat.includes('service') && !cat.includes('electrical') && !cat.includes('hardware')) return false;
        if (target === 'product' && !cat.includes('product') && !cat.includes('industrial') && !cat.includes('tools')) return false;
        if (target === 'food' && !cat.includes('food') && !cat.includes('grocery') && !cat.includes('fmcg') && !cat.includes('restaurant')) return false;
        if (target === 'stay' && !cat.includes('stay') && !cat.includes('hotel') && !cat.includes('resort') && !cat.includes('lodge')) return false;
        if (target === 'travel' && !cat.includes('travel') && !cat.includes('transport') && !cat.includes('cab') && !cat.includes('tour')) return false;
        if (target === 'daily needs' && !cat.includes('daily') && !cat.includes('grocery') && !cat.includes('fmcg') && !cat.includes('furnishing') && !cat.includes('home')) return false;
        if (target === 'jobs' && !cat.includes('job') && !cat.includes('work') && !cat.includes('recruitment')) return false;
        if (!['services', 'product', 'food', 'stay', 'travel', 'daily needs', 'jobs'].includes(target)) {
          if (!cat.includes(target)) return false;
        }
      }

      // 3. Rating — 4★+, 3★+, Below 3★
      if (ratingFilter) {
        const r = Number(v.rating) || 0;
        if (ratingFilter === '4+' && r < 4.0) return false;
        if (ratingFilter === '3+' && (r < 3.0 || r >= 4.0)) return false;
        if (ratingFilter === 'below_3' && r >= 3.0) return false;
      }

      // 4. Payout Status — Paid / Pending
      if (payoutFilter) {
        const pendingAmt = Number(v.pendingPayout) || 0;
        if (payoutFilter === 'Pending' && pendingAmt <= 0) return false;
        if (payoutFilter === 'Paid' && pendingAmt > 0) return false;
      }

      return true;
    });
  }, [vendors, kycFilter, categoryFilter, ratingFilter, payoutFilter]);

  const columns = [
    {
      header: 'Vendor Business',
      accessor: 'name',
      className: 'w-[30%]',
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
      header: 'Location',
      accessor: 'pincode',
      className: 'w-[20%]',
      render: (row) => (
        <div>
          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{row.district}, {row.division}</div>
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
            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{row.totalOrdersDelivered} orders fulfilled</div>
          </div>
        );
      }
    },
    {
      header: 'KYC Status',
      accessor: 'kycStatus',
      className: 'w-[14%]',
      render: (row) => <StatusBadge status={row.kycStatus} />
    },
    {
      header: 'Pending Payout',
      accessor: 'pendingPayout',
      className: 'w-[14%]',
      render: (row) => (
        <span className="font-bold text-slate-900 dark:text-slate-200 text-xs">₹{row.pendingPayout?.toLocaleString()}</span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">State Vendors Network</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Overview of certified merchant partners under state jurisdiction.</p>
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
        exportFileName="state_vendors.csv"
        customHeader={({ search, setSearch, onRefresh, loading: refreshLoading, handleExportCSV, isDark }) => (
          <div className={`p-4 sm:p-5 border-b ${
            isDark ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-slate-50/50'
          } flex flex-nowrap items-center justify-between gap-2.5 transition-colors`}>
            {/* Left side: Search Bar + 4 Filter Dropdowns with equal spacing & padding */}
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
                  <option value="Stay" className={isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"}>
                    Stay
                  </option>
                  <option value="Travel" className={isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"}>
                    Travel
                  </option>
                  <option value="Daily Needs" className={isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"}>
                    Daily Needs
                  </option>
                  <option value="Jobs" className={isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"}>
                    Jobs
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

              {/* Filter 4: Payout Status */}
              <div className={`h-9 inline-flex items-center gap-2 ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              } border rounded-xl px-2.5 text-xs transition-colors shrink-0`}>
                <IndianRupee className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <select
                  value={payoutFilter}
                  onChange={(e) => setPayoutFilter(e.target.value)}
                  className={`bg-transparent border-none ${isDark ? 'text-slate-200' : 'text-slate-800'} text-xs focus:outline-none cursor-pointer pr-1 truncate`}
                  title="Filter by Payout Status"
                >
                  <option value="" className={isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"}>
                    Payout: All
                  </option>
                  <option value="Paid" className={isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"}>
                    Paid
                  </option>
                  <option value="Pending" className={isDark ? "bg-slate-900 text-slate-200" : "bg-white text-slate-800"}>
                    Pending
                  </option>
                </select>
              </div>

              {/* Reset button if any filter active */}
              {(kycFilter || categoryFilter || ratingFilter || payoutFilter) && (
                <button
                  type="button"
                  onClick={() => {
                    setKycFilter('');
                    setCategoryFilter('');
                    setRatingFilter('');
                    setPayoutFilter('');
                  }}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium px-2 shrink-0"
                >
                  Reset
                </button>
              )}
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
    </div>
  );
}
