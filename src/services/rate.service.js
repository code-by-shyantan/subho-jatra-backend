const pool = require('../database/db');

exports.addRate = async (carId, ratePerKm, driverCharge, effectiveFrom) => {
  const result = await pool.query(
    `INSERT INTO rates (car_id, rate_per_km, driver_daily_charge, effective_from)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [carId, ratePerKm, driverCharge, effectiveFrom]
  );
  return result.rows[0];
};

exports.getActiveRateForDate = async (carId, date) => {
  const result = await pool.query(
    `SELECT *
     FROM rates
     WHERE car_id = $1
       AND effective_from <= $2
     ORDER BY effective_from DESC
     LIMIT 1`,
    [carId, date]
  );
  return result.rows[0];
};
