const express = require('express');
const router = express.Router();

const controller = require('../controllers/manager.controller');
const { authenticate, requireOwner } = require('../middlewares/auth.middleware');

// Update manager permissions
router.post(
  '/permissions',
  authenticate,
  requireOwner,
  controller.updatePermissions
);

// Enable / Disable manager
router.post(
  '/status',
  authenticate,
  requireOwner,
  controller.setStatus
);

module.exports = router;
