import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Layers, MapPin, Users, Store, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function DistrictDivisionDetails() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const divisionCards = [
    {
      id: 'DIV-SLM-N',
      name: 'Salem North',
      admin: 'Karthik Subramanian',
      pincodes: ['636001', '636002'],
      totalCustomers: 3,
      totalVendors: 2,
      totalOrders: 2,
      status: 'Active'
    },
    {
      id: 'DIV-SLM-S',
      name: 'Salem South',
      admin: 'Venkatesh Rao',
      pincodes: ['636003', '636004'],
      totalCustomers: 2,
      totalVendors: 1,
      totalOrders: 1,
      status: 'Active'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Division Operational Details</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          In-depth structural breakdown of each division within {user?.district || 'Salem'} District.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {divisionCards.map((div) => (
          <div
            key={div.id}
            className="admin-card p-6 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">{div.name} Division</h3>
                  <span className="text-[11px] text-slate-500 font-mono">ID: {div.id}</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {div.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center py-2">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60">
                <div className="text-lg font-black text-slate-900 dark:text-white">{div.totalCustomers}</div>
                <div className="text-[10px] text-slate-500">Customers</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60">
                <div className="text-lg font-black text-slate-900 dark:text-white">{div.totalVendors}</div>
                <div className="text-[10px] text-slate-500">Vendors</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60">
                <div className="text-lg font-black text-slate-900 dark:text-white">{div.totalOrders}</div>
                <div className="text-[10px] text-slate-500">Orders</div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <div><strong>Division Admin:</strong> {div.admin}</div>
              <div>
                <strong>Covered Pincode Zones:</strong>
                <div className="flex gap-1.5 mt-1">
                  {div.pincodes.map(p => (
                    <span key={p} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold">
                      PIN: {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => navigate(`/district-admin/pincodes?division=${encodeURIComponent(div.name)}`)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-slate-700 transition"
              >
                <span>Explore Pincodes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
