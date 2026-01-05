const express = require('express');
const router = express.Router();

const controller = require('../controllers/payout.controller');
const { authenticate, requireOwner } = require('../middlewares/auth.middleware');
const { requirePermission } = require('../middlewares/permission.middleware');

// Owner: one-time attached deal setup
router.post(
  '/attached-deal',
  authenticate,
  requireOwner,
  controller.createAttachedDeal
);

// Create monthly payout (salary / attached owner)
router.post(
  '/',
  authenticate,
  requirePermission('salary_mark_paid'),
  controller.createMonthlyPayout
);

// Mark payout as PAID
router.post(
  '/paid/:payoutId',
  authenticate,
  requirePermission('salary_mark_paid'),
  controller.markPayoutPaid
);

// Get monthly payouts
router.get(
  '/:carNumber/:month',
  authenticate,
  controller.getMonthlyPayouts
);

module.exports = router;
