const { db, filterByLocation } = require('../config/db');
const { resolvePincodeHierarchy, PINCODE_MAP } = require('../utils/pincodeMapping');

function ensureVendorAddedBy(v) {
  if (v.addedBy && v.addedBy.name) return v;
  const idStr = String(v.id || '');
  let creator;
  if (idStr.endsWith('1')) {
    creator = { id: 'ADM-001', name: 'Rajesh Sharma', role: 'State Admin', phone: '+91 98765 43210', email: 'state_admin@admin.com', addedAt: '2026-02-10' };
  } else if (idStr.endsWith('2')) {
    creator = { id: 'MGR-PIN-01', name: 'Saravanan Muthuraj', role: 'Pincode Manager', phone: '+91 98409 66001', email: 'saravanan.636001@forgeindia.in', addedAt: '2026-02-15' };
  } else if (idStr.endsWith('3')) {
    creator = { id: 'AGT-PIN-01', name: 'Naveen Kumar M', role: 'Pincode Agent', phone: '+91 98940 55103', email: 'naveen.agent@gmail.com', addedAt: '2026-02-20' };
  } else {
    creator = { id: 'ADM-002', name: 'Ananya Iyer', role: 'District Admin', phone: '+91 98765 43211', email: 'district_admin@admin.com', addedAt: '2026-02-24' };
  }
  v.addedBy = creator;
  return v;
}

function getVendors(req, res) {
  try {
    let scoped = filterByLocation(db.vendors, req.user);

    const { search, category, status, kycStatus } = req.query;
    if (search) {
      const q = search.toLowerCase();
      scoped = scoped.filter(v =>
        v.name.toLowerCase().includes(q) ||
        (v.contactPerson && v.contactPerson.toLowerCase().includes(q)) ||
        (v.category && v.category.toLowerCase().includes(q)) ||
        (v.pincode && v.pincode.includes(q)) ||
        (v.district && v.district.toLowerCase().includes(q)) ||
        (v.division && v.division.toLowerCase().includes(q))
      );
    }
    if (category) {
      scoped = scoped.filter(v => (v.category || '').toLowerCase() === category.toLowerCase());
    }
    if (status) {
      scoped = scoped.filter(v => (v.status || '').toLowerCase() === status.toLowerCase());
    }
    if (kycStatus) {
      scoped = scoped.filter(v => (v.kycStatus || '').toLowerCase() === kycStatus.toLowerCase());
    }

    scoped.forEach(ensureVendorAddedBy);

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

    ensureVendorAddedBy(vendor);
    return res.json({ success: true, vendor });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch vendor', error: error.message });
  }
}

function lookupPincode(req, res) {
  try {
    const { pincode } = req.params;
    const hierarchy = resolvePincodeHierarchy(pincode);
    return res.json({ success: true, data: hierarchy });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to lookup pincode', error: error.message });
  }
}

function createVendor(req, res) {
  try {
    const data = req.body;
    if (!data.name || !data.phone || !data.pincode) {
      return res.status(400).json({ success: false, message: 'Business Name, Phone and Pincode are required' });
    }

    // Automatically resolve location hierarchy and assigned team based on Pincode
    const resolved = resolvePincodeHierarchy(data.pincode);

    const newVendor = {
      id: `VND-${String(db.vendors.length + 1).padStart(3, '0')}`,
      name: data.name,
      contactPerson: data.contactPerson || data.name,
      phone: data.phone,
      email: data.email || `${data.name.toLowerCase().replace(/[^a-z0-9]/g, '')}@vendor.com`,
      category: data.category || 'Services',
      
      // Automatic location hierarchy
      state: resolved.state,
      district: resolved.district,
      division: resolved.division,
      pincode: resolved.pincode,
      address: data.address || `${resolved.areaName}, ${resolved.division}, PIN: ${resolved.pincode}`,
      
      // Automatic Assigned Team (Pincode Admin, Pincode Manager, Pincode Agent)
      assignedTeam: {
        pincodeAdmin: resolved.pincodeAdmin,
        pincodeManager: resolved.pincodeManager,
        pincodeAgent: resolved.pincodeAgent
      },
      // Backward compatibility for existing agent displays
      assignedAgent: resolved.pincodeAgent,

      // Two-Stage Approval Tracking
      approvalStatus: 'Pending Pincode Admin Approval',
      kycStatus: 'Pending Pincode Admin Approval',
      status: 'Pending Verification',

      pincodeAdminApproval: {
        status: 'Pending',
        decidedBy: null,
        decidedAt: null,
        rejectionReason: null
      },
      kycTeamApproval: {
        status: 'Pending',
        decidedBy: null,
        decidedAt: null,
        rejectionReason: null
      },

      rating: 5.0,
      totalOrdersDelivered: 0,
      pendingPayout: 0,
      createdAt: new Date().toISOString(),
      addedBy: {
        id: req.user?.id || 'USR-001',
        name: req.user?.name || (req.user?.role || 'State Admin'),
        role: req.user?.role || 'State Admin',
        phone: req.user?.phone || '+91 98765 43210',
        email: req.user?.email || 'admin@forgeindia.in',
        addedAt: new Date().toISOString().split('T')[0]
      }
    };

    db.vendors.unshift(newVendor);

    // Also register in KYC records
    if (db.kycRecords) {
      db.kycRecords.unshift({
        id: `KYC-${newVendor.id}`,
        vendorId: newVendor.id,
        businessName: newVendor.name,
        name: newVendor.name,
        vendorName: newVendor.contactPerson,
        phone: newVendor.phone,
        email: newVendor.email,
        category: newVendor.category,
        address: newVendor.address,
        state: newVendor.state,
        district: newVendor.district,
        division: newVendor.division,
        pincode: newVendor.pincode,
        assignedTeam: newVendor.assignedTeam,
        status: 'Pending Pincode Admin Approval',
        type: 'Vendor',
        submittedDocuments: [
          'GST Registration Certificate',
          'Business PAN Card',
          'Trade / Municipal Health License',
          'Cancelled Cheque / Bank Passbook'
        ],
        submittedDate: new Date().toISOString().split('T')[0],
        verifiedBy: null,
        notes: 'Awaiting Pincode Admin clearance before KYC review'
      });
    }

    return res.status(201).json({ success: true, vendor: newVendor });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create vendor', error: error.message });
  }
}

/**
 * Pincode Admin Verification:
 * Step 1 in Vendor KYC workflow.
 * Action: 'Accept' | 'Reject'
 * If Reject: rejectionReason is mandatory.
 */
function pincodeAdminVerifyVendor(req, res) {
  try {
    const { id } = req.params;
    const { action, rejectionReason } = req.body;

    const vendor = db.vendors.find(v => v.id === id);
    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }

    if (req.user && req.user.role !== 'Pincode Admin' && req.user.role !== 'Super Admin') {
      return res.status(403).json({ success: false, message: 'Only Pincode Admin can perform Stage 1 verification' });
    }

    if (!['Accept', 'Reject', 'accept', 'reject'].includes(action)) {
      return res.status(400).json({ success: false, message: 'Action must be Accept or Reject' });
    }

    const isReject = action.toLowerCase() === 'reject';
    if (isReject && (!rejectionReason || !rejectionReason.trim())) {
      return res.status(400).json({ success: false, message: 'Rejection reason is mandatory when rejecting vendor' });
    }

    const decidedBy = `${req.user.name} (${req.user.role || 'Pincode Admin'})`;
    const decidedAt = new Date().toISOString();

    if (isReject) {
      vendor.pincodeAdminApproval = {
        status: 'Rejected',
        decidedBy,
        decidedAt,
        rejectionReason: rejectionReason.trim()
      };
      vendor.approvalStatus = 'Pincode Admin Rejected';
      vendor.kycStatus = 'Pincode Admin Rejected';
      vendor.status = 'Rejected';
    } else {
      vendor.pincodeAdminApproval = {
        status: 'Approved',
        decidedBy,
        decidedAt,
        rejectionReason: null
      };
      vendor.approvalStatus = 'Pincode Admin Approved';
      vendor.kycStatus = 'KYC Pending';
      vendor.status = 'Pending KYC Review';
    }

    // Sync matching KYC record
    const kycRecord = (db.kycRecords || []).find(k => k.id === `KYC-${vendor.id}` || k.vendorId === vendor.id);
    if (kycRecord) {
      kycRecord.status = vendor.kycStatus;
      kycRecord.verifiedBy = decidedBy;
      kycRecord.verifiedDate = decidedAt.split('T')[0];
      if (isReject) {
        kycRecord.notes = `Rejected by Pincode Admin: ${rejectionReason.trim()}`;
      } else {
        kycRecord.notes = 'Approved by Pincode Admin. Forwarded to KYC Team for final compliance verification.';
      }
    }

    return res.json({
      success: true,
      message: isReject ? 'Vendor rejected by Pincode Admin' : 'Vendor accepted by Pincode Admin and forwarded to KYC Team',
      vendor
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to verify vendor', error: error.message });
  }
}

/**
 * KYC Team Verification:
 * Step 2 in Vendor KYC workflow (final step).
 * Action: 'Approve' | 'Reject'
 * If Reject: rejectionReason is mandatory.
 */
function kycVerifyVendor(req, res) {
  try {
    const { id } = req.params;
    const { action, rejectionReason } = req.body;

    const vendor = db.vendors.find(v => v.id === id);
    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }

    // Ensure vendor has passed Pincode Admin approval first
    if (vendor.pincodeAdminApproval?.status !== 'Approved' && vendor.kycStatus === 'Pending Pincode Admin Approval') {
      return res.status(400).json({
        success: false,
        message: 'Vendor must be approved by the assigned Pincode Admin before KYC team verification.'
      });
    }

    if (!['Approve', 'Reject', 'approve', 'reject'].includes(action)) {
      return res.status(400).json({ success: false, message: 'Action must be Approve or Reject' });
    }

    const isReject = action.toLowerCase() === 'reject';
    if (isReject && (!rejectionReason || !rejectionReason.trim())) {
      return res.status(400).json({ success: false, message: 'Rejection reason is mandatory when rejecting KYC' });
    }

    const decidedBy = `${req.user.name} (${req.user.role || 'KYC Team'})`;
    const decidedAt = new Date().toISOString();

    if (isReject) {
      vendor.kycTeamApproval = {
        status: 'Rejected',
        decidedBy,
        decidedAt,
        rejectionReason: rejectionReason.trim()
      };
      vendor.approvalStatus = 'KYC Rejected';
      vendor.kycStatus = 'KYC Rejected';
      vendor.status = 'KYC Rejected';
    } else {
      vendor.kycTeamApproval = {
        status: 'Approved',
        decidedBy,
        decidedAt,
        rejectionReason: null
      };
      vendor.approvalStatus = 'KYC Approved';
      vendor.kycStatus = 'KYC Approved';
      vendor.status = 'Active';
    }

    // Sync KYC record
    const kycRecord = (db.kycRecords || []).find(k => k.id === `KYC-${vendor.id}` || k.vendorId === vendor.id);
    if (kycRecord) {
      kycRecord.status = vendor.kycStatus;
      kycRecord.verifiedBy = decidedBy;
      kycRecord.verifiedDate = decidedAt.split('T')[0];
      if (isReject) {
        kycRecord.notes = `KYC Rejected: ${rejectionReason.trim()}`;
      } else {
        kycRecord.notes = 'KYC Clearance Completed. Merchant certified for network platform operations.';
      }
    }

    return res.json({
      success: true,
      message: isReject ? 'Vendor KYC rejected' : 'Vendor KYC approved successfully',
      vendor
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to verify KYC', error: error.message });
  }
}

module.exports = {
  getVendors,
  getVendorById,
  createVendor,
  lookupPincode,
  pincodeAdminVerifyVendor,
  kycVerifyVendor
};
