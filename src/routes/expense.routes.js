const express = require('express');
const router = express.Router();

const controller = require('../controllers/expense.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { requirePermission } = require('../middlewares/permission.middleware');

// Add expense (petrol / other)
router.post(
  '/',
  authenticate,
  requirePermission('expense_add'),
  controller.addExpense
);

// Get monthly expenses
router.get(
  '/:carNumber/:month',
  authenticate,
  controller.getMonthlyExpenses
);

module.exports = router;
