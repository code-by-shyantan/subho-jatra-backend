const logbookService = require('../services/logbook.service');
const carService = require('../services/car.service');

exports.addEntry = async (req, res) => {
  try {
    const { carNumber, log_date, start_km, end_km } = req.body;

    const car = await carService.getCarByNumber(carNumber);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const entry = await logbookService.addDailyEntry(
      {
        car_id: car.id,
        log_date,
        start_km,
        end_km
      },
      req.user
    );

    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMonthlyEntries = async (req, res) => {
  try {
    const { carNumber, month } = req.params;

    const car = await carService.getCarByNumber(carNumber);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const entries = await logbookService.getEntriesForCarAndMonth(
      car.id,
      month
    );

    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch logbook entries' });
  }
};

exports.unlockEntry = async (req, res) => {
  try {
    const { entryId } = req.params;
    await logbookService.unlockEntry(entryId);
    res.json({ message: 'Entry unlocked' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to unlock entry' });
  }
};
