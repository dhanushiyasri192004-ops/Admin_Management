const seed = require('../data/seedData');

// In-Memory Database store initialized from seedData
const db = {
  hierarchy: JSON.parse(JSON.stringify(seed.hierarchy)),
  admins: JSON.parse(JSON.stringify(seed.admins)),
  pincodeDetails: JSON.parse(JSON.stringify(seed.pincodeDetails)),
  customers: JSON.parse(JSON.stringify(seed.customers)),
  vendors: JSON.parse(JSON.stringify(seed.vendors)),
  vendorPayments: JSON.parse(JSON.stringify(seed.vendorPayments)),
  orders: JSON.parse(JSON.stringify(seed.orders)),
  bookings: JSON.parse(JSON.stringify(seed.bookings)),
  jobs: JSON.parse(JSON.stringify(seed.jobs)),
  technicians: JSON.parse(JSON.stringify(seed.technicians)),
  executives: JSON.parse(JSON.stringify(seed.executives)),
  supportTeam: JSON.parse(JSON.stringify(seed.supportTeam)),
  agents: JSON.parse(JSON.stringify(seed.agents)),
  agentPayments: JSON.parse(JSON.stringify(seed.agentPayments)),
  agentActivities: JSON.parse(JSON.stringify(seed.agentActivities || [])),
  kycRecords: JSON.parse(JSON.stringify(seed.kycRecords)),
  qualityCheckRecords: JSON.parse(JSON.stringify(seed.qualityCheckRecords || []))
};

/**
 * Filter items according to the admin's geographical scope:
 * - State Admin: sees all items where item.state === admin.state
 * - District Admin: sees items where item.state === admin.state AND item.district === admin.district
 * - Divisional Admin: sees items where item.state === admin.state AND item.district === admin.district AND item.division === admin.division
 * - Pincode Admin: strictly sees items where item.pincode === admin.pincode
 */
function filterByLocation(items, user) {
  if (!items || !Array.isArray(items)) return [];
  if (!user) return [];

  const { role, state, district, division, pincode } = user;

  return items.filter(item => {
    // If super admin (if any) or unrestricted
    if (role === 'Super Admin') return true;

    // Pincode Admin: strictly matches assigned Pincode
    if (role === 'Pincode Admin') {
      return item.pincode === pincode;
    }

    // Divisional Admin: matches Division (and District and State if present)
    if (role === 'Divisional Admin') {
      const matchState = !state || item.state === state;
      const matchDistrict = !district || item.district === district;
      const matchDivision = !division || item.division === division;
      return matchState && matchDistrict && matchDivision;
    }

    // District Admin: matches District and State
    if (role === 'District Admin') {
      const matchState = !state || item.state === state;
      const matchDistrict = !district || item.district === district;
      return matchState && matchDistrict;
    }

    // State Admin: matches State
    if (role === 'State Admin') {
      return !state || item.state === state;
    }

    return false;
  });
}

module.exports = {
  db,
  filterByLocation
};
