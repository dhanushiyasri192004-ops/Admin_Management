import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { DataTable } from '../../components/DataTable';
import { Modal } from '../../components/Modal';
import {
  Store,
  CreditCard,
  Calendar,
  CheckCircle2,
  Clock,
  IndianRupee,
  Receipt,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Download,
  Plus,
  Sparkles,
  Phone,
  RefreshCw
} from 'lucide-react';

export function PincodeVendorSubscriptions() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const pincode = user?.pincode || '636001';
  const areaName = user?.areaName || 'Salem Town Fort';

  // Initial Monthly Vendor Subscription Registry for this Pincode
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 'SUB-VND-01',
      vendorId: 'VND-636001-01',
      vendorName: 'Sri Murugan Provisions',
      owner: 'Muruganandam S',
      phone: '+91 94432 11001',
      category: 'Grocery & FMCG Retail',
      planName: 'Growth Monthly Plan',
      planTier: 'Growth',
      monthlyFee: 1999,
      billingCycle: 'Monthly (1st to 30th)',
      lastPaymentDate: '01 Sep 2026',
      lastPaymentMode: 'UPI (GPay / QR)',
      lastTransactionId: 'UPI-98441209384',
      nextDueDate: '01 Oct 2026',
      status: 'Active & Paid',
      daysRemaining: 21,
      invoiceNumber: 'INV-SUB-2026-09-001'
    },
    {
      id: 'SUB-VND-02',
      vendorId: 'VND-636001-02',
      vendorName: 'Salem Supermart',
      owner: 'K. Rajasekaran',
      phone: '+91 94432 22002',
      category: 'Supermarket & Essentials',
      planName: 'Enterprise Monthly Plan',
      planTier: 'Enterprise',
      monthlyFee: 2999,
      billingCycle: 'Monthly (15th to 15th)',
      lastPaymentDate: '15 Aug 2026',
      lastPaymentMode: 'Bank Transfer (IMPS)',
      lastTransactionId: 'IMPS-7740192301',
      nextDueDate: '15 Sep 2026',
      status: 'Due for Renewal',
      daysRemaining: 5,
      invoiceNumber: 'INV-SUB-2026-08-014'
    }
  ]);

  // Modal States
  const [selectedSub, setSelectedSub] = useState(null);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPlanChangeModal, setShowPlanChangeModal] = useState(false);

  // Form State for Recording Monthly Payment
  const [paymentForm, setPaymentForm] = useState({
    billingMonth: 'October 2026',
    amount: 1999,
    paymentMode: 'UPI (GPay / PhonePe)',
    transactionId: '',
    paymentDate: new Date().toISOString().split('T')[0],
    notes: 'Monthly merchant platform fee received'
  });

  // KPI Calculations
  const kpiStats = useMemo(() => {
    const total = subscriptions.length;
    const active = subscriptions.filter(s => s.status === 'Active & Paid').length;
    const dueSoon = subscriptions.filter(s => s.status === 'Due for Renewal').length;
    const totalMonthlyRecurring = subscriptions.reduce((sum, s) => sum + s.monthlyFee, 0);
    const totalCollectedThisMonth = subscriptions
      .filter(s => s.status === 'Active & Paid')
      .reduce((sum, s) => sum + s.monthlyFee, 0);

    return {
      total,
      active,
      dueSoon,
      totalMonthlyRecurring,
      totalCollectedThisMonth
    };
  }, [subscriptions]);

  const handleOpenCollectModal = (sub) => {
    setSelectedSub(sub);
    setPaymentForm({
      billingMonth: sub.status === 'Due for Renewal' ? 'September 2026' : 'October 2026',
      amount: sub.monthlyFee,
      paymentMode: 'UPI (GPay / PhonePe)',
      transactionId: `TXN-${Math.floor(100000000 + Math.random() * 900000000)}`,
      paymentDate: new Date().toISOString().split('T')[0],
      notes: 'Monthly merchant listing fee paid'
    });
    setShowCollectModal(true);
  };

  const handleRecordPaymentSubmit = (e) => {
    e.preventDefault();
    if (!selectedSub) return;

    const newInvoiceNo = `INV-SUB-2026-${String(Math.floor(100 + Math.random() * 900))}`;

    setSubscriptions(prev =>
      prev.map(s => {
        if (s.id === selectedSub.id) {
          return {
            ...s,
            status: 'Active & Paid',
            lastPaymentDate: paymentForm.paymentDate,
            lastPaymentMode: paymentForm.paymentMode,
            lastTransactionId: paymentForm.transactionId,
            nextDueDate: '15 Oct 2026',
            daysRemaining: 30,
            invoiceNumber: newInvoiceNo
          };
        }
        return s;
      })
    );

    setShowCollectModal(false);
    alert(`Monthly subscription payment of ₹${paymentForm.amount} recorded for ${selectedSub.vendorName}! Invoice generated: ${newInvoiceNo}`);
  };

  const handlePlanChange = (newPlan, newFee) => {
    if (!selectedSub) return;
    setSubscriptions(prev =>
      prev.map(s => {
        if (s.id === selectedSub.id) {
          return {
            ...s,
            planName: newPlan,
            planTier: newPlan.split(' ')[0],
            monthlyFee: newFee
          };
        }
        return s;
      })
    );
    setShowPlanChangeModal(false);
  };

  const columns = [
    {
      header: 'Vendor Business',
      accessor: 'vendorName',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-700/40 text-amber-600 dark:text-amber-400 shrink-0">
            <Store className="w-4 h-4" />
          </div>
          <div>
            <div className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>{row.vendorName}</div>
            <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Contact: {row.owner} &bull; {row.phone}
            </div>
            <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">{row.category}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Monthly Plan & Fee',
      accessor: 'monthlyFee',
      render: (row) => (
        <div>
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
            row.planTier === 'Enterprise'
              ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
              : row.planTier === 'Growth'
              ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
              : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300'
          }`}>
            <Sparkles className="w-3 h-3" />
            {row.planName}
          </span>
          <div className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-1">
            ₹{row.monthlyFee.toLocaleString()} <span className="text-[10px] font-medium text-slate-500">/ month</span>
          </div>
        </div>
      )
    },
    {
      header: 'Billing Cycle',
      accessor: 'billingCycle',
      render: (row) => (
        <div>
          <div className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{row.billingCycle}</div>
          <div className={`text-[11px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'} mt-0.5`}>
            Inv: {row.invoiceNumber}
          </div>
        </div>
      )
    },
    {
      header: 'Last Payment',
      accessor: 'lastPaymentDate',
      render: (row) => (
        <div>
          <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{row.lastPaymentDate}</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">{row.lastPaymentMode}</div>
          <div className="text-[10px] font-mono text-slate-400 truncate max-w-[140px]">{row.lastTransactionId}</div>
        </div>
      )
    },
    {
      header: 'Next Due Date',
      accessor: 'nextDueDate',
      render: (row) => {
        const isDue = row.status === 'Due for Renewal';
        return (
          <div>
            <div className={`text-xs font-bold ${isDue ? 'text-rose-600 dark:text-rose-400' : isDark ? 'text-white' : 'text-slate-900'}`}>
              {row.nextDueDate}
            </div>
            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md mt-0.5 ${
              isDue
                ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
            }`}>
              <Clock className="w-3 h-3" />
              {isDue ? 'Renewal Due in 5 Days' : `${row.daysRemaining} days left`}
            </span>
          </div>
        );
      }
    },
    {
      header: 'Subscription Status',
      accessor: 'status',
      render: (row) => {
        const isPaid = row.status === 'Active & Paid';
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
            isPaid
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
              : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isPaid ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            {row.status}
          </span>
        );
      }
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => handleOpenCollectModal(row)}
            className="px-2.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition cursor-pointer whitespace-nowrap"
            title="Record Monthly Payment"
          >
            Record Payment
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedSub(row);
              setShowInvoiceModal(true);
            }}
            className={`p-1.5 rounded-xl border transition cursor-pointer ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
            title="View Monthly Invoice"
          >
            <Receipt className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Vendor Monthly Subscriptions
          </h2>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Supervise recurring monthly listing fees, billing cycles, payment collections, and renewal schedules for PIN {pincode} ({areaName}).
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3 py-1.5 rounded-xl text-xs font-bold font-mono bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Monthly Billing Active
          </span>
        </div>
      </div>

      {/* 4 KPI Cards in a single row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {/* KPI 1: Total Active Subscriptions */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Subscriptions</span>
            <Store className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">{kpiStats.total} Stores</div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
            {kpiStats.active} Active & compliant
          </div>
        </div>

        {/* KPI 2: Monthly Recurring Inflow */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Monthly Expected Fee</span>
            <IndianRupee className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">
            ₹{kpiStats.totalMonthlyRecurring.toLocaleString()}
          </div>
          <div className="text-[10px] text-blue-600 dark:text-blue-400 font-medium mt-0.5">
            Monthly recurring dues
          </div>
        </div>

        {/* KPI 3: Collected This Month */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Collected This Month</span>
            <CreditCard className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">
            ₹{kpiStats.totalCollectedThisMonth.toLocaleString()}
          </div>
          <div className="text-[10px] text-purple-600 dark:text-purple-400 font-medium mt-0.5">
            Paid & settled
          </div>
        </div>

        {/* KPI 4: Pending Renewals */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Pending Renewal</span>
            <Clock className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">
            {kpiStats.dueSoon} Store
          </div>
          <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium mt-0.5">
            Renewal due soon
          </div>
        </div>
      </div>

      {/* Available Monthly Merchant Subscription Plans */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#131f37] border border-slate-200/90 dark:border-[#1f3358] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Standard Monthly Merchant Listing Plans
            </h3>
            <p className="text-[11px] text-slate-500">Fixed monthly fee payable by local merchant shops to remain operational</p>
          </div>
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 font-mono">PIN: {pincode}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
          {/* Plan 1: Standard */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-white">Basic Merchant</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">50 Items</span>
              </div>
              <div className="text-lg font-black text-slate-900 dark:text-white mt-1">₹999 <span className="text-[10px] font-medium text-slate-500">/ mo</span></div>
              <p className="text-[11px] text-slate-500 mt-1">Standard store listing, catalog display & hyperlocal customer dispatch.</p>
            </div>
            <div className="text-[10px] text-slate-500 font-semibold border-t border-slate-200 dark:border-slate-800 pt-1.5">
              Ideal for small neighborhood grocers & kiosks
            </div>
          </div>

          {/* Plan 2: Growth */}
          <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 flex flex-col justify-between space-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg">
              POPULAR
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-blue-700 dark:text-blue-300">Growth Merchant</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">200 Items</span>
              </div>
              <div className="text-lg font-black text-blue-600 dark:text-blue-400 mt-1">₹1,999 <span className="text-[10px] font-medium text-slate-500">/ mo</span></div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Featured store placement, priority courier dispatch, and weekly sales metrics.</p>
            </div>
            <div className="text-[10px] text-blue-700 dark:text-blue-300 font-semibold border-t border-blue-200/60 dark:border-blue-900/60 pt-1.5">
              Recommended for high-volume retail stores
            </div>
          </div>

          {/* Plan 3: Enterprise */}
          <div className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/40 dark:bg-purple-950/20 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-purple-700 dark:text-purple-300">Enterprise Supermart</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">Unlimited</span>
              </div>
              <div className="text-lg font-black text-purple-600 dark:text-purple-400 mt-1">₹2,999 <span className="text-[10px] font-medium text-slate-500">/ mo</span></div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Top home screen banner feature, 0% surge charges, and dedicated relationship manager.</p>
            </div>
            <div className="text-[10px] text-purple-700 dark:text-purple-300 font-semibold border-t border-purple-200/60 dark:border-purple-900/60 pt-1.5">
              Best for large supermarkets & wholesale distributors
            </div>
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <DataTable
        title="Merchant Monthly Subscription Registry"
        subtitle="Track payment receipts, monthly billing cycles, and next renewal due dates"
        columns={columns}
        data={subscriptions}
        searchPlaceholder="Search store name, invoice..."
        exportFileName="vendor_monthly_subscriptions.csv"
      />

      {/* Modal 1: Record Monthly Payment */}
      <Modal
        isOpen={showCollectModal}
        onClose={() => setShowCollectModal(false)}
        title={`Record Monthly Payment - ${selectedSub?.vendorName}`}
        maxWidth="max-w-lg"
      >
        {selectedSub && (
          <form onSubmit={handleRecordPaymentSubmit} className="space-y-4">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Vendor ID:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedSub.vendorId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Subscription Plan:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{selectedSub.planName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Monthly Standard Fee:</span>
                <span className="font-bold text-emerald-600">₹{selectedSub.monthlyFee.toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Billing Month</label>
                <input
                  type="text"
                  value={paymentForm.billingMonth}
                  onChange={(e) => setPaymentForm({ ...paymentForm, billingMonth: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Amount Paid (₹) *</label>
                <input
                  type="number"
                  required
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm({ ...paymentForm, amount: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Payment Mode</label>
                <select
                  value={paymentForm.paymentMode}
                  onChange={(e) => setPaymentForm({ ...paymentForm, paymentMode: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="UPI (GPay / PhonePe)">UPI (GPay / PhonePe / QR)</option>
                  <option value="Bank Transfer (IMPS / NEFT)">Bank Transfer (IMPS / NEFT)</option>
                  <option value="Debit / Credit Card">Debit / Credit Card</option>
                  <option value="Cash at Station">Cash at Station Office</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Transaction Ref / UTR</label>
                <input
                  type="text"
                  required
                  value={paymentForm.transactionId}
                  onChange={(e) => setPaymentForm({ ...paymentForm, transactionId: e.target.value })}
                  placeholder="e.g. UPI-9840182402"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Remarks / Note</label>
              <input
                type="text"
                value={paymentForm.notes}
                onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowCollectModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition cursor-pointer"
              >
                Confirm Monthly Payment
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Modal 2: View Subscription Invoice / Receipt */}
      <Modal
        isOpen={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        title="Official Monthly Subscription Receipt"
        maxWidth="max-w-md"
      >
        {selectedSub && (
          <div className="space-y-4 p-1">
            {/* Header Receipt Card */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-center space-y-1">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center font-bold">
                ✓
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Payment Received Successfully</h4>
              <p className="text-[11px] text-slate-500">Forge India Hyperlocal Platform &bull; Merchant Listing</p>
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-2">
                ₹{selectedSub.monthlyFee.toLocaleString()}
              </div>
            </div>

            {/* Receipt Details List */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              <div className="py-2 flex justify-between">
                <span className="text-slate-500">Invoice Number:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedSub.invoiceNumber}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-500">Merchant Store:</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedSub.vendorName}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-500">Subscription Plan:</span>
                <span className="font-semibold text-blue-600">{selectedSub.planName}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-500">Pincode Station:</span>
                <span className="font-mono font-semibold">PIN {pincode} ({areaName})</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-500">Payment Mode:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{selectedSub.lastPaymentMode}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="font-mono text-slate-600 dark:text-slate-400">{selectedSub.lastTransactionId}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-500">Next Renewal Date:</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedSub.nextDueDate}</span>
              </div>
            </div>

            <div className="flex justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  alert(`Downloading official tax receipt for ${selectedSub.invoiceNumber}...`);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Receipt</span>
              </button>
              <button
                type="button"
                onClick={() => setShowInvoiceModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
