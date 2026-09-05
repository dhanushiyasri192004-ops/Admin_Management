import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  CreditCard,
  Store,
  Clock,
  ShoppingBag,
  CalendarCheck,
  Briefcase,
  Truck,
  Wrench,
  UserCheck,
  Headphones,
  UserPlus,
  IndianRupee,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { MembershipCardVisual } from '../../components/MembershipCardVisual';

export function PincodeAdminDashboard() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const pincode = user?.pincode || '636001';
  const areaName = user?.areaName || 'Salem Town Fort';
  const districtName = user?.district || 'Salem';

  // Scoped metrics strictly for this pincode (e.g. 636001)
  const stats = {
    totalCustomers: 3,
    membershipCardCustomers: 3,
    totalVendors: 2,
    pendingVendorPayments: 1,
    totalOrders: 2,
    totalBookings: 2,
    totalJobs: 1,
    totalDeliveryPartners: 2,
    totalTechnicians: 1,
    totalExecutives: 1,
    totalSupportTeam: 2,
    totalAgents: 1,
    pendingAgentPayments: 1
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Scope Banner */}
      <div className="admin-card p-5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Pincode {pincode} Control Station
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Micro Pincode Scope
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Zone: <strong className="text-slate-800 dark:text-slate-200">{areaName}</strong>, {districtName} District. Strictly isolated to Pincode {pincode} data.
          </p>
        </div>

        {/* Isolation Badge */}
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 font-mono">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          <span>PIN: {pincode} (Dedicated Admin)</span>
        </div>
      </div>

      {/* 13 Top Cards Grid (Exact 13 Requested by User) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {/* 1. Total Customers */}
        <div
          onClick={() => navigate('/pincode-admin/customers')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Total Customers</span>
            <div className="p-1 rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-600">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{stats.totalCustomers}</div>
          <div className="text-[10px] text-sky-600 font-bold mt-0.5">In PIN {pincode}</div>
        </div>

        {/* 2. Membership Card Customers */}
        <div
          onClick={() => navigate('/pincode-admin/membership-cards')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">Card Customers</span>
            <div className="p-1 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600">
              <CreditCard className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{stats.membershipCardCustomers}</div>
          <div className="text-[10px] text-amber-600 font-bold mt-0.5">Active Subscribers</div>
        </div>

        {/* 3. Total Vendors */}
        <div
          onClick={() => navigate('/pincode-admin/vendors')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Total Vendors</span>
            <div className="p-1 rounded-lg bg-orange-50 dark:bg-orange-950 text-orange-600">
              <Store className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{stats.totalVendors}</div>
          <div className="text-[10px] text-orange-600 font-bold mt-0.5">Local Merchant Shops</div>
        </div>

        {/* 4. Pending Vendor Payments */}
        <div
          onClick={() => navigate('/pincode-admin/vendor-payments')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-rose-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">Pending Vendor Pay</span>
            <div className="p-1 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-600">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-rose-600 dark:text-rose-400 mt-1.5">{stats.pendingVendorPayments}</div>
          <div className="text-[10px] text-rose-600 font-bold mt-0.5">Claims to clear</div>
        </div>

        {/* 5. Total Orders */}
        <div
          onClick={() => navigate('/pincode-admin/orders')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Total Orders</span>
            <div className="p-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{stats.totalOrders}</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-0.5">Pincode dispatches</div>
        </div>

        {/* 6. Total Bookings */}
        <div
          onClick={() => navigate('/pincode-admin/bookings')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Total Bookings</span>
            <div className="p-1 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600">
              <CalendarCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{stats.totalBookings}</div>
          <div className="text-[10px] text-purple-600 font-bold mt-0.5">Service bookings</div>
        </div>

        {/* 7. Total Jobs */}
        <div
          onClick={() => navigate('/pincode-admin/jobs')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Total Jobs</span>
            <div className="p-1 rounded-lg bg-cyan-50 dark:bg-cyan-950 text-cyan-600">
              <Briefcase className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{stats.totalJobs}</div>
          <div className="text-[10px] text-cyan-600 font-bold mt-0.5">Field tickets</div>
        </div>

        {/* 8. Total Delivery Partners */}
        <div
          onClick={() => navigate('/pincode-admin/delivery-partners')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">Delivery Partners</span>
            <div className="p-1 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-600">
              <Truck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{stats.totalDeliveryPartners}</div>
          <div className="text-[10px] text-rose-600 font-bold mt-0.5">Assigned couriers</div>
        </div>

        {/* 9. Total Technicians */}
        <div
          onClick={() => navigate('/pincode-admin/technicians')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Technicians</span>
            <div className="p-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600">
              <Wrench className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{stats.totalTechnicians}</div>
          <div className="text-[10px] text-blue-600 font-bold mt-0.5">Local engineers</div>
        </div>

        {/* 10. Total Executives */}
        <div
          onClick={() => navigate('/pincode-admin/executives')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Executives</span>
            <div className="p-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{stats.totalExecutives}</div>
          <div className="text-[10px] text-indigo-600 font-bold mt-0.5">Pincode coordinators</div>
        </div>

        {/* 11. Total Support Team */}
        <div
          onClick={() => navigate('/pincode-admin/support-team')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Support Team</span>
            <div className="p-1 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-600">
              <Headphones className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{stats.totalSupportTeam}</div>
          <div className="text-[10px] text-teal-600 font-bold mt-0.5">Active tickets</div>
        </div>

        {/* 12. Total Agents */}
        <div
          onClick={() => navigate('/pincode-admin/agents')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-blue-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Total Agents</span>
            <div className="p-1 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600">
              <UserPlus className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{stats.totalAgents}</div>
          <div className="text-[10px] text-purple-600 font-bold mt-0.5">Onboarding partners</div>
        </div>

        {/* 13. Pending Agent Payments */}
        <div
          onClick={() => navigate('/pincode-admin/agent-payments')}
          className="admin-card p-3.5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm hover:border-amber-300 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">Agent Pending Pay</span>
            <div className="p-1 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600">
              <IndianRupee className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-black text-amber-600 dark:text-amber-400 mt-1.5">₹14,500</div>
          <div className="text-[10px] text-amber-600 font-bold mt-0.5">Commission claim</div>
        </div>
      </div>

      {/* Row 2: Membership Card Visual and Station Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 admin-card p-5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Pincode {pincode} Membership Cardholders
              </h3>
              <p className="text-xs text-slate-500">Distribution of Silver, Gold, and Diamond privilege members</p>
            </div>
            <button
              onClick={() => navigate('/pincode-admin/membership-cards')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View All Cards</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <div className="text-xs font-bold text-slate-600 dark:text-slate-300">Silver Advantage</div>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-1">1</div>
              <div className="text-[10px] text-slate-500 mt-0.5">5% Discount perk</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400">Gold Privilege</div>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-1">1</div>
              <div className="text-[10px] text-slate-500 mt-0.5">12% Discount perk</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400">Diamond VIP Elite</div>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-1">1</div>
              <div className="text-[10px] text-slate-500 mt-0.5">20% Discount perk</div>
            </div>
          </div>
        </div>

        {/* Local Merchant Vendors summary */}
        <div className="lg:col-span-4 admin-card p-5 bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">
              Local Stores in PIN {pincode}
            </h3>
            <p className="text-[11px] text-slate-500">Fast dispatch partners in {areaName}</p>

            <div className="space-y-2 mt-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Sri Murugan Provisions</div>
                  <div className="text-[10px] text-slate-500">Groceries • 15 Orders</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">Active</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Salem Supermart</div>
                  <div className="text-[10px] text-slate-500">FMCG Retail • 28 Orders</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">Active</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/pincode-admin/vendors')}
            className="w-full py-2 rounded-xl bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-slate-700 transition text-center"
          >
            Manage Pincode Vendors
          </button>
        </div>
      </div>
    </div>
  );
}
