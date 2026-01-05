const pool = require('../database/db');

exports.addExpense = async (data, user) => {
  const { car_id, expense_date, expense_type, amount, note } = data;

  if (!['PETROL', 'OTHER'].includes(expense_type)) {
    throw new Error('Invalid expense type');
  }

  const result = await pool.query(
    `INSERT INTO expenses
     (car_id, expense_date, expense_type, amount, note, created_by)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [car_id, expense_date, expense_type, amount, note || null, user.id]
  );

  return result.rows[0];
};

exports.getExpensesForCarAndMonth = async (carId, monthYear) => {
  const result = await pool.query(
    `SELECT *
     FROM expenses
     WHERE car_id = $1
       AND to_char(expense_date, 'YYYY-MM') = $2
     ORDER BY expense_date ASC`,
    [carId, monthYear]
  );

  return result.rows;
};
