const express = require('express');
const router = express.Router();

const controller = require('../controllers/rate.controller');
const { authenticate, requireOwner } = require('../middlewares/auth.middleware');

// Add rate to a car
router.post('/', authenticate, requireOwner, controller.addRate);

module.exports = router;
