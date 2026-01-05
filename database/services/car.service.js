const pool = require('../database/db');

exports.createCar = async (data) => {
  const { car_number, ownership_type, car_class, department } = data;

  const result = await pool.query(
    `INSERT INTO cars (car_number, ownership_type, car_class, department)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [car_number, ownership_type, car_class, department || null]
  );

  return result.rows[0];
};

exports.listCars = async () => {
  const result = await pool.query(
    'SELECT * FROM cars ORDER BY created_at DESC'
  );
  return result.rows;
};

exports.getCarByNumber = async (carNumber) => {
  const result = await pool.query(
    'SELECT * FROM cars WHERE car_number = $1 LIMIT 1',
    [carNumber]
  );
  return result.rows[0];
};
