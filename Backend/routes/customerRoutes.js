const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authMiddleware = require('../middleware/authMiddleware');
const locationMiddleware = require('../middleware/locationMiddleware');

router.use(authMiddleware);
router.use(locationMiddleware);

router.get('/', customerController.getCustomers);
router.get('/membership-cards', customerController.getMembershipCards);
router.post('/upgrade-membership', customerController.upgradeMembership);

module.exports = router;
