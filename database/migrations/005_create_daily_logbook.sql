CREATE TABLE IF NOT EXISTS daily_logbook (
  id SERIAL PRIMARY KEY,
  car_id INTEGER NOT NULL REFERENCES cars(id),
  log_date DATE NOT NULL,
  start_km INTEGER NOT NULL,
  end_km INTEGER NOT NULL,
  calculated_km INTEGER NOT NULL,
  calculated_amount NUMERIC(12,2) NOT NULL,
  locked BOOLEAN DEFAULT TRUE,
  created_by INTEGER NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (car_id, log_date)
);
