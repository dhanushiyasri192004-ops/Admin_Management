const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');
const locationMiddleware = require('../middleware/locationMiddleware');

router.use(authMiddleware);
router.use(locationMiddleware);

// Agent Payments
router.get('/agents', paymentController.getAgentPayments);
router.post('/agents/request', paymentController.requestAgentPayment);
router.post('/agents/:id/process', paymentController.processAgentPayment);

// Vendor Payments
router.get('/vendors', paymentController.getVendorPayments);
router.post('/vendors/:id/process', paymentController.processVendorPayment);

module.exports = router;
