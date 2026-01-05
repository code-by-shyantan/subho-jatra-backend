CREATE TABLE IF NOT EXISTS monthly_locks (
  id SERIAL PRIMARY KEY,
  car_id INTEGER NOT NULL REFERENCES cars(id),
  month_year VARCHAR(7) NOT NULL, -- YYYY-MM
  locked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  locked_by INTEGER NOT NULL REFERENCES users(id),
  unlock_reason TEXT,
  UNIQUE (car_id, month_year)
);
