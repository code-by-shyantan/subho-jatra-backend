const logbookService = require('./logbook.service');
const expenseService = require('./expense.service');
const payoutService = require('./payout.service');
const summaryService = require('./summary.service');
const carService = require('./car.service');

exports.prepareGovtLogbookData = async (carNumber, month) => {
  const car = await carService.getCarByNumber(carNumber);
  if (!car) throw new Error('Car not found');

  const entries = await logbookService.getEntriesForCarAndMonth(car.id, month);
  const summary = await summaryService.getMonthlySummary(car.id, month);

  return {
    car_number: car.car_number,
    car_class: car.car_class,
    period: month,
    entries,
    summary
  };
};

exports.prepareOwnerAnalysisData = async (carNumber, month) => {
  const car = await carService.getCarByNumber(carNumber);
  if (!car) throw new Error('Car not found');

  const entries = await logbookService.getEntriesForCarAndMonth(car.id, month);
  const expenses = await expenseService.getExpensesForCarAndMonth(car.id, month);
  const payouts = await payoutService.getPayoutsForCarAndMonth(car.id, month);
  const summary = await summaryService.getMonthlySummary(car.id, month);

  return {
    business_name: 'SUBHO JATRA TRAVEL AGENCY',
    car_number: car.car_number,
    ownership_type: car.ownership_type,
    period: month,
    entries,
    expenses,
    payouts,
    summary,
    net_profit:
      summary.total_running_amount -
      (summary.petrol_expense + summary.other_expense + summary.payout_total)
  };
};
