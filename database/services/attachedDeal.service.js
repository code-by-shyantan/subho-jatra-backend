const pool = require('../database/db');

exports.createDeal = async (carId, data) => {
  const { payout_mode, owner_rate_per_km, owner_daily_rate, driver_daily_wage } = data;

  const result = await pool.query(
    `INSERT INTO attached_deals
     (car_id, payout_mode, owner_rate_per_km, owner_daily_rate, driver_daily_wage)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [
      carId,
      payout_mode,
      owner_rate_per_km || null,
      owner_daily_rate || null,
      driver_daily_wage || null
    ]
  );

  return result.rows[0];
};

exports.getDealByCarId = async (carId) => {
  const result = await pool.query(
    'SELECT * FROM attached_deals WHERE car_id = $1 LIMIT 1',
    [carId]
  );
  return result.rows[0];
};
