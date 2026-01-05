const rateService = require('../services/rate.service');
const carService = require('../services/car.service');

exports.addRate = async (req, res) => {
  try {
    const { carNumber, rate_per_km, driver_daily_charge, effective_from } = req.body;

    const car = await carService.getCarByNumber(carNumber);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const rate = await rateService.addRate(
      car.id,
      rate_per_km,
      driver_daily_charge,
      effective_from
    );

    res.status(201).json(rate);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add rate' });
  }
};
