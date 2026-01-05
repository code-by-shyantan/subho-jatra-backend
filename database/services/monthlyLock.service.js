const pool = require('../database/db');

exports.lockMonth = async (carId, month, userId) => {
  await pool.query(
    `INSERT INTO monthly_locks (car_id, month_year, locked_by)
     VALUES ($1, $2, $3)
     ON CONFLICT (car_id, month_year) DO NOTHING`,
    [carId, month, userId]
  );
};

exports.isMonthLocked = async (carId, month) => {
  const result = await pool.query(
    'SELECT 1 FROM monthly_locks WHERE car_id = $1 AND month_year = $2',
    [carId, month]
  );
  return result.rowCount > 0;
};
