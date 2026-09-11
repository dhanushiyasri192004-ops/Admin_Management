import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { Modal } from '../../components/Modal';
import { Store, Star, Phone, Plus, MapPin, Tag, User, Mail } from 'lucide-react';

export function PincodeVendors() {
  const { user } = useAuth();
  const pincode = user?.pincode || '636001';

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [vendorForm, setVendorForm] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    category: 'Services',
    address: '',
    assignedAgentName: 'Thirunavukkarasu R'
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getVendors();
      if (res.success) setVendors(res.vendors || []);
    } catch (e) {
      console.error('Failed to load vendors:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddVendor = async (e) => {
    e.preventDefault();
    if (!vendorForm.name.trim() || !vendorForm.phone.trim()) return;

    setSubmitting(true);
    try {
      const payload = {
        ...vendorForm,
        pincode,
        district: user?.district || 'Salem',
        division: user?.division || 'Salem North',
        state: user?.state || 'Tamil Nadu'
      };

      const res = await dataService.createVendor(payload);
      if (res.success && res.vendor) {
        setVendors(prev => [res.vendor, ...prev]);
      } else {
        const fallbackVendor = {
          id: `VND-${Date.now().toString().slice(-3)}`,
          ...payload,
          rating: 5.0,
          totalOrdersDelivered: 0,
          kycStatus: 'Pending',
          status: 'Active',
          pendingPayout: 0
        };
        setVendors(prev => [fallbackVendor, ...prev]);
      }

      setShowAddModal(false);
      setVendorForm({
        name: '',
        contactPerson: '',
        phone: '',
        email: '',
        category: 'Services',
        address: '',
        assignedAgentName: 'Thirunavukkarasu R'
      });
    } catch (err) {
      console.error('Failed to create vendor:', err);
      // Client-side fallback so UI updates immediately
      const fallbackVendor = {
        id: `VND-${Date.now().toString().slice(-3)}`,
        ...vendorForm,
        pincode,
        district: user?.district || 'Salem',
        division: user?.division || 'Salem North',
        state: user?.state || 'Tamil Nadu',
        rating: 5.0,
        totalOrdersDelivered: 0,
        kycStatus: 'Pending',
        status: 'Active',
        pendingPayout: 0
      };
      setVendors(prev => [fallbackVendor, ...prev]);
      setShowAddModal(false);
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      header: 'Vendor Details',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-700/40 text-amber-600 dark:text-amber-400 shrink-0">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white text-sm">{row.name}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Person: {row.contactPerson || row.name}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
              <Phone className="w-3 h-3 text-slate-400" />
              {row.phone}
            </div>
          </div>
        </div>
      )
    },
    {
      header: 'Category & Address',
      accessor: 'category',
      render: (row) => (
        <div>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-300">{row.category}</span>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{row.address}</div>
        </div>
      )
    },
    {
      header: 'Rating & Deliveries',
      accessor: 'rating',
      render: (row) => (
        <div>
          <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-bold text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{row.rating || 5.0} / 5.0</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">{row.totalOrdersDelivered || 0} orders fulfilled</div>
        </div>
      )
    },
    {
      header: 'KYC Status',
      accessor: 'kycStatus',
      render: (row) => <StatusBadge status={row.kycStatus || 'Pending'} />
    },
    {
      header: 'Pending Payout',
      accessor: 'pendingPayout',
      render: (row) => <span className="font-bold text-slate-900 dark:text-slate-200">₹{(row.pendingPayout || 0).toLocaleString()}</span>
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header with Add Vendor Button in Top-Right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Pincode Vendors</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">All local verified merchant shops in your assigned Pincode.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Vendor</span>
        </button>
      </div>

      <DataTable
        title="Local Merchants Roster"
        subtitle="Restricted to assigned pincode"
        columns={columns}
        data={vendors}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search vendors..."
        exportFileName="pincode_vendors.csv"
      />

      {/* Add Vendor Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Pincode Vendor"
      >
        <form onSubmit={handleAddVendor} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Business / Shop Name *
              </label>
              <input
                type="text"
                required
                value={vendorForm.name}
                onChange={(e) => setVendorForm({ ...vendorForm, name: e.target.value })}
                placeholder="e.g. Salem Spares & Electricals"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Contact Person / Owner *
              </label>
              <input
                type="text"
                required
                value={vendorForm.contactPerson}
                onChange={(e) => setVendorForm({ ...vendorForm, contactPerson: e.target.value })}
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
                value={vendorForm.phone}
                onChange={(e) => setVendorForm({ ...vendorForm, phone: e.target.value })}
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
                value={vendorForm.email}
                onChange={(e) => setVendorForm({ ...vendorForm, email: e.target.value })}
                placeholder="vendor@company.com"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category *
              </label>
              <select
                value={vendorForm.category}
                onChange={(e) => setVendorForm({ ...vendorForm, category: e.target.value })}
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
                Assigned Pincode
              </label>
              <input
                type="text"
                readOnly
                value={pincode}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono font-bold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Shop / Office Street Address *
            </label>
            <input
              type="text"
              required
              value={vendorForm.address}
              onChange={(e) => setVendorForm({ ...vendorForm, address: e.target.value })}
              placeholder="e.g. 42, Bazaar Street, Fort"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer disabled:opacity-50"
            >
              {submitting ? 'Adding...' : 'Add Vendor'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
