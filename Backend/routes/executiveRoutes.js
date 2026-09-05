const express = require('express');
const router = express.Router();
const executiveController = require('../controllers/executiveController');
const authMiddleware = require('../middleware/authMiddleware');
const locationMiddleware = require('../middleware/locationMiddleware');

router.use(authMiddleware);
router.use(locationMiddleware);

router.get('/executives', executiveController.getExecutives);
router.get('/support-team', executiveController.getSupportTeam);
router.patch('/support-team/:id', executiveController.updateTicketStatus);
router.get('/agents', executiveController.getAgents);

module.exports = router;
