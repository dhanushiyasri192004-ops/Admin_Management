import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { Modal } from '../../components/Modal';
import { IndianRupee, CheckCircle, Clock, ShieldCheck, UserCheck, Store } from 'lucide-react';

export function StatePayments() {
  const [tab, setTab] = useState('agents'); // 'agents' | 'vendors'
  const [agentPayments, setAgentPayments] = useState([]);
  const [vendorPayments, setVendorPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Action Modal state
  const [activeItem, setActiveItem] = useState(null);
  const [actionType, setActionType] = useState('approve'); // 'approve' | 'pay'
  const [notes, setNotes] = useState('');
  const [txnRef, setTxnRef] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [aRes, vRes] = await Promise.all([
        dataService.getAgentPayments(),
        dataService.getVendorPayments()
      ]);
      if (aRes.success) setAgentPayments(aRes.payments);
      if (vRes.success) setVendorPayments(vRes.payments);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleProcess = async () => {
    if (!activeItem) return;
    setSubmitting(true);
    try {
      if (tab === 'agents') {
        await dataService.processAgentPayment(activeItem.id, {
          action: actionType,
          transactionRef: txnRef,
          notes
        });
      } else {
        await dataService.processVendorPayment(activeItem.id, {
          action: actionType,
          transactionRef: txnRef,
          notes
        });
      }
      setActiveItem(null);
      setNotes('');
      setTxnRef('');
      loadData();
    } catch (e) {
      alert(e.message || 'Payment processing failed');
    } finally {
      setSubmitting(false);
    }
  };

  const agentColumns = [
    {
      header: 'Agent Details',
      accessor: 'agentName',
      render: (row) => (
        <div>
          <div className="font-bold text-white text-sm">{row.agentName}</div>
          <div className="text-[11px] text-slate-400 font-mono">Req ID: {row.id}</div>
          <div className="text-[11px] text-indigo-400">{row.paymentDetails}</div>
        </div>
      )
    },
    {
      header: 'Amount',
      accessor: 'amount',
      render: (row) => (
        <span className="font-bold text-emerald-400 text-sm">₹{row.amount?.toLocaleString()}</span>
      )
    },
    {
      header: 'Location Scope',
      accessor: 'pincode',
      render: (row) => (
        <div className="text-xs text-slate-300">
          <div>{row.district} / {row.division}</div>
          <div className="font-mono text-emerald-400">PIN: {row.pincode}</div>
        </div>
      )
    },
    {
      header: 'Status & Approval',
      accessor: 'status',
      render: (row) => (
        <div>
          <StatusBadge status={row.status} />
          {row.approvedBy && (
            <div className="text-[10px] text-slate-400 mt-1">
              By: {row.approvedBy} ({row.approvalDate})
            </div>
          )}
          {row.transactionRef && (
            <div className="text-[10px] font-mono text-indigo-300 mt-0.5">
              Ref: {row.transactionRef}
            </div>
          )}
        </div>
      )
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className="flex items-center gap-1.5">
          {row.status === 'Pending' && (
            <button
              onClick={() => {
                setActiveItem(row);
                setActionType('approve');
              }}
              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition"
            >
              Approve
            </button>
          )}
          {row.status === 'Approved' && (
            <button
              onClick={() => {
                setActiveItem(row);
                setActionType('pay');
              }}
              className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition"
            >
              Disburse / Pay
            </button>
          )}
          {row.status === 'Paid' && (
            <span className="text-xs text-slate-500 font-medium">Settled</span>
          )}
        </div>
      )
    }
  ];

  const vendorColumns = [
    {
      header: 'Vendor Name',
      accessor: 'vendorName',
      render: (row) => (
        <div>
          <div className="font-bold text-white text-sm">{row.vendorName}</div>
          <div className="text-[11px] text-slate-400 font-mono">Invoice: {row.invoiceNumber}</div>
        </div>
      )
    },
    {
      header: 'Payout Amount',
      accessor: 'amount',
      render: (row) => (
        <span className="font-bold text-emerald-400 text-sm">₹{row.amount?.toLocaleString()}</span>
      )
    },
    {
      header: 'Bank Details',
      accessor: 'bankDetails',
      render: (row) => <span className="text-xs text-slate-300">{row.bankDetails}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <div>
          <StatusBadge status={row.status} />
          {row.approvedBy && (
            <div className="text-[10px] text-slate-400 mt-1">Approved by {row.approvedBy}</div>
          )}
        </div>
      )
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className="flex items-center gap-1.5">
          {row.status === 'Pending' && (
            <button
              onClick={() => {
                setActiveItem(row);
                setActionType('approve');
              }}
              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition"
            >
              Approve
            </button>
          )}
          {row.status === 'Approved' && (
            <button
              onClick={() => {
                setActiveItem(row);
                setActionType('pay');
              }}
              className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition"
            >
              Release Payment
            </button>
          )}
          {row.status === 'Paid' && (
            <span className="text-xs text-slate-500 font-medium">Completed</span>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">State Payment Requests & Payouts</h2>
          <p className="text-xs text-slate-400">Review, approve, and settle agent commissions & vendor settlements.</p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex p-1 rounded-xl bg-slate-950/80 border border-slate-800">
          <button
            onClick={() => setTab('agents')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
              tab === 'agents' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Agent Commission Claims
          </button>
          <button
            onClick={() => setTab('vendors')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
              tab === 'vendors' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Vendor Payout Requests
          </button>
        </div>
      </div>

      {tab === 'agents' ? (
        <DataTable
          title="Agent Commission Requests"
          subtitle="Multi-level approval workflow (Pending → Approved → Paid)"
          columns={agentColumns}
          data={agentPayments}
          loading={loading}
          onRefresh={loadData}
          searchPlaceholder="Search agent payment..."
          exportFileName="state_agent_payments.csv"
        />
      ) : (
        <DataTable
          title="Vendor Invoices & Payout Settlements"
          subtitle="Merchant settlements across state"
          columns={vendorColumns}
          data={vendorPayments}
          loading={loading}
          onRefresh={loadData}
          searchPlaceholder="Search vendor payment..."
          exportFileName="state_vendor_payments.csv"
        />
      )}

      {/* Action Dialog Modal */}
      <Modal
        isOpen={!!activeItem}
        onClose={() => setActiveItem(null)}
        title={actionType === 'approve' ? 'Approve Payment Request' : 'Mark Payment as Paid'}
      >
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-xs text-slate-400">Payee</div>
            <div className="font-bold text-white text-sm">
              {activeItem?.agentName || activeItem?.vendorName}
            </div>
            <div className="text-lg font-black text-emerald-400 mt-1">
              ₹{activeItem?.amount?.toLocaleString()}
            </div>
          </div>

          {actionType === 'pay' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Transaction Reference ID / UTR Number
              </label>
              <input
                type="text"
                value={txnRef}
                onChange={(e) => setTxnRef(e.target.value)}
                placeholder="e.g. UTR-2026-9904281"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Administrative Review Notes
            </label>
            <textarea
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add audit notes or settlement remarks..."
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setActiveItem(null)}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              disabled={submitting}
              onClick={handleProcess}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-lg shadow-indigo-600/30"
            >
              {submitting ? 'Processing...' : actionType === 'approve' ? 'Confirm Approval' : 'Confirm Disbursement'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
