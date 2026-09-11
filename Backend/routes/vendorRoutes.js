const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const authMiddleware = require('../middleware/authMiddleware');
const locationMiddleware = require('../middleware/locationMiddleware');

router.use(authMiddleware);
router.use(locationMiddleware);

router.get('/', vendorController.getVendors);
router.post('/', vendorController.createVendor);
router.get('/lookup-pincode/:pincode', vendorController.lookupPincode);
router.get('/:id', vendorController.getVendorById);
router.post('/:id/pincode-verify', vendorController.pincodeAdminVerifyVendor);
router.post('/:id/kyc-verify', vendorController.kycVerifyVendor);

module.exports = router;
