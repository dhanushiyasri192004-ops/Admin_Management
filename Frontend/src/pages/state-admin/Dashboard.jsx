import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Building2,
  Layers,
  MapPin,
  Users,
  Store,
  ShieldCheck,
  ShieldAlert,
  ShoppingBag,
  CalendarCheck,
  Briefcase,
  Truck,
  Wrench,
  UserCheck,
  Headphones,
  UserPlus,
  FileCheck2,
  IndianRupee,
  CreditCard,
  Wallet,
  BarChart3,
  Clock,
  CircleHelp,
  ClipboardList,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ChevronRight,
  Plus
} from 'lucide-react';

export function StateAdminDashboard() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const cardStyle = isDark
    ? 'bg-[#131f37] border-[#1f3358]'
    : 'bg-white border-slate-200/90 shadow-sm';

  // 1. Top Summary Cards (6 compact cards)
  const topSummaryCards = [
    {
      label: 'Total Districts',
      value: '38',
      icon: Building2,
      path: '/state-admin/districts',
      highlight: 'Tamil Nadu',
      badgeColor: isDark ? 'bg-blue-950/80 border-blue-800 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-600',
      highlightColor: 'text-blue-600'
    },
    {
      label: 'Total Divisions',
      value: '128',
      icon: Layers,
      path: '/state-admin/divisions',
      highlight: 'Active Zones',
      badgeColor: isDark ? 'bg-indigo-950/80 border-indigo-800 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-600',
      highlightColor: 'text-indigo-600'
    },
    {
      label: 'Total Pincodes',
      value: '1,256',
      icon: MapPin,
      path: '/state-admin/pincodes',
      highlight: 'Micro Coverage',
      badgeColor: isDark ? 'bg-sky-950/80 border-sky-800 text-sky-400' : 'bg-sky-50 border-sky-100 text-sky-600',
      highlightColor: 'text-indigo-600'
    },
    {
      label: 'Total Customers',
      value: '12,845',
      icon: Users,
      path: '/state-admin/customers',
      highlight: '+256 this mo',
      badgeColor: isDark ? 'bg-sky-950/80 border-sky-800 text-sky-400' : 'bg-sky-50 border-sky-100 text-sky-600',
      highlightColor: 'text-emerald-600'
    },
    {
      label: 'Total Vendors',
      value: '2,365',
      icon: Store,
      path: '/state-admin/vendors',
      highlight: '1,842 Active',
      badgeColor: isDark ? 'bg-amber-950/80 border-amber-800 text-amber-400' : 'bg-amber-50 border-amber-100 text-amber-600',
      highlightColor: 'text-amber-600'
    },
    {
      label: 'Total Admins',
      value: '168',
      icon: ShieldCheck,
      path: '/state-admin/district-admins',
      highlight: 'Nodal Officers',
      badgeColor: isDark ? 'bg-purple-950/80 border-purple-800 text-purple-400' : 'bg-purple-50 border-purple-100 text-purple-600',
      highlightColor: 'text-purple-600'
    }
  ];

  // 3. Operations Overview (8 items)
  const operationsList = [
    { label: 'Orders', count: '8,452', subtext: '7,125 Fulfilled', icon: ShoppingBag, path: '/state-admin/orders' },
    { label: 'Bookings', count: '3,210', subtext: '2,890 Scheduled', icon: CalendarCheck, path: '/state-admin/bookings' },
    { label: 'Jobs', count: '1,420', subtext: '94 In Progress', icon: Briefcase, path: '/state-admin/jobs' },
    { label: 'Delivery Partners', count: '485', subtext: '380 On Duty', icon: Truck, path: '/state-admin/delivery-partners' },
    { label: 'Technicians', count: '320', subtext: '265 Field Ready', icon: Wrench, path: '/state-admin/technicians' },
    { label: 'Executives', count: '142', subtext: '138 Active', icon: UserCheck, path: '/state-admin/executives' },
    { label: 'Support Team', count: '64', subtext: '98.4% SLA Met', icon: Headphones, path: '/state-admin/support-team' },
    { label: 'Agents', count: '1,150', subtext: '920 Subscribed', icon: UserPlus, path: '/state-admin/agents' }
  ];

  // 4. Finance & Compliance (6 items)
  const financeComplianceList = [
    { label: 'Pending KYC', value: '24', detail: 'Verifications Due', icon: FileCheck2, alert: true, path: '/state-admin/kyc' },
    { label: 'Pending Payments', value: '₹3,45,200', detail: '18 Invoices Pending', icon: Wallet, alert: true, path: '/state-admin/payments' },
    { label: 'Vendor Payments', value: '₹24,58,320', detail: 'Settled this cycle', icon: Store, path: '/state-admin/vendor-payments' },
    { label: 'Agent Payments', value: '₹4,82,600', detail: 'Commission Payouts', icon: IndianRupee, path: '/state-admin/agent-payments' },
    { label: 'Pending Payouts', value: '18', detail: 'Batches Queued', icon: CreditCard, path: '/state-admin/payments' },
    { label: 'Business Reports', value: '42', detail: 'Monthly Statements', icon: BarChart3, path: '/state-admin/reports' }
  ];

  // 5. Pending Actions (7 actionable items with count and arrow)
  const pendingActions = [
    { label: 'District Admin Requests', count: 4, path: '/state-admin/district-admins', icon: Building2 },
    { label: 'Division Admin Requests', count: 6, path: '/state-admin/division-admins', icon: Layers },
    { label: 'Pincode Admin Requests', count: 11, path: '/state-admin/pincode-admins', icon: MapPin },
    { label: 'KYC Verification', count: 24, path: '/state-admin/kyc', icon: FileCheck2, highlight: true },
    { label: 'Payment Requests', count: 15, path: '/state-admin/payments', icon: IndianRupee, highlight: true },
    { label: 'Queries', count: 8, path: '/state-admin/queries', icon: CircleHelp },
    { label: 'Tasks', count: 12, path: '/state-admin/tasks', icon: ClipboardList }
  ];

  // 6. Recent Activities (Latest 7 activities)
  const recentActivities = [
    { title: 'New district admin assigned', desc: 'Sundar Raman appointed for Coimbatore District', time: '10:15 AM', icon: ShieldCheck },
    { title: 'New vendor registered', desc: '"Sri Murugan Provisions" onboarded in Salem North', time: '11:30 AM', icon: Store },
    { title: 'Pincode updated', desc: 'Territory boundary updated for PIN: 636004 Gugai', time: '01:20 PM', icon: MapPin },
    { title: 'KYC approved', desc: 'Verified GST & Aadhaar for Viji Enterprises', time: '02:45 PM', icon: FileCheck2 },
    { title: 'Payment completed', desc: 'Batch settlement of ₹1,45,200 disbursed to merchants', time: '03:10 PM', icon: CheckCircle2 },
    { title: 'New customer registered', desc: 'Arun Kumar joined Silver Card Membership', time: '03:50 PM', icon: UserPlus },
    { title: 'Query resolved', desc: 'Dispute ticket #QR-8105 POS reader error closed', time: '04:15 PM', icon: CircleHelp }
  ];

  // 7. Quick Actions (6 compact buttons)
  const quickActionButtons = [
    { label: 'View District', path: '/state-admin/districts', icon: Building2 },
    { label: 'View Division', path: '/state-admin/divisions', icon: Layers },
    { label: 'View Pincode', path: '/state-admin/pincodes', icon: MapPin },
    { label: 'Assign Admin', path: '/state-admin/district-admins', icon: ShieldAlert },
    { label: 'Add Vendor', path: '/state-admin/vendors', icon: Store },
    { label: 'Create Task', path: '/state-admin/tasks', icon: ClipboardList }
  ];

  return (
    <div className="space-y-5 pb-8">
      {/* 1. TOP SUMMARY CARDS (6 compact cards) */}
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {topSummaryCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                onClick={() => navigate(card.path)}
                className={`admin-card p-4 ${cardStyle} hover:border-blue-300 transition cursor-pointer flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {card.label}
                  </span>
                  <div className={`p-1.5 rounded-lg border ${card.badgeColor}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mt-2`}>
                  {card.value}
                </div>
                <div className={`text-[10px] ${card.highlightColor} font-semibold mt-0.5`}>
                  {card.highlight}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. ADMINISTRATIVE STRUCTURE */}
      <div className={`admin-card p-4 sm:p-5 ${cardStyle} border rounded-2xl`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Administrative Structure
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-1 flex items-center gap-2 flex-wrap">
              <span>Tamil Nadu</span>
              <span className="text-blue-600 dark:text-blue-400 font-extrabold">→</span>
              <span>Districts</span>
              <span className="text-blue-600 dark:text-blue-400 font-extrabold">→</span>
              <span>Divisions</span>
              <span className="text-blue-600 dark:text-blue-400 font-extrabold">→</span>
              <span>Pincodes</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/state-admin/districts')}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-400 dark:hover:bg-blue-900/60 border border-blue-100 dark:border-blue-800/40 transition cursor-pointer self-start sm:self-auto"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-3.5">
          <div
            onClick={() => navigate('/state-admin/districts')}
            className="p-3 rounded-xl bg-slate-50/70 hover:bg-slate-100/80 dark:bg-slate-800/40 dark:hover:bg-slate-800/70 border border-slate-100 dark:border-slate-800 flex items-center justify-between cursor-pointer transition"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">38 Districts</div>
                <div className="text-xs font-medium text-slate-600 dark:text-slate-300">Apex territorial units</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          <div
            onClick={() => navigate('/state-admin/divisions')}
            className="p-3 rounded-xl bg-slate-50/70 hover:bg-slate-100/80 dark:bg-slate-800/40 dark:hover:bg-slate-800/70 border border-slate-100 dark:border-slate-800 flex items-center justify-between cursor-pointer transition"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">128 Divisions</div>
                <div className="text-xs font-medium text-slate-600 dark:text-slate-300">Regional administration hubs</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          <div
            onClick={() => navigate('/state-admin/pincodes')}
            className="p-3 rounded-xl bg-slate-50/70 hover:bg-slate-100/80 dark:bg-slate-800/40 dark:hover:bg-slate-800/70 border border-slate-100 dark:border-slate-800 flex items-center justify-between cursor-pointer transition"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">1,256 Pincodes</div>
                <div className="text-xs font-medium text-slate-600 dark:text-slate-300">Micro-zone field coverage</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* 7. QUICK ACTIONS */}
      <div className={`admin-card p-4 sm:p-5 ${cardStyle} border rounded-2xl`}>
        <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
          Quick Actions
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {quickActionButtons.map((btn, idx) => {
            const Icon = btn.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => navigate(btn.path)}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/50 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 dark:hover:bg-slate-800 dark:hover:text-blue-400 text-xs font-bold text-slate-900 dark:text-white transition-all cursor-pointer group"
              >
                <Icon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="truncate">{btn.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. OPERATIONS OVERVIEW (8 compact cards / rows, NOT charts) */}
      <div className={`admin-card p-4 sm:p-5 ${cardStyle} border rounded-2xl`}>
        <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Operations Overview
            </div>
            <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Key workload metrics across statewide operations
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {operationsList.map((op, idx) => {
            const Icon = op.icon;
            return (
              <div
                key={idx}
                onClick={() => navigate(op.path)}
                className="p-3 rounded-xl bg-slate-50/60 dark:bg-slate-800/30 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-2.5 cursor-pointer transition"
              >
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {op.label}
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {op.count}
                  </div>
                  <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 truncate">
                    {op.subtext}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LOWER SECTION: Two Columns (Finance & Activities VS Pending Actions) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (7 cols): Finance & Compliance + Recent Activities */}
        <div className="lg:col-span-7 space-y-5">
          {/* 4. FINANCE & COMPLIANCE */}
          <div className={`admin-card p-4 sm:p-5 ${cardStyle} border rounded-2xl`}>
            <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Finance & Compliance
                </div>
                <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  Ledger status, escrow payouts, and compliance verification
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {financeComplianceList.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    onClick={() => navigate(item.path)}
                    className="p-3 rounded-xl bg-slate-50/60 dark:bg-slate-800/30 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 border border-slate-100 dark:border-slate-800 cursor-pointer transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {item.label}
                      </span>
                      <Icon className={`w-3.5 h-3.5 ${item.alert ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                    </div>
                    <div className="text-base font-extrabold text-slate-900 dark:text-white mt-1.5">
                      {item.value}
                    </div>
                    <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                      {item.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 6. RECENT ACTIVITIES */}
          <div className={`admin-card p-4 sm:p-5 ${cardStyle} border rounded-2xl`}>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Recent Activities
              </div>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Live Audit Stream
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {recentActivities.map((act, idx) => {
                const Icon = act.icon;
                return (
                  <div key={idx} className="py-2.5 first:pt-0 last:pb-0 flex items-start justify-between gap-3 text-xs">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 mt-0.5 shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {act.title}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {act.desc}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400 shrink-0 mt-0.5">
                      {act.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): 5. PENDING ACTIONS */}
        <div className="lg:col-span-5">
          <div className={`admin-card p-4 sm:p-5 ${cardStyle} border rounded-2xl h-full flex flex-col justify-between`}>
            <div>
              <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Pending Actions
                  </div>
                  <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    Items requiring immediate administrative sign-off
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40">
                  {pendingActions.reduce((acc, curr) => acc + curr.count, 0)} Total
                </span>
              </div>

              <div className="space-y-2">
                {pendingActions.map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => navigate(action.path)}
                      className="p-3 rounded-xl bg-slate-50/70 hover:bg-slate-100/90 dark:bg-slate-800/30 dark:hover:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between cursor-pointer transition group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {action.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          action.highlight
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300'
                            : 'bg-slate-200/80 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                        }`}>
                          {action.count}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 dark:text-slate-400">
              <span>All escalations monitored</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">State SLA: 24h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
