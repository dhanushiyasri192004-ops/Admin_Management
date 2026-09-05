import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Users, Store, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function DivisionalPincodeDetails() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const pincodesList = [
    {
      pincode: '636001',
      areaName: 'Salem Town Fort',
      admin: 'Priya Narayanan',
      customers: 1420,
      vendors: 2,
      orders: 2,
      activeJobs: 1,
      status: 'Fully Operational'
    },
    {
      pincode: '636002',
      areaName: 'Shevapet / Bazaar',
      admin: 'Suresh Raina',
      customers: 1120,
      vendors: 1,
      orders: 2,
      activeJobs: 1,
      status: 'Fully Operational'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Pincode Micro-Zone Details</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          In-depth structural breakdown of each pincode station under {user?.division || 'Salem North'} Division.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {pincodesList.map((pin) => (
          <div
            key={pin.pincode}
            className="admin-card p-6 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">PIN: {pin.pincode}</h3>
                  <span className="text-[11px] text-slate-500 font-medium">{pin.areaName}</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {pin.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center py-2">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60">
                <div className="text-lg font-black text-slate-900 dark:text-white">{pin.customers}</div>
                <div className="text-[10px] text-slate-500">Customers</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60">
                <div className="text-lg font-black text-slate-900 dark:text-white">{pin.vendors}</div>
                <div className="text-[10px] text-slate-500">Vendors</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60">
                <div className="text-lg font-black text-slate-900 dark:text-white">{pin.orders}</div>
                <div className="text-[10px] text-slate-500">Orders</div>
              </div>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <div><strong>Station Pincode Admin:</strong> {pin.admin}</div>
              <div><strong>Active Field Jobs:</strong> {pin.activeJobs} assigned</div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => navigate('/divisional-admin/customers')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-slate-700 transition"
              >
                <span>View Station Data</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
