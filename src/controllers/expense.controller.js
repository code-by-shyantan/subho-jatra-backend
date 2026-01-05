const expenseService = require('../services/expense.service');
const carService = require('../services/car.service');

exports.addExpense = async (req, res) => {
  try {
    const { carNumber, expense_date, expense_type, amount, note } = req.body;

    const car = await carService.getCarByNumber(carNumber);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const expense = await expenseService.addExpense(
      {
        car_id: car.id,
        expense_date,
        expense_type,
        amount,
        note
      },
      req.user
    );

    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMonthlyExpenses = async (req, res) => {
  try {
    const { carNumber, month } = req.params;

    const car = await carService.getCarByNumber(carNumber);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const expenses = await expenseService.getExpensesForCarAndMonth(
      car.id,
      month
    );

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch expenses' });
  }
};
