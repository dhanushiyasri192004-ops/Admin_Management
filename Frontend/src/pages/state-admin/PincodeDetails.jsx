import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Users, Store, Building2, ShoppingBag } from 'lucide-react';

export function StatePincodeDetails() {
  const { user } = useAuth();

  const pincodes = [
    { pincode: '636001', area: 'Salem Town Fort', division: 'Salem North', district: 'Salem', admin: 'Priya Narayanan', customers: 1420, vendors: 2, status: 'Active' },
    { pincode: '636002', area: 'Shevapet & Market', division: 'Salem North', district: 'Salem', admin: 'Suresh Raina', customers: 980, vendors: 2, status: 'Active' },
    { pincode: '636003', area: 'Ammapet Colony', division: 'Salem South', district: 'Salem', admin: 'Venkatesh Babu', customers: 1150, vendors: 1, status: 'Active' },
    { pincode: '636004', area: 'Gugai Industrial Area', division: 'Salem South', district: 'Salem', admin: 'Meena Kumari', customers: 720, vendors: 1, status: 'Active' },
    { pincode: '641001', area: 'Town Hall & Big Bazaar', division: 'Coimbatore Central', district: 'Coimbatore', admin: 'Arun Kumar', customers: 2300, vendors: 3, status: 'Active' },
    { pincode: '641002', area: 'RS Puram & DB Road', division: 'Coimbatore Central', district: 'Coimbatore', admin: 'Deepa Rajan', customers: 1850, vendors: 2, status: 'Active' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">State Pincode Micro-Zone Details</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Hyperlocal granular breakdown and operational activity across all assigned pincodes in {user?.state || 'Tamil Nadu'}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pincodes.map((pin) => (
          <div
            key={pin.pincode}
            className="admin-card p-5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm space-y-3 rounded-2xl"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-mono font-bold text-slate-900 dark:text-white text-base">PIN: {pin.pincode}</h3>
                  <span className="text-[11px] text-slate-500">{pin.area}</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-900/50">
                {pin.status}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/50">
                <span className="text-slate-500 dark:text-slate-400">Division / District:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{pin.division} • {pin.district}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/50">
                <span className="text-slate-500 dark:text-slate-400">Pincode Admin:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{pin.admin}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/50">
                <span className="text-slate-500 dark:text-slate-400">Total Customers:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{pin.customers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/50">
                <span className="text-slate-500 dark:text-slate-400">Active Vendors:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{pin.vendors}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
