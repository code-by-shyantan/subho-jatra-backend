const pool = require('../database/db');

exports.getMonthlySummary = async (carId, month) => {
  const logbook = await pool.query(
    `SELECT
        COALESCE(SUM(calculated_km), 0) AS total_km,
        COALESCE(SUM(calculated_amount), 0) AS total_running_amount
     FROM daily_logbook
     WHERE car_id = $1
       AND to_char(log_date, 'YYYY-MM') = $2`,
    [carId, month]
  );

  const expenses = await pool.query(
    `SELECT
        COALESCE(SUM(CASE WHEN expense_type = 'PETROL' THEN amount ELSE 0 END), 0) AS petrol_total,
        COALESCE(SUM(CASE WHEN expense_type = 'OTHER' THEN amount ELSE 0 END), 0) AS other_total
     FROM expenses
     WHERE car_id = $1
       AND to_char(expense_date, 'YYYY-MM') = $2`,
    [carId, month]
  );

  const payouts = await pool.query(
    `SELECT
        COALESCE(SUM(amount), 0) AS payout_total
     FROM payouts
     WHERE car_id = $1
       AND payout_month = $2`,
    [carId, month]
  );

  return {
    total_km: Number(logbook.rows[0].total_km),
    total_running_amount: Number(logbook.rows[0].total_running_amount),
    petrol_expense: Number(expenses.rows[0].petrol_total),
    other_expense: Number(expenses.rows[0].other_total),
    payout_total: Number(payouts.rows[0].payout_total)
  };
};
