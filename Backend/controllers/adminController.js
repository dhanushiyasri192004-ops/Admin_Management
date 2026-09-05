const { db, filterByLocation } = require('../config/db');

function getHierarchy(req, res) {
  try {
    const { role, state, district, division, pincode } = req.user;
    let fullHierarchy = db.hierarchy.states;

    // Filter hierarchy according to role scope
    if (role === 'State Admin') {
      fullHierarchy = fullHierarchy.filter(s => s.name === state);
    } else if (role === 'District Admin') {
      fullHierarchy = fullHierarchy
        .filter(s => s.name === state)
        .map(s => ({
          ...s,
          districts: s.districts.filter(d => d.name === district)
        }));
    } else if (role === 'Divisional Admin') {
      fullHierarchy = fullHierarchy
        .filter(s => s.name === state)
        .map(s => ({
          ...s,
          districts: s.districts
            .filter(d => d.name === district)
            .map(d => ({
              ...d,
              divisions: d.divisions.filter(div => div.name === division)
            }))
        }));
    } else if (role === 'Pincode Admin') {
      fullHierarchy = fullHierarchy
        .filter(s => s.name === state)
        .map(s => ({
          ...s,
          districts: s.districts
            .filter(d => d.name === district)
            .map(d => ({
              ...d,
              divisions: d.divisions
                .filter(div => div.name === division)
                .map(div => ({
                  ...div,
                  pincodes: div.pincodes.filter(pin => pin === pincode)
                }))
            }))
        }));
    }

    return res.json({ success: true, hierarchy: fullHierarchy });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch hierarchy', error: error.message });
  }
}

function getSubordinateAdmins(req, res) {
  try {
    const { role } = req.user;
    const scopedAdmins = filterByLocation(db.admins, req.user);
    return res.json({ success: true, admins: scopedAdmins });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch admins', error: error.message });
  }
}

function getDistricts(req, res) {
  try {
    const stateObj = db.hierarchy.states.find(s => s.name === req.user.state);
    if (!stateObj) return res.json({ success: true, districts: [] });

    let districts = stateObj.districts;
    if (req.user.role === 'District Admin' || req.user.role === 'Divisional Admin' || req.user.role === 'Pincode Admin') {
      districts = districts.filter(d => d.name === req.user.district);
    }
    return res.json({ success: true, districts });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch districts', error: error.message });
  }
}

function getDivisions(req, res) {
  try {
    const stateObj = db.hierarchy.states.find(s => s.name === req.user.state);
    if (!stateObj) return res.json({ success: true, divisions: [] });

    let divisions = [];
    stateObj.districts.forEach(d => {
      if (!req.user.district || d.name === req.user.district) {
        d.divisions.forEach(div => {
          if (!req.user.division || div.name === req.user.division) {
            divisions.push({
              ...div,
              districtName: d.name,
              stateName: stateObj.name
            });
          }
        });
      }
    });

    return res.json({ success: true, divisions });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch divisions', error: error.message });
  }
}

module.exports = {
  getHierarchy,
  getSubordinateAdmins,
  getDistricts,
  getDivisions
};
