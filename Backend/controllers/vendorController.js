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

function createVendor(req, res) {
  try {
    const data = req.body;
    const newVendor = {
      id: `VND-${String(db.vendors.length + 1).padStart(3, '0')}`,
      name: data.name,
      contactPerson: data.contactPerson || data.name,
      phone: data.phone,
      email: data.email || `${(data.name || 'vendor').toLowerCase().replace(/[^a-z0-9]/g, '')}@vendor.com`,
      category: data.category || 'Services',
      state: data.state || req.user.state || 'Tamil Nadu',
      district: data.district || req.user.district || 'Salem',
      division: data.division || req.user.division || 'Salem North',
      pincode: data.pincode || req.user.pincode || '636001',
      address: data.address || `${req.user.pincode || '636001'} Market Area`,
      rating: 5.0,
      totalOrdersDelivered: 0,
      kycStatus: 'Pending',
      status: 'Active',
      pendingPayout: 0,
      assignedAgent: data.assignedAgent || {
        id: 'AGT-701',
        name: data.assignedAgentName || 'Thirunavukkarasu R',
        phone: '+91 94431 00001'
      }
    };

    db.vendors.unshift(newVendor);
    return res.status(201).json({ success: true, vendor: newVendor });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create vendor', error: error.message });
  }
}

module.exports = {
  getVendors,
  getVendorById,
  createVendor
};
