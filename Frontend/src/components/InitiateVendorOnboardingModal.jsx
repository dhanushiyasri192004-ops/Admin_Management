import React, { useState } from 'react';
import { Modal } from './Modal';
import { Store, MapPin, User, Phone, Layers, Building2, CheckCircle2 } from 'lucide-react';

export function InitiateVendorOnboardingModal({ isOpen, onClose, onSuccess, defaultPincode = '636001' }) {
  const [formData, setFormData] = useState({
    vendorName: '',
    category: 'Services',
    contactPerson: '',
    phone: '',
    address: '',
    pincode: defaultPincode,
    division: 'Salem North',
    district: 'Salem',
    notes: 'Ground vendor onboarding initiated by Pincode Agent'
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Auto adjust division & district based on pincode
      ...(name === 'pincode' && value === '636001' ? { division: 'Salem North', district: 'Salem' } : {}),
      ...(name === 'pincode' && value === '636002' ? { division: 'Salem North', district: 'Salem' } : {}),
      ...(name === 'pincode' && value === '636003' ? { division: 'Salem South', district: 'Salem' } : {}),
      ...(name === 'pincode' && value === '636004' ? { division: 'Salem South', district: 'Salem' } : {}),
      ...(name === 'pincode' && value === '641001' ? { division: 'Coimbatore Central', district: 'Coimbatore' } : {})
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.vendorName.trim()) {
      setError('Vendor business name is required');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      if (onSuccess) {
        await onSuccess(formData);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to submit onboarding');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Initiate Vendor Onboarding (Pincode Ground Agent)" maxWidth="max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Info banner explaining the activity flow */}
        <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-200">
          <div className="font-bold flex items-center gap-1.5">
            <Store className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Agent Activity Flow: Pincode Agent ➔ Divisional Agent ➔ District Agent ➔ State Agent
          </div>
          <p className="text-[11px] text-blue-700 dark:text-blue-300 mt-0.5">
            Submitting this onboarding creates an active activity record initiated by the local Pincode Agent and automatically escalates it to the Divisional Agent for cluster verification.
          </p>
        </div>

        {error && (
          <div className="p-2.5 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs font-semibold">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Vendor Business Name *
            </label>
            <input
              type="text"
              name="vendorName"
              placeholder="e.g. Balaji Hardware & Electricals"
              value={formData.vendorName}
              onChange={handleChange}
              required
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Vendor Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                <option value="Services">Services (Repairs / Trades)</option>
                <option value="Food">Food (Restaurants / Cafes)</option>
                <option value="Daily Needs">Daily Needs (Groceries / FMCG)</option>
                <option value="Stay">Stay (Hotels / Lodging)</option>
                <option value="Travel">Travel & Transportation</option>
                <option value="Product">Retail Products & Goods</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Contact Person Name
              </label>
              <input
                type="text"
                name="contactPerson"
                placeholder="Merchant Owner / Manager"
                value={formData.contactPerson}
                onChange={handleChange}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Merchant Phone Number
              </label>
              <input
                type="text"
                name="phone"
                placeholder="+91 94431 10000"
                value={formData.phone}
                onChange={handleChange}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Operating Pincode
              </label>
              <select
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
              >
                <option value="636001">636001 (Salem Fort / Naveen Kumar)</option>
                <option value="636002">636002 (Shevapet / Dinesh Karthik)</option>
                <option value="636003">636003 (Ammapet / Pravin Chandran)</option>
                <option value="636004">636004 (Gugai / Gowtham Raj)</option>
                <option value="641001">641001 (Gandhipuram / Kavin Selvan)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400">Assigned Division:</span>
              <div className="font-bold text-slate-900 dark:text-white">{formData.division}</div>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400">Assigned District:</span>
              <div className="font-bold text-slate-900 dark:text-white">{formData.district}</div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Shop / Commercial Address
            </label>
            <textarea
              name="address"
              rows={2}
              placeholder="Commercial unit number, street, landmark..."
              value={formData.address}
              onChange={handleChange}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit to Divisional Agent'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
