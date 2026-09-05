const { db, filterByLocation } = require('../config/db');

function getVendors(req, res) {
  try {
    let scoped = filterByLocation(db.vendors, req.user);

    const { search, category, status } = req.query;
    if (search) {
      const q = search.toLowerCase();
      scoped = scoped.filter(v =>
        v.name.toLowerCase().includes(q) ||
        v.contactPerson.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        v.pincode.includes(q)
      );
    }
    if (category) {
      scoped = scoped.filter(v => v.category.toLowerCase() === category.toLowerCase());
    }
    if (status) {
      scoped = scoped.filter(v => v.status.toLowerCase() === status.toLowerCase());
    }

    return res.json({ success: true, count: scoped.length, vendors: scoped });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch vendors', error: error.message });
  }
}

function getVendorById(req, res) {
  try {
    const vendor = db.vendors.find(v => v.id === req.params.id);
    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }

    const scoped = filterByLocation([vendor], req.user);
    if (scoped.length === 0) {
      return res.status(403).json({ success: false, message: 'Vendor outside your jurisdiction' });
    }

    return res.json({ success: true, vendor });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch vendor', error: error.message });
  }
}

module.exports = {
  getVendors,
  getVendorById
};
