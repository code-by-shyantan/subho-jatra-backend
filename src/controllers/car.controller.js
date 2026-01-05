const carService = require('../services/car.service');

exports.createCar = async (req, res) => {
  try {
    const car = await carService.createCar(req.body);
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create car' });
  }
};

exports.listCars = async (req, res) => {
  try {
    const cars = await carService.listCars();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch cars' });
  }
};

exports.getCarByNumber = async (req, res) => {
  try {
    const car = await carService.getCarByNumber(req.params.carNumber);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch car' });
  }
};
