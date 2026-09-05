const { db, filterByLocation } = require('../config/db');

function getPincodes(req, res) {
  try {
    let scoped = filterByLocation(db.pincodeDetails, req.user);
    const { search, status } = req.query;

    if (search) {
      const q = search.toLowerCase();
      scoped = scoped.filter(p =>
        p.pincode.includes(q) ||
        p.areaName.toLowerCase().includes(q) ||
        p.division.toLowerCase().includes(q)
      );
    }
    if (status) {
      scoped = scoped.filter(p => p.status.toLowerCase() === status.toLowerCase());
    }

    return res.json({ success: true, count: scoped.length, pincodes: scoped });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch pincodes', error: error.message });
  }
}

function updatePincodeStatus(req, res) {
  try {
    const { pincode } = req.params;
    const { status, assignedAdmin } = req.body;

    const pin = db.pincodeDetails.find(p => p.pincode === pincode);
    if (!pin) return res.status(404).json({ success: false, message: 'Pincode not found' });

    const scoped = filterByLocation([pin], req.user);
    if (scoped.length === 0) {
      return res.status(403).json({ success: false, message: 'Pincode outside your jurisdiction' });
    }

    if (status) pin.status = status;
    if (assignedAdmin) pin.assignedAdmin = assignedAdmin;

    return res.json({ success: true, message: `Pincode ${pincode} updated successfully`, pincode: pin });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update pincode', error: error.message });
  }
}

module.exports = {
  getPincodes,
  updatePincodeStatus
};
