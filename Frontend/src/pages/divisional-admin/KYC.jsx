import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { Modal } from '../../components/Modal';

export function DivisionalKYC() {
  const { user } = useAuth();
  const [kycList, setKycList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getKYC();
      if (res.success) setKycList(res.kyc);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdate = async (id, status, notes) => {
    try {
      await dataService.updateKYC(id, { status, notes });
      setSelectedRecord(null);
      loadData();
    } catch (e) {
      alert(e.message || 'KYC update failed');
    }
  };

  const columns = [
    {
      header: 'Applicant Name & Type',
      accessor: 'name',
      render: (row) => (
        <div>
          <div className="font-bold text-slate-900 dark:text-white text-xs">{row.name}</div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-indigo-950 text-blue-700 dark:text-indigo-300 font-semibold border border-blue-100 dark:border-indigo-800">
            {row.type}
          </span>
        </div>
      )
    },
    {
      header: 'Document Type',
      accessor: 'documentType',
      render: (row) => <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{row.documentType}</span>
    },
    {
      header: 'Document Number',
      accessor: 'documentNumber',
      render: (row) => <span className="font-mono text-xs text-slate-600 dark:text-slate-400">{row.documentNumber}</span>
    },
    {
      header: 'Pincode Zone',
      accessor: 'pincode',
      render: (row) => (
        <span className="font-mono text-xs text-blue-600 dark:text-cyan-400 font-bold">
          PIN: {row.pincode}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <button
          onClick={() => setSelectedRecord(row)}
          className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 text-blue-600 dark:text-slate-200 text-xs font-semibold border border-blue-200 dark:border-slate-700 transition"
        >
          Review Document
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Division KYC Compliance Desk</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Identity document verification for users within {user?.division || 'Salem North'} Division.
        </p>
      </div>

      <DataTable
        title="KYC Document Clearance"
        subtitle="Manage compliance and identity auditing in assigned division"
        columns={columns}
        data={kycList}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search applicant..."
        exportFileName="division_kyc.csv"
      />

      <Modal
        isOpen={!!selectedRecord}
        onClose={() => setSelectedRecord(null)}
        title="KYC Compliance Document Inspection"
      >
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="text-xs text-slate-500">Applicant Full Name</div>
            <div className="font-bold text-slate-900 dark:text-white text-base">{selectedRecord?.name}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400 font-mono">
              {selectedRecord?.documentType}: {selectedRecord?.documentNumber}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => handleUpdate(selectedRecord?.id, 'Rejected', 'Document rejected by Divisional Admin')}
              className="px-4 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-semibold transition"
            >
              Reject Document
            </button>
            <button
              onClick={() => handleUpdate(selectedRecord?.id, 'Approved', 'Clearance approved by Divisional Admin')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-sm"
            >
              Approve Clearance
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
