import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/Badge';
import { Headphones, Clock } from 'lucide-react';

export function PincodeSupportTeam() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getSupportTeam();
      if (res.success) setTickets(res.tickets);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateStatus = async (ticketId, nextStatus) => {
    try {
      await dataService.updateSupportTicket(ticketId, { status: nextStatus });
      loadData();
    } catch (e) {
      alert(e.message || 'Ticket update failed');
    }
  };

  const columns = [
    {
      header: 'Ticket ID & Subject',
      accessor: 'ticketId',
      render: (row) => (
        <div>
          <div className="font-mono font-bold text-indigo-300 text-xs">{row.ticketId}</div>
          <div className="font-semibold text-white text-xs mt-0.5">{row.subject}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">{row.createdAt}</div>
        </div>
      )
    },
    {
      header: 'Requester',
      accessor: 'requesterName',
      render: (row) => <span className="text-white font-medium">{row.requesterName}</span>
    },
    {
      header: 'Assigned Agent',
      accessor: 'assignedTo',
      render: (row) => <span className="text-xs text-slate-300">{row.assignedTo}</span>
    },
    {
      header: 'Priority',
      accessor: 'priority',
      render: (row) => (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
          row.priority === 'High' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-800 text-slate-300'
        }`}>
          {row.priority}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Manage Resolution',
      accessor: 'actions',
      render: (row) => (
        <select
          value={row.status}
          onChange={(e) => updateStatus(row.id, e.target.value)}
          className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-500"
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Pincode Support Team Tickets</h2>
        <p className="text-xs text-slate-400">Customer support issues and resolution desk for this Pincode.</p>
      </div>

      <DataTable
        title="Support Desk Queue"
        subtitle="Manage customer assistance inquiries"
        columns={columns}
        data={tickets}
        loading={loading}
        onRefresh={loadData}
        searchPlaceholder="Search ticket ID or subject..."
        exportFileName="pincode_support_tickets.csv"
      />
    </div>
  );
}
