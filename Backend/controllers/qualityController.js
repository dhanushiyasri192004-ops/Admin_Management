const { db, filterByLocation } = require('../config/db');

/**
 * View-Only Quality Check Records for Admin Management System
 * Flow: Vendor Product -> Existing Quality Check Module -> Issue/Status -> Admin Management (Hierarchical View Only)
 */
function getQualityChecks(req, res) {
  try {
    let scoped = filterByLocation(db.qualityCheckRecords, req.user);
    const { status, warningCount, district, division, pincode, search } = req.query;

    if (status && status !== 'All') {
      scoped = scoped.filter(q => q.status.toLowerCase() === status.toLowerCase());
    }

    if (warningCount && warningCount !== 'All') {
      scoped = scoped.filter(q => String(q.warningCount) === String(warningCount));
    }

    if (district && district !== 'All') {
      scoped = scoped.filter(q => q.district.toLowerCase() === district.toLowerCase());
    }

    if (division && division !== 'All') {
      scoped = scoped.filter(q => q.division.toLowerCase() === division.toLowerCase());
    }

    if (pincode && pincode !== 'All') {
      scoped = scoped.filter(q => q.pincode === pincode);
    }

    if (search) {
      const query = search.toLowerCase();
      scoped = scoped.filter(q =>
        (q.vendorName || '').toLowerCase().includes(query) ||
        (q.productName || '').toLowerCase().includes(query) ||
        (q.issue || '').toLowerCase().includes(query) ||
        (q.district || '').toLowerCase().includes(query) ||
        (q.division || '').toLowerCase().includes(query) ||
        (q.pincode || '').includes(query) ||
        (q.status || '').toLowerCase().includes(query) ||
        (q.id || '').toLowerCase().includes(query)
      );
    }

    return res.json({
      success: true,
      count: scoped.length,
      records: scoped,
      adminJurisdiction: {
        role: req.user.role,
        state: req.user.state,
        district: req.user.district,
        division: req.user.division,
        pincode: req.user.pincode
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch quality check records',
      error: error.message
    });
  }
}

function getQualityCheckById(req, res) {
  try {
    const { id } = req.params;
    const record = db.qualityCheckRecords.find(q => q.id === id);
    if (!record) {
      return res.status(404).json({ success: false, message: 'Quality check record not found' });
    }

    const scoped = filterByLocation([record], req.user);
    if (scoped.length === 0) {
      return res.status(403).json({ success: false, message: 'Record outside your jurisdiction' });
    }

    return res.json({ success: true, record });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch quality check record',
      error: error.message
    });
  }
}

module.exports = {
  getQualityChecks,
  getQualityCheckById
};
