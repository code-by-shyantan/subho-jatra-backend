const express = require('express');
const router = express.Router();

const controller = require('../controllers/logbook.controller');
const { authenticate, requireOwner } = require('../middlewares/auth.middleware');
const { requirePermission } = require('../middlewares/permission.middleware');

// Add daily logbook entry
router.post(
  '/',
  authenticate,
  requirePermission('logbook_add'),
  controller.addEntry
);

// Get monthly logbook
router.get(
  '/:carNumber/:month',
  authenticate,
  controller.getMonthlyEntries
);

// Owner unlocks an entry
router.post(
  '/unlock/:entryId',
  authenticate,
  requireOwner,
  controller.unlockEntry
);

module.exports = router;
