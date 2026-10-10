
import { test } from '../fixtures/baseFixture.js';
import { ReportUtils } from '../utils/ReportUtils.js';
import { ENV } from '../config/environment.js';

const utils = require('../utils/CommonUtilities.js');
const { decryptData } = require('../utils/encryptionUtil.js');
const path = require('path');

const PROJECT_ROOT = process.cwd();
const REPORTS_ROOT = path.join(PROJECT_ROOT, 'reports');

const TODAYS_DATE = utils.getCurrentDate();
const REPORT_PATH = path.join(REPORTS_ROOT, TODAYS_DATE);

const EXCEL_PATH = path.join(
  PROJECT_ROOT,
  'test-data',
  'userData.xlsx'
);

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

// --------------------------------------------------
// Read Excel Test Data
// --------------------------------------------------

const testData = utils.getTestdata(EXCEL_PATH, 'Sheet1');

console.log('Eligible test data rows:', testData.length);

// --------------------------------------------------
// Test Data Driven Execution
// --------------------------------------------------

testData.forEach((data) => {
   console.log('Test case:', data.TestCase_ID);
  console.log('Available Excel columns:', Object.keys(data));
  console.log('PAN exists:', Boolean(data.PAN));
  console.log('Aadhaar exists:', Boolean(data.Aadhaar));
  test(`Insurance Journey - ${data.TestCase_ID}`, async ({
    page,
    assertion
  }) => {
    let policyNumber = '';
    const startTime = Date.now();

    let status = 'PASS';
    let errorMessage = '';

    try {
      // --------------------------------------------------
      // Decrypt Sensitive Excel Data
      // --------------------------------------------------

      let pan;
      let aadhaar;

      await step('Decrypt PAN and Aadhaar', async () => {
        if (!data.PAN || !data.Aadhaar) {
          throw new Error(
            'Encrypted PAN or Aadhaar is missing from Excel.'
          );
        }

        pan = decryptData(String(data.PAN));
        aadhaar = decryptData(String(data.Aadhaar));
      });

      // --------------------------------------------------
      // Launch Application
      // --------------------------------------------------

      await step('Launch Insurance Application', async () => {
        await page.goto(ENV.baseUrl);
      });

      // --------------------------------------------------
      // Open Insurance Application
      // --------------------------------------------------

      await step('Open Insurance Application', async () => {
        await page
          .getByTestId('app-card-insurance')
          .getByRole('link', { name: 'Open App →' })
          .click();
      });

      await assertion.assertVisible(
        page.getByTestId('link-buy-policy'),
        'Buy Policy link should be visible'
      );

      await step('Open Buy Policy', async () => {
        await page.getByTestId('link-buy-policy').click();
      });

      // --------------------------------------------------
      // Select Insurance Plan
      // --------------------------------------------------

      await step('Select Health Insurance', async () => {
        await page.getByTestId('policyType-health').check();
        await page.getByTestId('plan-basic-health').check();
        await page.getByTestId('continue-btn-1').click();
      });

      // --------------------------------------------------
      // Applicant Details
      // --------------------------------------------------

      await step('Enter Applicant Details', async () => {
        await page
          .getByTestId('applicant-name')
          .fill(data.ApplicantName || 'Ragnesh Patel');

        await page
          .getByTestId('applicant-dob')
          .fill(data.ApplicantDOB || '2002-07-02');

        await page.getByTestId('gender-male').check();

        // Fill decrypted PAN
        await page.getByTestId('applicant-pan').fill(pan);
        await page.waitForTimeout(1000); // Wait for PAN validation to complete

        // Fill decrypted Aadhaar
        await page.getByTestId('applicant-aadhaar').fill(aadhaar);
        await page.waitForTimeout(1000); // Wait for Aadhaar validation to complete

        
        await page
          .getByTestId('applicant-mobile')
          .fill(data.Mobile || '9876543219');

        await page
          .getByTestId('applicant-email')
          .fill(data.Email || 'RP@gmail.com');

        await page
          .getByTestId('occupation')
          .selectOption(data.Occupation || 'Salaried');

        await page
          .getByTestId('annual-income')
          .selectOption(data.AnnualIncome || '3to5l');
      });

      await step('Continue to Health Details', async () => {
        await page.getByTestId('continue-btn-2').click();
      });

      // --------------------------------------------------
      // Health Details
      // --------------------------------------------------

      await step('Enter Health Details', async () => {
        await page.getByTestId('height').fill('170');
        await page.getByTestId('weight').fill('70');
        await page.getByText('None of the above').click();
        await page.getByTestId('continue-btn-3').click();
      });

      // --------------------------------------------------
      // Nominee Details
      // --------------------------------------------------

      await step('Enter Nominee Details', async () => {
        await page
          .getByTestId('nominee-name-0')
          .fill(data.NomineeName || 'Sheema Patel');

        await page
          .getByTestId('nominee-relation-0')
          .selectOption(data.NomineeRelation || 'Spouse');

        await page
          .getByTestId('nominee-dob-0')
          .fill(data.NomineeDOB || '2004-01-01');

        await page
          .getByTestId('nominee-aadhaar-0')
          .fill(data.NomineeAadhaar || '987654321981');

        await page.getByTestId('continue-btn-4').click();
      });

      // --------------------------------------------------
      // Payment
      // --------------------------------------------------

      await step('Complete Payment', async () => {
        await page.getByTestId('payment-method-upi').check();

        await page
          .getByTestId('upi-id')
          .fill(data.UPI || 'rag@gpay.in');

        await page.getByTestId('pay-submit-btn').click();
      });

      // --------------------------------------------------
      // Final Assertion
      // --------------------------------------------------

      await step('Open Dashboard', async () => {
        await page.getByTestId('go-to-dashboard').click();
      });

      console.log('\nInsurance journey completed successfully.');

    } catch (error) {
      status = 'FAIL';
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
        product: data.ProductCode || 'Health Insurance',
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