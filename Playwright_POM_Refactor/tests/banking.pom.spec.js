import { ReportUtils } from '../utils/ReportUtils.js';
import { FakerUtility } from '../utils/FakerUtility.js';
import { ENV } from '../config/environment.js';
import { test } from '../fixtures/baseFixture.js';

const utils = require('../utils/CommonUtilities.js');
const path = require('path');
const { takeScreenshot } = require('../utils/CommonUtilities.js');

import { BankingHomePage } from '../pages/BankingHomePage.js';
import { RegistrationPage } from '../pages/RegistrationPage.js';
import { FundTransferPage } from '../pages/FundTransferPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';

const PROJECT_ROOT = process.cwd();
const REPORTS_ROOT = path.join(PROJECT_ROOT, 'reports');
const TODAYS_DATE = utils.getCurrentDate();
const REPORT_PATH = path.join(REPORTS_ROOT, TODAYS_DATE);

const step = async (name, action) => {
  console.log(`\n▶ ${name}`);
  await action();
  console.log(`✓ ${name}`);
};

test.beforeAll(async () => {
  await utils.createFolder(REPORT_PATH);
  console.log(`Reports folder ready at: ${REPORT_PATH}`);
  await ReportUtils.createExcelSheet(REPORT_PATH);
});

const testData = utils.getTestdata(
  'test-data/userDataTDL.xlsx',
  'Sheet1'
);

testData.forEach((data) => {
  test(`test-${data.TestCase_ID}`, async ({ page, assertion }) => {
    let policyNumber = '';
    const startTime = Date.now();
    let status = 'PASS';
    let errorMessage = '';

    const bankingHomePage = new BankingHomePage(page, assertion);
    const registrationPage = new RegistrationPage(
      page,
      assertion,
      FakerUtility
    );
    const fundTransferPage = new FundTransferPage(page, assertion);
    const dashboardPage = new DashboardPage(page, assertion);

    try {
      await step('Launch Banking Application', async () => {
        await page.goto(ENV.baseUrl);
      });

      await bankingHomePage.verifyBankingApplication();

      await step('Open Banking Portal', async () => {
        await bankingHomePage.openBankingPortal();
      });

      await step('Open Registration Page', async () => {
        await registrationPage.openRegistration();
      });

      await step('Enter Registration Details', async () => {
        await registrationPage.enterRegistrationDetails();
      });

      await takeScreenshot(
        page,
        REPORT_PATH,
        '02_RegisterPage'
      );

      await step('Click Registration Next Button', async () => {
        await registrationPage.clickFirstNext();
      });

      await step('Continue Registration', async () => {
        await registrationPage.clickSecondNext();
      });

      await step('Enter Registration OTP', async () => {
        await registrationPage.enterRegistrationOtp();
      });

      await takeScreenshot(
        page,
        REPORT_PATH,
        '02_OTPPage'
      );

      await step('Submit Registration OTP', async () => {
        await registrationPage.submitRegistration();
      });

      await step('Open Fund Transfer Module', async () => {
        await fundTransferPage.openFundTransfer();
      });

      await step('Select NEFT Transfer', async () => {
        await fundTransferPage.selectNeft();
      });

      await takeScreenshot(
        page,
        REPORT_PATH,
        '03_FundTransferPage'
      );

      await step('Continue to Beneficiary Selection', async () => {
        await fundTransferPage.continueToBeneficiary();
      });

      await step('Select BEN002 Beneficiary', async () => {
        await fundTransferPage.selectBeneficiary();
      });

      await step('Continue to Transfer Details', async () => {
        await fundTransferPage.continueToTransferDetails();
      });

      await step('Enter Transfer Details', async () => {
        await fundTransferPage.enterTransferDetails();
      });

      await takeScreenshot(
        page,
        REPORT_PATH,
        '04_FundTransferPage'
      );

      await step('Continue Transfer Amount Validation', async () => {
        await fundTransferPage.continueTransferValidation();
      });

      await step('Enter Final Transfer Amount', async () => {
        await fundTransferPage.enterFinalAmount();
      });

      await step('Continue to Transfer Confirmation', async () => {
        await fundTransferPage.continueToConfirmation();
      });

      await step('Confirm NEFT Transfer', async () => {
        await fundTransferPage.confirmTransfer();
      });

      await step('Enter Transaction OTP', async () => {
        await fundTransferPage.enterTransactionOtp();
      });

      await step('Verify Transaction OTP', async () => {
        await fundTransferPage.verifyTransactionOtp();
      });

      await takeScreenshot(
        page,
        REPORT_PATH,
        '05_final'
      );

      await step('Navigate to Dashboard', async () => {
        await fundTransferPage.goToDashboard();
      });

      await dashboardPage.verifyFundTransferVisible();

      console.log(
        `\n✅ ${data.TestCase_ID} completed successfully`
      );

    } catch (error) {
      status = 'FAIL';
      errorMessage = error.message || String(error);
      throw error;

    } finally {
      const durationInMinutes =
        ((Date.now() - startTime) / 60000).toFixed(2);

      await ReportUtils.appendTestResult(
        REPORT_PATH,
        {
          testCase: `TC-${data.TestCase_ID}`,
          product: data.ProductCode,
          status,
          duration: durationInMinutes,
          errorMessage,
          policyNumber
        }
      );
    }
  });
});
