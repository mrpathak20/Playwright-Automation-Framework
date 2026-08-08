import { ReportUtils } from '../utils/ReportUtils.js';
const utils = require('../utils/CommonUtilities.js');
import { FakerUtility } from '../utils/FakerUtility.js';
import { ENV } from "../config/environment.js";

import { test, expect } from "../fixtures/baseFixture";

const path = require('path');
const dataManager = require("../utils/dataManager");


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

        await page.goto(ENV.baseUrl);
        console.log(ENV.environment);
        await smartClick(page.locator("#login"));

        await smartFill(page.locator("#username"), "Admin");
        await smartFill(page.locator("#password"), "Password123");

        await waitForPageReady(page);
          const loginData = dataManager.load("loginData");

          console.log(loginData.validUser.username);  
          await assertion.soft.assertVisible(
        page.locator("#username")
        );

        await assertion.soft.assertVisible(
        page.locator("#password")
        );

        await assertion.soft.assertVisible(
        page.locator("#login")
        );
        const { allure } = require("allure-playwright");
        await allure.step("Click Login Button", async () => {

         await actions.smartClick(loginButton);

          });

      
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
