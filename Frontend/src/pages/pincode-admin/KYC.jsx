import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { Modal } from '../../components/Modal';
import { FileCheck2, ShieldCheck, XCircle, CheckCircle } from 'lucide-react';

export function PincodeKYC() {
  const [kycRecords, setKycRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeRecord, setActiveRecord] = useState(null);
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getKYCRecords();
      if (res.success) setKycRecords(res.records);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleProcess = async (status) => {
    if (!activeRecord) return;
    setSubmitting(true);
    try {
      await dataService.processKYC(activeRecord.id, {
        status,
        reason
      });
      setActiveRecord(null);
      setReason('');
      loadData();
    } catch (e) {
      alert(e.message || 'KYC verification failed');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      header: 'Applicant Name & Type',
      accessor: 'name',
      render: (row) => (
        <div>
          <div className="font-bold text-white text-sm">{row.name}</div>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
            {row.type}
          </span>
        </div>
      )
    },
    {
      header: 'Document Information',
      accessor: 'docType',
      render: (row) => (
        <div>
          <div className="text-xs font-semibold text-slate-200">{row.docType}</div>
          <div className="text-[11px] font-mono text-slate-400 mt-0.5">{row.docNumber}</div>
        </div>
      )
    },
    {
      header: 'Submitted Date',
      accessor: 'submittedDate',
      render: (row) => <span className="text-xs text-slate-400">{row.submittedDate}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <div>
          <StatusBadge status={row.status} />
          {row.verifiedBy && (
            <div className="text-[10px] text-slate-400 mt-1">By: {row.verifiedBy}</div>
          )}
        </div>
      )
    },
    {
      header: 'Action',
      accessor: 'actions',
      render: (row) => (
        <button
          onClick={() => setActiveRecord(row)}
          className="px-3 py-1 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/60 border border-indigo-500/50 text-indigo-300 text-xs font-bold transition"
        >
          Inspect & Verify
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">KYC Document Verification</h2>
        <p className="text-xs text-slate-400">Validate official identity proof for customers, vendors, and agents.</p>
      </div>

      <DataTable
        title="KYC Compliance Queue"
        subtitle="Restricted to assigned pincode applicants"
        columns={columns}
        data={kycRecords}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search applicant or document ID..."
        exportFileName="pincode_kyc.csv"
      />

      <Modal
        isOpen={!!activeRecord}
        onClose={() => setActiveRecord(null)}
        title="KYC Compliance Audit"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs text-slate-400">Applicant</div>
                <div className="font-bold text-white text-base">{activeRecord?.name}</div>
                <div className="text-xs text-indigo-300">{activeRecord?.type} • PIN: {activeRecord?.pincode}</div>
              </div>
              <StatusBadge status={activeRecord?.status} />
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
              <div><span className="text-slate-400">Document Type:</span> <span className="text-slate-200 font-semibold">{activeRecord?.docType}</span></div>
              <div><span className="text-slate-400">Document Number:</span> <span className="font-mono text-emerald-400 font-bold">{activeRecord?.docNumber}</span></div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Verification Notes / Rejection Reason (If any)
            </label>
            <textarea
              rows="3"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Add verification notes..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setActiveRecord(null)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
            >
              Close
            </button>
            <div className="flex gap-2">
              <button
                disabled={submitting}
                onClick={() => handleProcess('Rejected')}
                className="px-4 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-bold transition flex items-center gap-1.5"
              >
                <XCircle className="w-3.5 h-3.5" /> Reject
              </button>
              <button
                disabled={submitting}
                onClick={() => handleProcess('Verified')}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-emerald-600/30"
              >
                <CheckCircle className="w-3.5 h-3.5" /> Approve KYC
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
