const carService = require('../services/car.service');
const attachedDealService = require('../services/attachedDeal.service');
const payoutService = require('../services/payout.service');

exports.createAttachedDeal = async (req, res) => {
  try {
    const { carNumber, payout_mode, owner_rate_per_km, owner_daily_rate, driver_daily_wage } = req.body;

    const car = await carService.getCarByNumber(carNumber);
    if (!car || car.ownership_type !== 'ATTACHED') {
      return res.status(400).json({ message: 'Attached car not found' });
    }

    const deal = await attachedDealService.createDeal(car.id, {
      payout_mode,
      owner_rate_per_km,
      owner_daily_rate,
      driver_daily_wage
    });

    res.status(201).json(deal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.createMonthlyPayout = async (req, res) => {
  try {
    const { carNumber, month, payout_type, amount } = req.body;

    const car = await carService.getCarByNumber(carNumber);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const payout = await payoutService.createPayout(
      car.id,
      month,
      payout_type,
      amount,
      req.user.id
    );

    res.status(201).json(payout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.markPayoutPaid = async (req, res) => {
  try {
    const { payoutId } = req.params;
    await payoutService.markPaid(payoutId);
    res.json({ message: 'Payout marked as PAID' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to mark payout as paid' });
  }
};

exports.getMonthlyPayouts = async (req, res) => {
  try {
    const { carNumber, month } = req.params;

    const car = await carService.getCarByNumber(carNumber);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const payouts = await payoutService.getPayoutsForCarAndMonth(car.id, month);
    res.json(payouts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch payouts' });
  }
};
