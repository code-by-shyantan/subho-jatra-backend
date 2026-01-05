const express = require('express');
const router = express.Router();

const controller = require('../controllers/print.controller');
const { authenticate, requireOwner } = require('../middlewares/auth.middleware');
const { requirePermission } = require('../middlewares/permission.middleware');

// Government logbook (owner-only by default)
router.get(
  '/govt/:carNumber/:month',
  authenticate,
  requireOwner,
  controller.govtLogbook
);

// Owner analysis (owner-only)
router.get(
  '/owner/:carNumber/:month',
  authenticate,
  requireOwner,
  controller.ownerAnalysis
);

module.exports = router;
