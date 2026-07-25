import { test } from '@playwright/test';
import { ReportUtils } from '../utils/ReportUtils.js';
const utils = require('../utils/CommonUtilities.js');
import { FakerUtility } from '../utils/FakerUtility.js';
const path = require('path');

const PROJECT_ROOT = process.cwd();
const REPORTS_ROOT = path.join(PROJECT_ROOT, 'reports');

const TODAYS_DATE = utils.getCurrentDate();
const REPORT_PATH = path.join(REPORTS_ROOT, TODAYS_DATE);

test.beforeAll(async () => {
  await utils.createFolder(REPORT_PATH);
  console.log(`Reports folder ready at: ${REPORT_PATH}`);

  await ReportUtils.createExcelSheet(REPORT_PATH);
});
function formatIndianCurrency(value) {
  const num = Number(value);
  return '₹' + num.toLocaleString('en-IN');
}
const testData = utils.getTestdata('test-data/userDataTDL.xlsx', 'Sheet1');
testData.forEach((data) => {
  test(`  TDL -${data.TestCase_ID}`, async ({ browser }) => {
    let globalReportPath = "";
    let policyNumber = "";
    const startTime = Date.now();
    let status = "PASS";
    let errorMessage = "";
    try {



      // write your test code here

      
    } 
    catch (error) {
      status = "FAIL";
      errorMessage = error.message || String(error);
      throw error;  // ✅ MUST
    }
    finally {
      const durationInMinutes = ((Date.now() - startTime) / 60000).toFixed(2);
    
      
      await ReportUtils.appendTestResult(REPORT_PATH, {
        testCase: `TC-${data.TestCase_ID}`,
        product: data.ProductCode,
        status,
        duration: durationInMinutes,
        errorMessage,
        policyNumber
      });

    }
    
  });
});
