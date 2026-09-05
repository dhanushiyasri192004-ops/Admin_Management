const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');
const locationMiddleware = require('../middleware/locationMiddleware');

router.use(authMiddleware);
router.use(locationMiddleware);

router.get('/dashboard-summary', reportController.getDashboardSummary);
router.get('/business-reports', reportController.getBusinessReports);

module.exports = router;
