CREATE TABLE IF NOT EXISTS cars (
  id SERIAL PRIMARY KEY,
  car_number VARCHAR(20) UNIQUE NOT NULL,
  ownership_type VARCHAR(10) NOT NULL CHECK (ownership_type IN ('OWNED', 'ATTACHED')),
  car_class VARCHAR(20) NOT NULL,
  department VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
