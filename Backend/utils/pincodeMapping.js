/**
 * Comprehensive Pincode to Location Hierarchy and Assigned Team Directory
 * Automatically maps any postal code to:
 * State -> District -> Division -> Pincode
 * And resolves the responsible Pincode Admin, Pincode Manager, and Pincode Agent.
 */

const PINCODE_MAP = {
  // Salem District - Salem North Division
  '636001': {
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    areaName: 'Salem Town Fort',
    pincodeAdmin: {
      id: 'ADM-PIN-01',
      name: 'Priya Narayanan',
      role: 'Pincode Admin',
      phone: '+91 98765 43213',
      email: 'priya.salem636001@forgeindia.in'
    },
    pincodeManager: {
      id: 'MGR-PIN-01',
      name: 'Saravanan Muthuraj',
      role: 'Pincode Manager',
      phone: '+91 98409 66001',
      email: 'saravanan.636001@forgeindia.in'
    },
    pincodeAgent: {
      id: 'AGT-PIN-01',
      name: 'Naveen Kumar M',
      role: 'Pincode Agent',
      phone: '+91 98940 55103',
      email: 'naveen.agent@gmail.com'
    }
  },
  '636002': {
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636002',
    areaName: 'Shevapet & Market Area',
    pincodeAdmin: {
      id: 'ADM-PIN-02',
      name: 'Suresh Raina',
      role: 'Pincode Admin',
      phone: '+91 98765 43214',
      email: 'suresh.salem636002@forgeindia.in'
    },
    pincodeManager: {
      id: 'MGR-PIN-02',
      name: 'Deepak Chandrasekar',
      role: 'Pincode Manager',
      phone: '+91 98409 66002',
      email: 'deepak.636002@forgeindia.in'
    },
    pincodeAgent: {
      id: 'AGT-PIN-02',
      name: 'Dinesh Karthik R',
      role: 'Pincode Agent',
      phone: '+91 98940 88201',
      email: 'dinesh.pincode@gmail.com'
    }
  },
  '636007': {
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636007',
    areaName: 'Alagapuram & Fairlands Zone',
    pincodeAdmin: {
      id: 'ADM-PIN-07',
      name: 'Kavitha Shanmugam',
      role: 'Pincode Admin',
      phone: '+91 98765 43217',
      email: 'kavitha.salem636007@forgeindia.in'
    },
    pincodeManager: {
      id: 'MGR-PIN-07',
      name: 'Ramesh Balakrishnan',
      role: 'Pincode Manager',
      phone: '+91 98409 66007',
      email: 'ramesh.636007@forgeindia.in'
    },
    pincodeAgent: {
      id: 'AGT-PIN-07',
      name: 'Vigneshwaran S',
      role: 'Pincode Agent',
      phone: '+91 98940 88207',
      email: 'vignesh.agent@gmail.com'
    }
  },

  // Salem District - Salem South Division
  '636003': {
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem South',
    pincode: '636003',
    areaName: 'Ammapet Colony',
    pincodeAdmin: {
      id: 'ADM-PIN-03',
      name: 'Venkatesh Babu',
      role: 'Pincode Admin',
      phone: '+91 98765 43215',
      email: 'venkatesh.salem636003@forgeindia.in'
    },
    pincodeManager: {
      id: 'MGR-PIN-03',
      name: 'Bhuvaneshwari P',
      role: 'Pincode Manager',
      phone: '+91 98409 66003',
      email: 'bhuvana.636003@forgeindia.in'
    },
    pincodeAgent: {
      id: 'AGT-PIN-03',
      name: 'Pravin Chandran',
      role: 'Pincode Agent',
      phone: '+91 98940 88202',
      email: 'pravin.pincode@gmail.com'
    }
  },
  '636004': {
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem South',
    pincode: '636004',
    areaName: 'Gugai Industrial Area',
    pincodeAdmin: {
      id: 'ADM-PIN-04',
      name: 'Meena Kumari',
      role: 'Pincode Admin',
      phone: '+91 98765 43216',
      email: 'meena.salem636004@forgeindia.in'
    },
    pincodeManager: {
      id: 'MGR-PIN-04',
      name: 'Karthikeyan Natarajan',
      role: 'Pincode Manager',
      phone: '+91 98409 66004',
      email: 'karthi.636004@forgeindia.in'
    },
    pincodeAgent: {
      id: 'AGT-PIN-04',
      name: 'Murugesan K',
      role: 'Pincode Agent',
      phone: '+91 98940 88204',
      email: 'murugesan.agent@gmail.com'
    }
  },

  // Coimbatore District - Coimbatore Central
  '641001': {
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    division: 'Coimbatore Central',
    pincode: '641001',
    areaName: 'Town Hall & Big Bazaar',
    pincodeAdmin: {
      id: 'ADM-PIN-11',
      name: 'Arun Kumar',
      role: 'Pincode Admin',
      phone: '+91 98765 43221',
      email: 'arun.cbe641001@forgeindia.in'
    },
    pincodeManager: {
      id: 'MGR-PIN-11',
      name: 'Swaminathan V',
      role: 'Pincode Manager',
      phone: '+91 98409 66011',
      email: 'swami.641001@forgeindia.in'
    },
    pincodeAgent: {
      id: 'AGT-PIN-11',
      name: 'Kishore Kumar',
      role: 'Pincode Agent',
      phone: '+91 98940 88211',
      email: 'kishore.agent@gmail.com'
    }
  },
  '641002': {
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    division: 'Coimbatore Central',
    pincode: '641002',
    areaName: 'RS Puram & DB Road',
    pincodeAdmin: {
      id: 'ADM-PIN-12',
      name: 'Deepa Rajan',
      role: 'Pincode Admin',
      phone: '+91 98765 43222',
      email: 'deepa.cbe641002@forgeindia.in'
    },
    pincodeManager: {
      id: 'MGR-PIN-12',
      name: 'Prasanna Venkatesh',
      role: 'Pincode Manager',
      phone: '+91 98409 66012',
      email: 'prasanna.641002@forgeindia.in'
    },
    pincodeAgent: {
      id: 'AGT-PIN-12',
      name: 'Manoj Prabhakar',
      role: 'Pincode Agent',
      phone: '+91 98940 88212',
      email: 'manoj.agent@gmail.com'
    }
  }
};

/**
 * Resolve location hierarchy and assigned team for a given pincode.
 * If pincode is not predefined, generates a deterministic mapping based on prefix/format.
 */
function resolvePincodeHierarchy(pincode) {
  const pin = String(pincode || '').trim();
  if (PINCODE_MAP[pin]) {
    return PINCODE_MAP[pin];
  }

  // Fallback heuristic for any custom pincode in Tamil Nadu or other states
  let state = 'Tamil Nadu';
  let district = 'Salem';
  let division = 'Salem North';

  if (pin.startsWith('641')) {
    district = 'Coimbatore';
    division = 'Coimbatore Central';
  } else if (pin.startsWith('600')) {
    district = 'Chennai';
    division = 'Chennai Central';
  } else if (pin.startsWith('625')) {
    district = 'Madurai';
    division = 'Madurai Central';
  } else if (pin.startsWith('411')) {
    state = 'Maharashtra';
    district = 'Pune';
    division = 'Pune West';
  }

  return {
    state,
    district,
    division,
    pincode: pin || '636001',
    areaName: `${division} Local Zone`,
    pincodeAdmin: {
      id: `ADM-PIN-${pin.slice(-3) || '999'}`,
      name: `Zonal Admin (${pin || 'Default'})`,
      role: 'Pincode Admin',
      phone: '+91 98765 43299',
      email: `admin.${pin}@forgeindia.in`
    },
    pincodeManager: {
      id: `MGR-PIN-${pin.slice(-3) || '999'}`,
      name: `Operations Manager (${pin || 'Default'})`,
      role: 'Pincode Manager',
      phone: '+91 98409 66099',
      email: `manager.${pin}@forgeindia.in`
    },
    pincodeAgent: {
      id: `AGT-PIN-${pin.slice(-3) || '999'}`,
      name: `Field Agent (${pin || 'Default'})`,
      role: 'Pincode Agent',
      phone: '+91 98940 88299',
      email: `agent.${pin}@gmail.com`
    }
  };
}

module.exports = {
  PINCODE_MAP,
  resolvePincodeHierarchy
};
