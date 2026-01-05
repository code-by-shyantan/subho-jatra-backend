const PDFDocument = require('pdfkit');

exports.generateGovtLogbookPDF = (data) => {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });

  doc.fontSize(10);
  doc.text(`Car Number: ${data.car_number}`);
  doc.text(`Car Class: ${data.car_class}`);
  doc.text(`Period: ${data.period}`);
  doc.moveDown();

  doc.text('DATE        START KM   END KM   TOTAL KM');
  doc.moveDown(0.5);

  data.entries.forEach(e => {
    doc.text(
      `${e.log_date}    ${e.start_km}       ${e.end_km}       ${e.calculated_km}`
    );
  });

  doc.moveDown();
  doc.text(`Total KM: ${data.summary.total_km}`);
  doc.text(`Total Amount: ₹${data.summary.total_running_amount}`);

  return doc;
};

exports.generateOwnerAnalysisPDF = (data) => {
  const doc = new PDFDocument({ size: 'A4', margin: 40 });

  doc.fontSize(14).text(data.business_name);
  doc.moveDown();

  doc.fontSize(10);
  doc.text(`Car Number: ${data.car_number}`);
  doc.text(`Period: ${data.period}`);
  doc.moveDown();

  doc.text(`Total Income: ₹${data.summary.total_running_amount}`);
  doc.text(`Petrol Expense: ₹${data.summary.petrol_expense}`);
  doc.text(`Other Expense: ₹${data.summary.other_expense}`);
  doc.text(`Payouts: ₹${data.summary.payout_total}`);
  doc.moveDown();
  doc.text(`Net Profit: ₹${data.net_profit}`);

  return doc;
};
