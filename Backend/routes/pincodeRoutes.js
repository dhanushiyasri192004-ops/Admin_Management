const express = require('express');
const router = express.Router();
const pincodeController = require('../controllers/pincodeController');
const authMiddleware = require('../middleware/authMiddleware');
const locationMiddleware = require('../middleware/locationMiddleware');

router.use(authMiddleware);
router.use(locationMiddleware);

router.get('/', pincodeController.getPincodes);
router.patch('/:pincode', pincodeController.updatePincodeStatus);

module.exports = router;
