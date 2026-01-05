const pool = require('../database/db');

exports.createPayout = async (carId, month, type, amount, userId) => {
  const result = await pool.query(
    `INSERT INTO payouts
     (car_id, payout_month, payout_type, amount, created_by)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [carId, month, type, amount, userId]
  );
  return result.rows[0];
};

exports.markPaid = async (payoutId) => {
  await pool.query(
    `UPDATE payouts
     SET status = 'PAID'
     WHERE id = $1`,
    [payoutId]
  );
};

exports.getPayoutsForCarAndMonth = async (carId, month) => {
  const result = await pool.query(
    `SELECT *
     FROM payouts
     WHERE car_id = $1 AND payout_month = $2
     ORDER BY payout_type`,
    [carId, month]
  );
  return result.rows;
};
