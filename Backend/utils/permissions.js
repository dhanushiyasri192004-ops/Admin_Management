const ROLE_HIERARCHY = {
  'State Admin': 4,
  'District Admin': 3,
  'Divisional Admin': 2,
  'Pincode Admin': 1
};

const MODULE_PERMISSIONS = {
  'Customers': ['State Admin', 'District Admin', 'Divisional Admin', 'Pincode Admin'],
  'Membership Cards': ['State Admin', 'District Admin', 'Divisional Admin', 'Pincode Admin'],
  'Vendors': ['State Admin', 'District Admin', 'Divisional Admin', 'Pincode Admin'],
  'Vendor Payments': ['State Admin', 'District Admin', 'Divisional Admin', 'Pincode Admin'],
  'Pincode Manager': ['State Admin', 'District Admin', 'Divisional Admin', 'Pincode Admin'],
  'Business Reports': ['State Admin', 'District Admin', 'Divisional Admin', 'Pincode Admin'],
  'KYC': ['State Admin', 'District Admin', 'Divisional Admin', 'Pincode Admin'],
  'Orders': ['State Admin', 'District Admin', 'Divisional Admin', 'Pincode Admin'],
  'Bookings': ['State Admin', 'District Admin', 'Divisional Admin', 'Pincode Admin'],
  'Jobs': ['State Admin', 'District Admin', 'Divisional Admin', 'Pincode Admin'],
  'Technicians': ['State Admin', 'District Admin', 'Divisional Admin', 'Pincode Admin'],
  'Executives': ['State Admin', 'District Admin', 'Divisional Admin', 'Pincode Admin'],
  'Support Team': ['State Admin', 'District Admin', 'Divisional Admin', 'Pincode Admin'],
  'Agents': ['State Admin', 'District Admin', 'Divisional Admin', 'Pincode Admin'],
  'Agent Payments': ['State Admin', 'District Admin', 'Divisional Admin', 'Pincode Admin']
};

function hasPermission(role, moduleName) {
  const allowedRoles = MODULE_PERMISSIONS[moduleName];
  if (!allowedRoles) return true;
  return allowedRoles.includes(role);
}

module.exports = {
  ROLE_HIERARCHY,
  MODULE_PERMISSIONS,
  hasPermission
};
