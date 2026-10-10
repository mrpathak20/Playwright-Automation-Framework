
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

class ReportUtils {
  static getReportFilePath(reportPath) {
    // Accept either a directory or a full .xlsx file path.
    if (reportPath.endsWith('.xlsx')) {
      return reportPath;
    }

    return path.join(reportPath, 'ExecutionReport.xlsx');
  }

  static async createExcelSheet(reportPath) {
    const filePath = this.getReportFilePath(reportPath);

    await fs.promises.mkdir(path.dirname(filePath), {
      recursive: true,
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('ExecutionReport');

    worksheet.columns = [
      { header: 'Test Case', key: 'testCase', width: 25 },
      { header: 'Product', key: 'product', width: 25 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Duration (Minutes)', key: 'duration', width: 22 },
      { header: 'Error Message', key: 'errorMessage', width: 60 },
      { header: 'Policy Number', key: 'policyNumber', width: 25 },
    ];

    worksheet.getRow(1).font = { bold: true };

    await workbook.xlsx.writeFile(filePath);

    console.log(`Execution report created: ${filePath}`);
    return filePath;
  }

  static async appendTestResult(reportPath, result) {
    const filePath = this.getReportFilePath(reportPath);

    await fs.promises.mkdir(path.dirname(filePath), {
      recursive: true,
    });

    let workbook = new ExcelJS.Workbook();

    // Load only a valid, non-empty Excel workbook.
    let shouldCreateWorkbook = true;

    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);

      if (stats.size > 0) {
        try {
          await workbook.xlsx.readFile(filePath);

          if (workbook.getWorksheet('ExecutionReport')) {
            shouldCreateWorkbook = false;
          }
        } catch (error) {
          console.error(
            `Unable to read existing report: ${filePath}`,
            error.message
          );

          // Do not silently overwrite an existing report.
          throw new Error(
            `Execution report is invalid or corrupted: ${filePath}. ` +
            'Back up or remove the invalid report, then rerun the test.'
          );
        }
      }
    }

    if (shouldCreateWorkbook) {
      workbook = new ExcelJS.Workbook();

      const worksheet = workbook.addWorksheet('ExecutionReport');

      worksheet.columns = [
        { header: 'Test Case', key: 'testCase', width: 25 },
        { header: 'Product', key: 'product', width: 25 },
        { header: 'Status', key: 'status', width: 15 },
        { header: 'Duration (Minutes)', key: 'duration', width: 22 },
        { header: 'Error Message', key: 'errorMessage', width: 60 },
        { header: 'Policy Number', key: 'policyNumber', width: 25 },
      ];

      worksheet.getRow(1).font = { bold: true };
    }

    const worksheet = workbook.getWorksheet('ExecutionReport');

    if (!worksheet) {
      throw new Error(
        'ExecutionReport worksheet is missing from the workbook.'
      );
    }

    worksheet.addRow({
      testCase: result.testCase ?? '',
      product: result.product ?? '',
      status: result.status ?? '',
      duration: result.duration ?? '',
      errorMessage: result.errorMessage ?? '',
      policyNumber: result.policyNumber ?? '',
    });

    await workbook.xlsx.writeFile(filePath);

    console.log(`Execution result appended: ${filePath}`);
  }
}

module.exports = { ReportUtils };