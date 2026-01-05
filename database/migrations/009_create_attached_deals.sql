CREATE TABLE IF NOT EXISTS attached_deals (
  id SERIAL PRIMARY KEY,
  car_id INTEGER NOT NULL REFERENCES cars(id),
  payout_mode VARCHAR(10) NOT NULL CHECK (payout_mode IN ('PER_KM', 'DAILY', 'BOTH')),
  owner_rate_per_km NUMERIC(10,2),
  owner_daily_rate NUMERIC(10,2),
  driver_daily_wage NUMERIC(10,2),
  locked BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (car_id)
);
