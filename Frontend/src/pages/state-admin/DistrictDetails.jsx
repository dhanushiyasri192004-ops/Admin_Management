import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Building2, Layers, MapPin, Users, Store, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function StateDistrictDetails() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const districtsData = [
    {
      id: 'DST-SALEM',
      name: 'Salem',
      code: 'SLM',
      admin: 'Rajesh Sharma',
      divisions: ['Salem North', 'Salem South'],
      pincodesCount: 4,
      totalCustomers: 4270,
      totalVendors: 6,
      totalOrders: 18,
      status: 'Active'
    },
    {
      id: 'DST-CBE',
      name: 'Coimbatore',
      code: 'CBE',
      admin: 'Sundar Raman',
      divisions: ['Coimbatore Central', 'Coimbatore North'],
      pincodesCount: 4,
      totalCustomers: 7500,
      totalVendors: 9,
      totalOrders: 24,
      status: 'Active'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">State District Operational Details</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          In-depth structural breakdown and operational health metrics of each authorized district in {user?.state || 'Tamil Nadu'}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {districtsData.map((dst) => (
          <div
            key={dst.id}
            className="admin-card p-6 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm space-y-4 rounded-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">{dst.name} District</h3>
                  <span className="text-[11px] text-slate-500 font-mono">Code: {dst.code} • ID: {dst.id}</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-900/50">
                {dst.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 py-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 text-center">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Divisions</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">{dst.divisions.length}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 text-center">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Pincodes</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">{dst.pincodesCount}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 text-center">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Active Vendors</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">{dst.totalVendors}</div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/50">
                <span className="text-slate-500 dark:text-slate-400">Assigned Nodal Admin:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{dst.admin}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/50">
                <span className="text-slate-500 dark:text-slate-400">Total Consumer Base:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{dst.totalCustomers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/50">
                <span className="text-slate-500 dark:text-slate-400">Subordinate Divisions:</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{dst.divisions.join(', ')}</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => navigate(`/state-admin/divisions?district=${dst.name}`)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-400 dark:hover:bg-blue-900/60 transition"
              >
                <span>View Divisions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => navigate(`/state-admin/pincodes`)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition"
              >
                <span>View Pincodes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
