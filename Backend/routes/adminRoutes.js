const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const locationMiddleware = require('../middleware/locationMiddleware');

router.use(authMiddleware);
router.use(locationMiddleware);

router.get('/hierarchy', adminController.getHierarchy);
router.get('/subordinates', adminController.getSubordinateAdmins);
router.get('/districts', adminController.getDistricts);
router.get('/divisions', adminController.getDivisions);

module.exports = router;
