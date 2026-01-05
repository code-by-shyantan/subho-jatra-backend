const pool = require('../database/db');
const rateService = require('./rate.service');

exports.addDailyEntry = async (data, user) => {
  const { car_id, log_date, start_km, end_km } = data;

  if (end_km < start_km) {
    throw new Error('End KM cannot be less than Start KM');
  }

  const rate = await rateService.getActiveRateForDate(car_id, log_date);
  if (!rate) {
    throw new Error('No active rate found for this date');
  }

  const calculatedKm = end_km - start_km;
  const calculatedAmount = calculatedKm * Number(rate.rate_per_km);

  const result = await pool.query(
    `INSERT INTO daily_logbook
     (car_id, log_date, start_km, end_km, calculated_km, calculated_amount, locked, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, TRUE, $7)
     RETURNING *`,
    [car_id, log_date, start_km, end_km, calculatedKm, calculatedAmount, user.id]
  );

  return result.rows[0];
};

exports.getEntriesForCarAndMonth = async (carId, monthYear) => {
  const result = await pool.query(
    `SELECT *
     FROM daily_logbook
     WHERE car_id = $1
       AND to_char(log_date, 'YYYY-MM') = $2
     ORDER BY log_date ASC`,
    [carId, monthYear]
  );

  return result.rows;
};

exports.unlockEntry = async (entryId) => {
  await pool.query(
    'UPDATE daily_logbook SET locked = FALSE WHERE id = $1',
    [entryId]
  );
};
