import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Layers, MapPin, Users, Store, ArrowRight, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function StateDivisionDetails() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const divisionCards = [
    {
      id: 'DIV-SLM-N',
      name: 'Salem North',
      district: 'Salem',
      admin: 'Karthik Subramanian',
      pincodes: ['636001', '636002'],
      totalCustomers: 2400,
      totalVendors: 4,
      totalOrders: 10,
      status: 'Active'
    },
    {
      id: 'DIV-SLM-S',
      name: 'Salem South',
      district: 'Salem',
      admin: 'Venkatesh Rao',
      pincodes: ['636003', '636004'],
      totalCustomers: 1870,
      totalVendors: 2,
      totalOrders: 8,
      status: 'Active'
    },
    {
      id: 'DIV-CBE-C',
      name: 'Coimbatore Central',
      district: 'Coimbatore',
      admin: 'Ramesh Krishnan',
      pincodes: ['641001', '641002'],
      totalCustomers: 4150,
      totalVendors: 5,
      totalOrders: 14,
      status: 'Active'
    },
    {
      id: 'DIV-CBE-N',
      name: 'Coimbatore North',
      district: 'Coimbatore',
      admin: 'Meera S',
      pincodes: ['641003', '641004'],
      totalCustomers: 3350,
      totalVendors: 4,
      totalOrders: 10,
      status: 'Active'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Division Operational Details</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          In-depth structural breakdown of each authorized division across {user?.state || 'Tamil Nadu'}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {divisionCards.map((div) => (
          <div
            key={div.id}
            className="admin-card p-6 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm space-y-4 rounded-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">{div.name} Division</h3>
                  <span className="text-[11px] text-slate-500 font-mono">ID: {div.id} • {div.district} District</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-900/50">
                {div.status}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/50">
                <span className="text-slate-500 dark:text-slate-400">Assigned Admin:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{div.admin}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/50">
                <span className="text-slate-500 dark:text-slate-400">Covered Pincodes:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{div.pincodes.join(', ')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/50">
                <span className="text-slate-500 dark:text-slate-400">Customers:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{div.totalCustomers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/50">
                <span className="text-slate-500 dark:text-slate-400">Vendors:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{div.totalVendors} Active</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate(`/state-admin/pincodes`)}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-400 dark:hover:bg-blue-900/60 transition"
              >
                <span>View Assigned Pincodes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
