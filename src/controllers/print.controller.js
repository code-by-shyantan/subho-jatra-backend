const printService = require('../services/print.service');
const pdfService = require('../services/pdf.service');
const monthlyLockService = require('../services/monthlyLock.service');
const carService = require('../services/car.service');

exports.govtLogbook = async (req, res) => {
  try {
    const { carNumber, month } = req.params;

    const data = await printService.prepareGovtLogbookData(carNumber, month);
    const doc = pdfService.generateGovtLogbookPDF(data);

    const car = await carService.getCarByNumber(carNumber);
    await monthlyLockService.lockMonth(car.id, month, req.user.id);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `inline; filename=govt_logbook_${carNumber}_${month}.pdf`
    );

    doc.pipe(res);
    doc.end();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.ownerAnalysis = async (req, res) => {
  try {
    const { carNumber, month } = req.params;

    const data = await printService.prepareOwnerAnalysisData(carNumber, month);
    const doc = pdfService.generateOwnerAnalysisPDF(data);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `inline; filename=owner_analysis_${carNumber}_${month}.pdf`
    );

    doc.pipe(res);
    doc.end();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
