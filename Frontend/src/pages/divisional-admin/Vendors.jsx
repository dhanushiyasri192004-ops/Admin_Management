import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { Modal } from '../../components/Modal';
import { Store, MapPin, Star, Plus, UserCheck } from 'lucide-react';

export function DivisionalVendors() {
  const { user } = useAuth();
  const divisionName = user?.division || 'Salem North';
  const districtName = user?.district || 'Salem';
  const [searchParams] = useSearchParams();
  const pincodeParam = searchParams.get('pincode');

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
    division: divisionName,
    pincode: pincodeParam || '636001',
    address: '',
    assignedAgentName: 'Thirunavukkarasu R'
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getVendors();
      if (res.success) {
        let list = res.vendors || [];
        if (divisionName) {
          const filtered = list.filter(
            v => (v.division || '')?.toLowerCase() === divisionName.toLowerCase()
          );
          if (filtered.length > 0) {
            list = filtered;
          }
        }
        if (pincodeParam) {
          list = list.filter(v => String(v.pincode) === String(pincodeParam));
        }
        setVendors(list);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [pincodeParam]);

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
      if (kycFilter && v.kycStatus?.toLowerCase() !== kycFilter.toLowerCase()) {
        return false;
      }

      if (categoryFilter) {
        const cat = (v.category || '').toLowerCase();
        const target = categoryFilter.toLowerCase();
        if (target === 'job' || target === 'jobs') {
          if (!cat.includes('job') && !cat.includes('work') && !cat.includes('recruitment')) return false;
        } else if (!cat.includes(target) && !target.includes(cat)) {
          return false;
        }
      }

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
            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">Contact: {row.contactPerson} &bull; {row.phone}</div>
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
          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{divisionName} Division</div>
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
      district: districtName,
      division: divisionName,
      pincode: onboardForm.pincode,
      address: onboardForm.address || `${divisionName} Division`,
      rating: 5.0,
      totalOrdersDelivered: 0,
      kycStatus: 'Pending',
      status: 'Active',
      pendingPayout: 0,
      assignedAgent: {
        id: onboardForm.assignedAgentName.includes('Naveen') ? 'AGT-703' : 'AGT-701',
        name: onboardForm.assignedAgentName,
        phone: onboardForm.assignedAgentName.includes('Naveen') ? '+91 98940 55103' : '+91 98940 55101'
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
      division: divisionName,
      pincode: pincodeParam || '636001',
      address: '',
      assignedAgentName: 'Thirunavukkarasu R'
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header with Title and "New Vendor Onboarding" Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Division Vendors Network</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Overview of certified merchant partners under {divisionName} division jurisdiction.</p>
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

      {/* 4 KPI Cards in a single row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {/* KPI 1: Total Vendors */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Vendors</span>
            <Store className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">{kpiStats.total}</div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
            Active in {divisionName}
          </div>
        </div>

        {/* KPI 2: Verified Stores */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">KYC Verified Shops</span>
            <div className="p-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
              ✓
            </div>
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">{kpiStats.verified}</div>
          <div className="text-[10px] text-blue-600 dark:text-blue-400 font-medium mt-0.5">
            Fully certified partners
          </div>
        </div>

        {/* KPI 3: Pending Approvals */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Pending Approvals</span>
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">{kpiStats.pendingKyc}</div>
          <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium mt-0.5">
            Documents awaiting review
          </div>
        </div>

        {/* KPI 4: Pending Clearance */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Pending Clearance</span>
            <div className="text-xs font-bold text-purple-600 dark:text-purple-400">₹</div>
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">
            ₹{kpiStats.pendingPayout.toLocaleString()}
          </div>
          <div className="text-[10px] text-purple-600 dark:text-purple-400 font-medium mt-0.5">
            Settlement pipeline
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <DataTable
        title="Division Vendors Roster"
        subtitle="Live merchant partners and commercial supply points"
        columns={columns}
        data={filteredVendors}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search vendor name, category..."
        exportFileName="divisional_vendors.csv"
      />

      {/* Onboarding Modal */}
      <Modal
        isOpen={showOnboardModal}
        onClose={() => setShowOnboardModal(false)}
        title="Onboard New Merchant Partner"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleOnboardSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Business Name *</label>
              <input
                type="text"
                required
                value={onboardForm.name}
                onChange={(e) => setOnboardForm({ ...onboardForm, name: e.target.value })}
                placeholder="e.g. Salem Tech Hub"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Contact Person *</label>
              <input
                type="text"
                required
                value={onboardForm.contactPerson}
                onChange={(e) => setOnboardForm({ ...onboardForm, contactPerson: e.target.value })}
                placeholder="e.g. Ramesh K"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={onboardForm.phone}
                onChange={(e) => setOnboardForm({ ...onboardForm, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
              <select
                value={onboardForm.category}
                onChange={(e) => setOnboardForm({ ...onboardForm, category: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Services">Services</option>
                <option value="Grocery">Grocery</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Jobs & Recruitment">Jobs & Recruitment</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Pincode Zone</label>
              <select
                value={onboardForm.pincode}
                onChange={(e) => setOnboardForm({ ...onboardForm, pincode: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
              >
                <option value="636001">636001 (Salem Town Fort)</option>
                <option value="636002">636002 (Shevapet & Market)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Assigned Field Agent</label>
              <select
                value={onboardForm.assignedAgentName}
                onChange={(e) => setOnboardForm({ ...onboardForm, assignedAgentName: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Thirunavukkarasu R">Thirunavukkarasu R (Salem Town)</option>
                <option value="Naveen Kumar M">Naveen Kumar M (Shevapet)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setShowOnboardModal(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition cursor-pointer"
            >
              Complete Onboarding
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
