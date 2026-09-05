const bcrypt = require('bcryptjs');
const { db } = require('../config/db');
const { generateToken } = require('../utils/jwt');

function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const admin = db.admins.find(a => a.email.toLowerCase() === email.toLowerCase());
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = bcrypt.compareSync(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(admin);

    const userProfile = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      state: admin.state,
      district: admin.district,
      division: admin.division,
      pincode: admin.pincode,
      avatar: admin.avatar,
      phone: admin.phone
    };

    return res.json({
      success: true,
      message: `Welcome ${admin.name}. Logged in as ${admin.role}.`,
      token,
      user: userProfile
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Login failed', error: error.message });
  }
}

function getMe(req, res) {
  try {
    const admin = db.admins.find(a => a.id === req.user.id);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    return res.json({
      success: true,
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        state: admin.state,
        district: admin.district,
        division: admin.division,
        pincode: admin.pincode,
        avatar: admin.avatar,
        phone: admin.phone
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch user', error: error.message });
  }
}

function getDemoAdmins(req, res) {
  // Returns sanitized list of demo accounts for 1-click test login
  const demoList = db.admins.map(a => ({
    id: a.id,
    name: a.name,
    email: a.email,
    role: a.role,
    state: a.state,
    district: a.district,
    division: a.division,
    pincode: a.pincode,
    avatar: a.avatar
  }));
  return res.json({ success: true, admins: demoList });
}

module.exports = {
  login,
  getMe,
  getDemoAdmins
};
