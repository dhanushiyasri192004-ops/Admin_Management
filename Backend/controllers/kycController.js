const { db, filterByLocation } = require('../config/db');

function getKYCRecords(req, res) {
  try {
    let scoped = filterByLocation(db.kycRecords, req.user);
    const { status, type, search } = req.query;

    if (status) {
      scoped = scoped.filter(k => k.status.toLowerCase() === status.toLowerCase());
    }
    if (type) {
      scoped = scoped.filter(k => k.type.toLowerCase() === type.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      scoped = scoped.filter(k =>
        k.name.toLowerCase().includes(q) ||
        k.docNumber.toLowerCase().includes(q) ||
        k.pincode.includes(q)
      );
    }

    return res.json({ success: true, count: scoped.length, records: scoped });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch KYC records', error: error.message });
  }
}

function processKYC(req, res) {
  try {
    const { id } = req.params;
    const { status, reason } = req.body; // status: 'Verified' | 'Rejected'

    const record = db.kycRecords.find(k => k.id === id);
    if (!record) return res.status(404).json({ success: false, message: 'KYC record not found' });

    const scoped = filterByLocation([record], req.user);
    if (scoped.length === 0) {
      return res.status(403).json({ success: false, message: 'Record outside your jurisdiction' });
    }

    record.status = status;
    record.verifiedBy = `${req.user.name} (${req.user.role})`;
    record.verifiedDate = new Date().toISOString().split('T')[0];
    if (reason) record.notes = reason;

    return res.json({ success: true, message: `KYC marked as ${status}`, record });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update KYC status', error: error.message });
  }
}

module.exports = {
  getKYCRecords,
  processKYC
};
