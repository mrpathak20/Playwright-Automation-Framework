import { test } from '../fixtures/baseFixture.js';

import { ReportUtils } from '../utils/ReportUtils.js';
import { FakerUtility } from '../utils/FakerUtility.js';
const utils = require('../utils/CommonUtilities.js');
const path = require('path');



import { ENV } from "../config/environment.js";

const PROJECT_ROOT = process.cwd();
const REPORTS_ROOT = path.join(PROJECT_ROOT, 'reports');

const TODAYS_DATE = utils.getCurrentDate();
const REPORT_PATH = path.join(REPORTS_ROOT, TODAYS_DATE);


// --------------------------------------------------
// Readable execution step
// --------------------------------------------------

const step = async (name, action) => {
  console.log(`\n▶ ${name}`);

  await action();

  console.log(`✓ ${name}`);
};


// --------------------------------------------------
// Before All
// --------------------------------------------------

test.beforeAll(async () => {

  await utils.createFolder(REPORT_PATH);

  console.log(`Reports folder ready at: ${REPORT_PATH}`);

  await ReportUtils.createExcelSheet(REPORT_PATH);

});
const testData = utils.getTestdata(
  'test-data/userDataTDL.xlsx',
  'Sheet1'
);

console.log("TEST DATA:", testData);
console.log("TEST DATA LENGTH:", testData.length);
// --------------------------------------------------
// Test Data Driven Execution
// --------------------------------------------------

testData.forEach((data) => {

  test(`Billpayment - ${data.TestCase_ID}`, async ({ page, assertion }) => {

    let policyNumber = "";
    const startTime = Date.now();

    let status = "PASS";
    let errorMessage = "";

    try {

      // --------------------------------------------------
      // Launch Application
      // --------------------------------------------------

      await step('Launch Banking Application', async () => {

        await page.goto(ENV.baseUrl);

      });


    // =====================================================
// 1. BANKING APPLICATION CARD
// =====================================================

await assertion.assertVisible(
  page.getByTestId('app-card-banking'),
  'Banking application card should be visible'
);

await assertion.assertContainsText(
  page.locator('body'),
  'Banking'
);


// =====================================================
// 2. BANKING MODULE
// =====================================================

const bankingCard = page.getByTestId('app-card-banking');

const bankingPortal = bankingCard.getByRole('link', {
  name: 'Open App →'
});

await assertion.assertVisible(
  bankingPortal,
  'Banking Portal - Open App link should be visible'
);

await step('Open Banking Portal', async () => {
  await bankingPortal.click();
});

await assertion.assertURLContains(
  page,
  '/banking'
);

      // --------------------------------------------------
      // Registration
    
//   await page.goto('https://www.testerrank.com/banking');
// });
      // --------------------------------------------------

      await step('Open Registration', async () => {

        await page.getByTestId('heroRegister').click();

      });


      await step('Enter Registration Name', async () => {

        await page.getByTestId('regName').fill(FakerUtility.getFullName());

      });


      await step('Enter Registration Email', async () => {

        await page.getByTestId('regEmail').fill(FakerUtility.getEmail());

      });


      await step('Enter Registration Phone', async () => {

        await page.getByTestId('regPhone').fill(FakerUtility.getIndianMobile());

      });


      await step('Enter Password', async () => {

        await page.getByTestId('regPassword').fill('0991234');

      });


      await step('Show Password', async () => {

        await page.getByTestId('reg-toggle-password').click();

      });


      await step('Confirm Password', async () => {

        await page
          .getByTestId('regConfirmPassword')
          .fill('0991234');

      });


      await step('Continue Registration', async () => {

        await page.getByTestId('nextBtn1').click();

      });


      await step('Continue to OTP', async () => {

        await page.getByTestId('nextBtn2').click();

      });


      // --------------------------------------------------
      // Registration OTP
      // --------------------------------------------------

      await step('Enter Registration OTP', async () => {

        await page.getByTestId('regOtp0').fill('1');
        await page.getByTestId('regOtp1').fill('2');
        await page.getByTestId('regOtp2').fill('3');
        await page.getByTestId('regOtp3').fill('4');
        await page.getByTestId('regOtp4').fill('5');
        await page.getByTestId('regOtp5').fill('6');

      });

      await page.waitForTimeout(3000);


      await step('Submit Registration', async () => {

        await page.getByTestId('submitBtn').click();

      });


      // --------------------------------------------------
      // Pay Bills
      // --------------------------------------------------

      await step('Open Pay Bills', async () => {

        await page.getByTestId('qa-PayBills').click();

      });


      await step('Select Mobile Category', async () => {

        await page.getByTestId('category-Mobile').click();

      });


      await step('Select Water Category', async () => {

        await page.getByTestId('category-Water').click();

      });


      await step('Select Water Provider', async () => {

        await page
          .getByTestId('billerProvider')
          .selectOption('DEWA Water - Dubai');

      });


      await step('Enter Consumer Number', async () => {

        await page
          .getByTestId('consumerNumber')
          .fill(FakerUtility.getAccountNumber());

      });


      // --------------------------------------------------
      // Payment
      // --------------------------------------------------

      await step('Pay Bill', async () => {

        await page.getByTestId('payBillBtn').click();

      });


      // --------------------------------------------------
      // Final Assertion
      // --------------------------------------------------

      await assertion.assertVisible(
        page.getByRole('heading', { name: 'Payment Successful' }),
        'Payment Successful message should be visible'
      );


      await step('Verify Payment Successful', async () => {

        await page
          .getByRole('heading', { name: 'Payment Successful' })
          .click();

      });


      console.log('\n Test execution completed successfully');


    } catch (error) {

      status = "FAIL";

      errorMessage = error.message;

      console.log(`\n❌ Test Failed: ${error.message}`);

      throw error;


    } finally {

      // --------------------------------------------------
      // Calculate Duration
      // --------------------------------------------------

      const durationInMinutes =
        ((Date.now() - startTime) / 60000).toFixed(2);


      // --------------------------------------------------
      // Append Result to Excel
      // --------------------------------------------------

      await ReportUtils.appendTestResult(REPORT_PATH, {

        testCase: `TC-${data.TestCase_ID}`,

        product: data.ProductCode,

        status,

        duration: durationInMinutes,

        errorMessage,

        policyNumber

      });


      console.log(
        `📊 Report updated for TC-${data.TestCase_ID}`
      );

    }

  });

});