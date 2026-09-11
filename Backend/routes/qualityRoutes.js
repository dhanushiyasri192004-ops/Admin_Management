const express = require('express');
const router = express.Router();
const qualityController = require('../controllers/qualityController');
const authMiddleware = require('../middleware/authMiddleware');
const locationMiddleware = require('../middleware/locationMiddleware');

router.use(authMiddleware);
router.use(locationMiddleware);

// Admin Management is strictly VIEW ONLY for Quality Check information
router.get('/', qualityController.getQualityChecks);
router.get('/:id', qualityController.getQualityCheckById);

module.exports = router;
