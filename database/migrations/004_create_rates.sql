CREATE TABLE IF NOT EXISTS rates (
  id SERIAL PRIMARY KEY,
  car_id INTEGER NOT NULL REFERENCES cars(id),
  rate_per_km NUMERIC(10,2) NOT NULL,
  driver_daily_charge NUMERIC(10,2) NOT NULL,
  effective_from DATE NOT NULL,
  locked BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
