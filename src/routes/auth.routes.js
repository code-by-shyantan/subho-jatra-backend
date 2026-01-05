const express = require('express');
const router = express.Router();

const controller = require('../controllers/auth.controller');
const { authenticate, requireOwner } = require('../middlewares/auth.middleware');

// Owner login
router.post('/owner/login', controller.ownerLogin);

// Manager login
router.post('/manager/login', controller.managerLogin);

// Owner resets manager password
router.post(
  '/owner/reset-manager-password',
  authenticate,
  requireOwner,
  controller.resetManagerPassword
);

module.exports = router;
