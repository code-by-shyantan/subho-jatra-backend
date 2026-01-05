CREATE TABLE IF NOT EXISTS payouts (
  id SERIAL PRIMARY KEY,
  car_id INTEGER NOT NULL REFERENCES cars(id),
  payout_month VARCHAR(7) NOT NULL, -- YYYY-MM
  payout_type VARCHAR(20) NOT NULL CHECK (payout_type IN ('DRIVER_SALARY', 'ATTACHED_OWNER')),
  amount NUMERIC(12,2) NOT NULL,
  status VARCHAR(10) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PAID')),
  created_by INTEGER NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (car_id, payout_month, payout_type)
);
