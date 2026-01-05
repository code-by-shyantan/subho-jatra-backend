require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const managerRoutes = require('./routes/manager.routes');
const carRoutes = require('./routes/car.routes');
const rateRoutes = require('./routes/rate.routes');
const logbookRoutes = require('./routes/logbook.routes');
const expenseRoutes = require('./routes/expense.routes');
const payoutRoutes = require('./routes/payout.routes');
const printRoutes = require('./routes/print.routes');
const healthRoutes = require('./routes/health.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/rates', rateRoutes);
app.use('/api/logbook', logbookRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/payouts', payoutRoutes);
app.use('/api/prints', printRoutes);

// Fallback
app.use((req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
