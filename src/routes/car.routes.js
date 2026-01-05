const express = require('express');
const router = express.Router();

const controller = require('../controllers/car.controller');
const { authenticate, requireOwner } = require('../middlewares/auth.middleware');

// Owner creates car
router.post('/', authenticate, requireOwner, controller.createCar);

// Owner & Manager can view cars
router.get('/', authenticate, controller.listCars);

// Get car by number
router.get('/:carNumber', authenticate, controller.getCarByNumber);

module.exports = router;
