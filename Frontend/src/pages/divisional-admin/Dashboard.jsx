import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  ShieldCheck,
  Users,
  CreditCard,
  Store,
  ShoppingBag,
  CalendarCheck,
  Briefcase,
  Truck,
  Wrench,
  UserCheck,
  Headphones,
  UserPlus,
  Clock,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export function DivisionalAdminDashboard() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const divisionName = user?.division || 'Salem North';
  const districtName = user?.district || 'Salem';

  // Stats for this division (Salem North covers 636001 and 636002)
  const stats = {
    totalPincodes: 2,
    totalPincodeAdmins: 2,
    totalCustomers: 4,
    totalMembershipCards: 3,
    totalVendors: 3,
    totalOrders: 4,
    totalBookings: 2,
    totalJobs: 2,
    totalDeliveryPartners: 4,
    totalTechnicians: 2,
    totalExecutives: 2,
    totalSupportTeam: 3,
    totalAgents: 2,
    pendingPayments: 1
  };

  const revenueData = [
    { week: 'Week 1', amount: 3200 },
    { week: 'Week 2', amount: 4100 },
    { week: 'Week 3', amount: 3900 },
    { week: 'Week 4', amount: 5103 },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Scope Banner */}
      <div className="admin-card p-5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {divisionName} Division Command Hub
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-cyan-950 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-800">
              Divisional Jurisdiction
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Supervising all operations, pincodes, and field staff within {divisionName}, {districtName} District.
          </p>
        </div>

        {/* Drill down Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 font-mono">
          <span className="text-blue-600 font-bold">Division</span>
          <span>&rarr;</span>
          <span>Pincodes</span>
          <span>&rarr;</span>
          <span>Customers / Vendors / Orders</span>
        </div>
      </div>

      {/* 14 Dashboard Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {/* 1. Total Pincodes */}
        <div
          onClick={() => navigate('/divisional-admin/pincodes')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Total Pincodes</span>
            <div className="p-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
              <MapPin className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{stats.totalPincodes}</div>
          <div className="text-[10px] text-indigo-600 font-bold mt-0.5">636001, 636002</div>
        </div>

        {/* 2. Total Pincode Admins */}
        <div
          onClick={() => navigate('/divisional-admin/pincode-admins')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Pincode Admins</span>
            <div className="p-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{stats.totalPincodeAdmins}</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-0.5">Assigned Officers</div>
        </div>

        {/* 3. Total Customers */}
        <div
          onClick={() => navigate('/divisional-admin/customers')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Total Customers</span>
            <div className="p-1 rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-600">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{stats.totalCustomers}</div>
          <div className="text-[10px] text-sky-600 font-bold mt-0.5">In Salem North</div>
        </div>

        {/* 4. Total Membership Cards */}
        <div
          onClick={() => navigate('/divisional-admin/membership-cards')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">Membership Cards</span>
            <div className="p-1 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600">
              <CreditCard className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{stats.totalMembershipCards}</div>
          <div className="text-[10px] text-amber-600 font-bold mt-0.5">Silver/Gold/Diamond</div>
        </div>

        {/* 5. Total Vendors */}
        <div
          onClick={() => navigate('/divisional-admin/vendors')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Total Vendors</span>
            <div className="p-1 rounded-lg bg-orange-50 dark:bg-orange-950 text-orange-600">
              <Store className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{stats.totalVendors}</div>
          <div className="text-[10px] text-orange-600 font-bold mt-0.5">Verified Stores</div>
        </div>

        {/* 6. Total Orders */}
        <div
          onClick={() => navigate('/divisional-admin/orders')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Total Orders</span>
            <div className="p-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{stats.totalOrders}</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-0.5">Division dispatches</div>
        </div>

        {/* 7. Total Bookings */}
        <div
          onClick={() => navigate('/divisional-admin/bookings')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Total Bookings</span>
            <div className="p-1 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600">
              <CalendarCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{stats.totalBookings}</div>
          <div className="text-[10px] text-purple-600 font-bold mt-0.5">Services booked</div>
        </div>

        {/* 8. Total Jobs */}
        <div
          onClick={() => navigate('/divisional-admin/jobs')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Total Jobs</span>
            <div className="p-1 rounded-lg bg-cyan-50 dark:bg-cyan-950 text-cyan-600">
              <Briefcase className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{stats.totalJobs}</div>
          <div className="text-[10px] text-cyan-600 font-bold mt-0.5">Field operations</div>
        </div>

        {/* 9. Total Delivery Partner */}
        <div
          onClick={() => navigate('/divisional-admin/delivery-partners')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">Delivery Partners</span>
            <div className="p-1 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-600">
              <Truck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{stats.totalDeliveryPartners}</div>
          <div className="text-[10px] text-rose-600 font-bold mt-0.5">Active couriers</div>
        </div>

        {/* 10. Total Technicians */}
        <div
          onClick={() => navigate('/divisional-admin/technicians')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Technicians</span>
            <div className="p-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600">
              <Wrench className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{stats.totalTechnicians}</div>
          <div className="text-[10px] text-blue-600 font-bold mt-0.5">Field engineers</div>
        </div>

        {/* 11. Total Executives */}
        <div
          onClick={() => navigate('/divisional-admin/executives')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Executives</span>
            <div className="p-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{stats.totalExecutives}</div>
          <div className="text-[10px] text-indigo-600 font-bold mt-0.5">Area officers</div>
        </div>

        {/* 12. Total Support Team */}
        <div
          onClick={() => navigate('/divisional-admin/support-team')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Support Team</span>
            <div className="p-1 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-600">
              <Headphones className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{stats.totalSupportTeam}</div>
          <div className="text-[10px] text-teal-600 font-bold mt-0.5">Desk agents</div>
        </div>

        {/* 13. Total Agents */}
        <div
          onClick={() => navigate('/divisional-admin/agents')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Total Agents</span>
            <div className="p-1 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600">
              <UserPlus className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{stats.totalAgents}</div>
          <div className="text-[10px] text-purple-600 font-bold mt-0.5">Sales partners</div>
        </div>

        {/* 14. Pending Payments */}
        <div
          onClick={() => navigate('/divisional-admin/payments')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-rose-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Pending Payments</span>
            <div className="p-1 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-600">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-rose-600 dark:text-rose-400 mt-1.5">{stats.pendingPayments}</div>
          <div className="text-[10px] text-rose-600 font-bold mt-0.5">Awaiting clearance</div>
        </div>
      </div>

      {/* Row 2: Charts & Assigned Pincodes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Weekly Revenue Inflow */}
        <div className="lg:col-span-7 admin-card p-5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Division Revenue Trend ({divisionName})
              </span>
              <p className="text-[11px] text-slate-500">Weekly revenue collections across assigned pincodes</p>
            </div>
            <span className="text-base font-black text-slate-900 dark:text-white">₹16,303</span>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="divRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v}`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#0f172a' : '#ffffff',
                    borderColor: isDark ? '#334155' : '#cbd5e1',
                    borderRadius: '10px',
                    fontSize: '11px',
                    color: isDark ? '#ffffff' : '#0f172a'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#divRevGrad)"
                  dot={{ r: 3.5, fill: '#2563eb', stroke: '#ffffff', strokeWidth: 1.5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Assigned Pincode Stations in Division */}
        <div className="lg:col-span-5 admin-card p-5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Supervised Pincodes in {divisionName}
              </h3>
              <p className="text-[11px] text-slate-500">Flow: Division &rarr; Pincode &rarr; Customers</p>
            </div>
            <button
              onClick={() => navigate('/divisional-admin/pincodes')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            <div
              onClick={() => navigate('/divisional-admin/customers')}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 cursor-pointer transition flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 font-mono font-bold text-xs">
                  636001
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Salem Town Fort</div>
                  <div className="text-[10px] text-slate-500">Officer: Priya Narayanan</div>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">1,420 Users</span>
            </div>

            <div
              onClick={() => navigate('/divisional-admin/customers')}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 cursor-pointer transition flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-mono font-bold text-xs">
                  636002
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Shevapet / Bazaar</div>
                  <div className="text-[10px] text-slate-500">Officer: Suresh Raina</div>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">1,120 Users</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
