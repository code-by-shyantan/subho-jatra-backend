CREATE TABLE IF NOT EXISTS expenses (
  id SERIAL PRIMARY KEY,
  car_id INTEGER NOT NULL REFERENCES cars(id),
  expense_date DATE NOT NULL,
  expense_type VARCHAR(10) NOT NULL CHECK (expense_type IN ('PETROL', 'OTHER')),
  amount NUMERIC(12,2) NOT NULL,
  note TEXT,
  created_by INTEGER NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
