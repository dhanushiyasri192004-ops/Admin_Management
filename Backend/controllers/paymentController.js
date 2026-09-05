const { db, filterByLocation } = require('../config/db');

// --- AGENT PAYMENTS ---

function getAgentPayments(req, res) {
  try {
    let scoped = filterByLocation(db.agentPayments, req.user);
    const { status, search } = req.query;

    if (status) {
      scoped = scoped.filter(p => p.status.toLowerCase() === status.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      scoped = scoped.filter(p =>
        p.agentName.toLowerCase().includes(q) ||
        p.pincode.includes(q) ||
        (p.transactionRef && p.transactionRef.toLowerCase().includes(q))
      );
    }

    const summary = {
      total: scoped.length,
      pendingCount: scoped.filter(p => p.status === 'Pending').length,
      pendingAmount: scoped.filter(p => p.status === 'Pending').reduce((s, p) => s + p.amount, 0),
      approvedCount: scoped.filter(p => p.status === 'Approved').length,
      paidCount: scoped.filter(p => p.status === 'Paid').length,
      totalPaidAmount: scoped.filter(p => p.status === 'Paid').reduce((s, p) => s + p.amount, 0)
    };

    return res.json({ success: true, summary, payments: scoped });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch agent payments', error: error.message });
  }
}

function processAgentPayment(req, res) {
  try {
    const { id } = req.params;
    const { action, transactionRef, notes } = req.body; // action: 'approve' | 'pay' | 'reject'

    const payment = db.agentPayments.find(p => p.id === id);
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment request not found' });
    }

    const scoped = filterByLocation([payment], req.user);
    if (scoped.length === 0) {
      return res.status(403).json({ success: false, message: 'Payment outside your jurisdiction' });
    }

    const currentDate = new Date().toISOString().split('T')[0];

    if (action === 'approve') {
      payment.status = 'Approved';
      payment.approvedBy = `${req.user.name} (${req.user.role})`;
      payment.approvalDate = currentDate;
      if (notes) payment.notes = notes;
    } else if (action === 'pay') {
      payment.status = 'Paid';
      payment.paidBy = `${req.user.name} (${req.user.role})`;
      payment.paidDate = currentDate;
      payment.transactionRef = transactionRef || `TXN-REF-${Date.now()}`;
      if (notes) payment.notes = notes;
    } else if (action === 'reject') {
      payment.status = 'Rejected';
      payment.rejectedBy = `${req.user.name} (${req.user.role})`;
      payment.rejectionReason = notes || 'Rejected during administrative review';
    } else {
      return res.status(400).json({ success: false, message: 'Invalid action. Must be approve, pay, or reject' });
    }

    return res.json({
      success: true,
      message: `Payment request marked as ${payment.status}`,
      payment
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to process payment', error: error.message });
  }
}

function requestAgentPayment(req, res) {
  try {
    const { agentId, agentName, amount, paymentDetails, notes } = req.body;
    if (!agentName || !amount) {
      return res.status(400).json({ success: false, message: 'Agent name and amount are required' });
    }

    const newPayment = {
      id: `APAY-${Date.now().toString().slice(-4)}`,
      agentId: agentId || 'AGT-MANUAL',
      agentName,
      amount: Number(amount),
      state: req.user.state || 'Tamil Nadu',
      district: req.user.district || 'Salem',
      division: req.user.division || 'Salem North',
      pincode: req.user.pincode || '636001',
      paymentDetails: paymentDetails || 'UPI / Bank Transfer',
      requestDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      notes: notes || 'Direct Commission Settlement Request'
    };

    db.agentPayments.unshift(newPayment);

    return res.status(201).json({
      success: true,
      message: 'Payment request submitted successfully',
      payment: newPayment
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to submit payment request', error: error.message });
  }
}

// --- VENDOR PAYMENTS ---

function getVendorPayments(req, res) {
  try {
    let scoped = filterByLocation(db.vendorPayments, req.user);
    const { status, search } = req.query;

    if (status) {
      scoped = scoped.filter(p => p.status.toLowerCase() === status.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      scoped = scoped.filter(p =>
        p.vendorName.toLowerCase().includes(q) ||
        p.invoiceNumber.toLowerCase().includes(q) ||
        p.pincode.includes(q)
      );
    }

    return res.json({ success: true, count: scoped.length, payments: scoped });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch vendor payments', error: error.message });
  }
}

function processVendorPayment(req, res) {
  try {
    const { id } = req.params;
    const { action, transactionRef, notes } = req.body;

    const payment = db.vendorPayments.find(p => p.id === id);
    if (!payment) return res.status(404).json({ success: false, message: 'Vendor payment not found' });

    const scoped = filterByLocation([payment], req.user);
    if (scoped.length === 0) {
      return res.status(403).json({ success: false, message: 'Payment outside your jurisdiction' });
    }

    const currentDate = new Date().toISOString().split('T')[0];

    if (action === 'approve') {
      payment.status = 'Approved';
      payment.approvedBy = `${req.user.name} (${req.user.role})`;
      payment.approvalDate = currentDate;
    } else if (action === 'pay') {
      payment.status = 'Paid';
      payment.paidDate = currentDate;
      payment.transactionRef = transactionRef || `UTR-${Date.now()}`;
    }

    if (notes) payment.notes = notes;

    return res.json({ success: true, message: `Vendor payment marked as ${payment.status}`, payment });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to process vendor payment', error: error.message });
  }
}

module.exports = {
  getAgentPayments,
  processAgentPayment,
  requestAgentPayment,
  getVendorPayments,
  processVendorPayment
};
