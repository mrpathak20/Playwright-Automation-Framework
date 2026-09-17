import { ReportUtils } from '../utils/ReportUtils.js';
import { FakerUtility } from '../utils/FakerUtility.js';
import { ENV } from '../config/environment.js';
import { test } from '../fixtures/baseFixture.js';

const utils = require('../utils/CommonUtilities.js');
const path = require('path');
const { takeScreenshot } = require('../utils/CommonUtilities.js');

const PROJECT_ROOT = process.cwd();
const REPORTS_ROOT = path.join(PROJECT_ROOT, 'reports');

const TODAYS_DATE = utils.getCurrentDate();
const REPORT_PATH = path.join(REPORTS_ROOT, TODAYS_DATE);


// =========================================================
// STEP LOGGER
// =========================================================

const step = async (name, action) => {
  console.log(`\n▶ ${name}`);
  await action();
  console.log(`✓ ${name}`);
};


// =========================================================
// REPORT SETUP
// =========================================================

test.beforeAll(async () => {

  await utils.createFolder(REPORT_PATH);

  console.log(`Reports folder ready at: ${REPORT_PATH}`);

  await ReportUtils.createExcelSheet(REPORT_PATH);

});


// =========================================================
// TEST DATA
// =========================================================

const testData = utils.getTestdata(
  'test-data/userDataTDL.xlsx',
  'Sheet1'
);


// =========================================================
// BANKING TEST
// =========================================================

testData.forEach((data) => {

  test(`test-${data.TestCase_ID}`, async ({ page, assertion }) => {

    let policyNumber = '';

    const startTime = Date.now();

    let status = 'PASS';

    let errorMessage = '';


    try {

      // =====================================================
      // 1. APPLICATION LAUNCH
      // =====================================================

      await step('Launch Banking Application', async () => {

        await page.goto(ENV.baseUrl);

      });

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

    const bankingPortal = page.getByRole('link', {
  name: /Banking Portal.*Start Practice/i
});

await assertion.assertVisible(
  bankingPortal,
  'Banking Portal - Start Practice link should be visible'
);

await step('Open Banking Portal', async () => {
  await bankingPortal.click();
});

await assertion.assertURLContains(
  page,
  '/banking'
);

const registerNav = page.getByTestId('navRegister');

await assertion.assertVisible(
  registerNav,
  'Register navigation should be visible on Banking Portal'
);

await assertion.assertEnabled(
  registerNav,
  'Register navigation should be enabled'
);

await step('Open Registration Page', async () => {
  await registerNav.click();
});
      // =====================================================
      // 3. REGISTRATION PAGE
      // =====================================================

      const name = FakerUtility.getFullName();

      const email = FakerUtility.getEmail();

      const phone = FakerUtility.getIndianMobile();

      const password = 'PAssword@1233';


      const regName =
        page.getByTestId('regName');

      const regEmail =
        page.getByTestId('regEmail');

      const regPhone =
        page.getByTestId('regmobileno');

      const regPassword =
        page.getByTestId('regPassword');

      const regConfirmPassword =
        page.getByTestId('regConfirmPassword');


      await assertion.assertVisible(
        regName,
        'Full Name field should be visible'
      );

      await assertion.assertVisible(
        regEmail,
        'Email Address field should be visible'
      );

      await assertion.assertVisible(
        regPhone,
        'Mobile Number field should be visible'
      );

      await assertion.assertVisible(
        regPassword,
        'Password field should be visible'
      );

      await assertion.assertVisible(
        regConfirmPassword,
        'Confirm Password field should be visible'
      );


      await assertion.assertEnabled(
        regName,
        'Full Name field should be enabled'
      );

      await assertion.assertEnabled(
        regEmail,
        'Email Address field should be enabled'
      );

      await assertion.assertEnabled(
        regPhone,
        'Mobile Number field should be enabled'
      );

      await assertion.assertEnabled(
        regPassword,
        'Password field should be enabled'
      );

      await assertion.assertEnabled(
        regConfirmPassword,
        'Confirm Password field should be enabled'
      );


      // -----------------------------------------------------
      // ENTER REGISTRATION DETAILS
      // -----------------------------------------------------

      await step('Enter Full Name', async () => {

        await regName.fill(name);

      });

      await step('Enter Email Address', async () => {

        await regEmail.fill(email);

      });

      await step('Enter Mobile Number', async () => {

        await regPhone.fill(phone);

      });

      await step('Enter Password', async () => {

        await regPassword.fill(password);

      });

      await step('Enter Confirm Password', async () => {

        await regConfirmPassword.fill(password);

      });


      // -----------------------------------------------------
      // VERIFY REGISTRATION DETAILS
      // -----------------------------------------------------

      await assertion.assertValue(
        regName,
        name
      );

      await assertion.assertValue(
        regEmail,
        email
      );

      await assertion.assertValue(
        regPhone,
        phone
      );

      await assertion.assertValue(
        regPassword,
        password
      );

      await assertion.assertValue(
        regConfirmPassword,
        password
      );


      // -----------------------------------------------------
      // NEXT BUTTON
      // -----------------------------------------------------

      const nextBtn1 =
        page.getByTestId('nextBtn1');


      await assertion.assertVisible(
        nextBtn1,
        'Registration Next button should be visible'
      );

      await assertion.assertEnabled(
        nextBtn1,
        'Registration Next button should be enabled'
      );


      await takeScreenshot(
        page,
        REPORT_PATH,
        '02_RegisterPage'
      );


      await step('Click Registration Next Button', async () => {

        await nextBtn1.click();

      });


      // =====================================================
      // 4. REGISTRATION NEXT STEP
      // =====================================================

      const nextBtn2 =
        page.getByTestId('nextBtn2');


      await assertion.assertVisible(
        nextBtn2,
        'Registration second Next button should be visible'
      );

      await assertion.assertEnabled(
        nextBtn2,
        'Registration second Next button should be enabled'
      );


      await step('Continue Registration', async () => {

        await nextBtn2.click();

      });


      // =====================================================
      // 5. REGISTRATION OTP
      // =====================================================

      const registrationOtp = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6'
      ];


      for (let i = 0; i < registrationOtp.length; i++) {

        const otpField =
          page.getByTestId(`regOtp${i}`);


        await assertion.assertVisible(
          otpField,
          `Registration OTP field ${i + 1} should be visible`
        );

        await assertion.assertEnabled(
          otpField,
          `Registration OTP field ${i + 1} should be enabled`
        );


        await step(
          `Enter Registration OTP Digit ${i + 1}`,
          async () => {

            await otpField.fill(
              registrationOtp[i]
            );

          }
        );


        await assertion.assertValue(
          otpField,
          registrationOtp[i]
        );

      }


      const submitButton =
        page.getByTestId('submitBtn');


      await assertion.assertVisible(
        submitButton,
        'Registration Submit button should be visible'
      );

      await assertion.assertEnabled(
        submitButton,
        'Registration Submit button should be enabled'
      );


      await takeScreenshot(
        page,
        REPORT_PATH,
        '02_OTPPage'
      );


      await step('Submit Registration OTP', async () => {

        await submitButton.click();

      });


      // =====================================================
      // 6. FUND TRANSFER MODULE
      // =====================================================

      const fundTransfer =
        page.getByTestId('qa-FundTransfer');


      await assertion.assertVisible(
        fundTransfer,
        'Fund Transfer option should be visible'
      );

      await assertion.assertEnabled(
        fundTransfer,
        'Fund Transfer option should be enabled'
      );


      await step('Open Fund Transfer Module', async () => {

        await fundTransfer.click();

      });


      // =====================================================
      // 7. NEFT SELECTION
      // =====================================================

      const neftOption =
        page.getByTestId('type-NEFT');
      


      await assertion.assertVisible(
        neftOption,
        'NEFT option should be visible'
      );

      await assertion.assertEnabled(
        neftOption,
        'NEFT option should be enabled'
      );


      await step('Select NEFT Transfer', async () => {

        await neftOption.click();

      });


      await assertion.assertVisible(
        page.getByTestId('nextBtn1'),
        'Fund Transfer Next button should be visible'
      );


      await takeScreenshot(
        page,
        REPORT_PATH,
        '03_FundTransferPage'
      );


      // =====================================================
      // 8. BENEFICIARY
      // =====================================================

      const transferNextBtn1 =
        page.getByTestId('nextBtn1');


      await assertion.assertVisible(
        transferNextBtn1,
        'Beneficiary Next button should be visible'
      );

      await assertion.assertEnabled(
        transferNextBtn1,
        'Beneficiary Next button should be enabled'
      );


      await step('Continue to Beneficiary Selection', async () => {

        await transferNextBtn1.click();

      });


      const beneficiary =
        page.getByTestId('bene-BEN002');


      await assertion.assertVisible(
        beneficiary,
        'BEN002 Beneficiary should be visible'
      );

      await assertion.assertEnabled(
        beneficiary,
        'BEN002 Beneficiary should be enabled'
      );


      await step('Select BEN002 Beneficiary', async () => {

        await beneficiary.click();

      });


      const transferNextBtn2 =
        page.getByTestId('nextBtn2');


      await assertion.assertVisible(
        transferNextBtn2,
        'Beneficiary Continue button should be visible'
      );

      await assertion.assertEnabled(
        transferNextBtn2,
        'Beneficiary Continue button should be enabled'
      );


      await step('Continue to Transfer Details', async () => {

        await transferNextBtn2.click();

      });


      // =====================================================
      // 9. TRANSFER DETAILS
      // =====================================================

      const transferAmount =
        page.getByTestId('transferAmount');

      const remarks =
        page.getByTestId('remarks');


      await assertion.assertVisible(
        transferAmount,
        'Transfer Amount field should be visible'
      );

      await assertion.assertVisible(
        remarks,
        'Remarks field should be visible'
      );


      await assertion.assertEnabled(
        transferAmount,
        'Transfer Amount field should be enabled'
      );

      await assertion.assertEnabled(
        remarks,
        'Remarks field should be enabled'
      );


      const firstAmount = '200000';

      const remarkText = 'Partty';


      await step('Enter Transfer Amount', async () => {

        await transferAmount.fill(firstAmount);

      });


      await step('Enter Transfer Remarks', async () => {

        await remarks.fill(remarkText);

      });


      await assertion.assertValue(
        transferAmount,
        firstAmount
      );

      await assertion.assertValue(
        remarks,
        remarkText
      );


      const transferNextBtn3 =
        page.getByTestId('nextBtn3');


      await assertion.assertVisible(
        transferNextBtn3,
        'Transfer Details Next button should be visible'
      );

      await assertion.assertEnabled(
        transferNextBtn3,
        'Transfer Details Next button should be enabled'
      );


      await takeScreenshot(
        page,
        REPORT_PATH,
        '04_FundTransferPage'
      );


      // =====================================================
      // 10. AMOUNT VALIDATION / SECOND STEP
      // =====================================================

      await step('Continue Transfer Amount Validation', async () => {

        await transferNextBtn3.click();

      });


      await assertion.assertVisible(
        transferAmount,
        'Final Transfer Amount field should be visible'
      );

      await assertion.assertEnabled(
        transferAmount,
        'Final Transfer Amount field should be enabled'
      );


      const finalAmount = '20000';


      await step('Enter Final Transfer Amount', async () => {

        await transferAmount.fill(finalAmount);

      });


      await assertion.assertValue(
        transferAmount,
        finalAmount
      );


      await assertion.assertVisible(
        transferNextBtn3,
        'Final Transfer Next button should be visible'
      );

      await assertion.assertEnabled(
        transferNextBtn3,
        'Final Transfer Next button should be enabled'
      );


      await step('Continue to Transfer Confirmation', async () => {

        await transferNextBtn3.click();

      });


      // =====================================================
      // 11. TRANSFER CONFIRMATION
      // =====================================================

      const confirmButton =
        page.getByTestId('confirmTransferBtn');


      await assertion.assertVisible(
        confirmButton,
        'Confirm Transfer button should be visible'
      );

      await assertion.assertEnabled(
        confirmButton,
        'Confirm Transfer button should be enabled'
      );


      await step('Confirm NEFT Transfer', async () => {

        await confirmButton.click();

      });


      // =====================================================
      // 12. TRANSACTION OTP
      // =====================================================

      const transactionOtp = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6'
      ];


      for (let i = 0; i < transactionOtp.length; i++) {

        const otpField =
          page.getByTestId(`otpBox-${i}`);


        await assertion.assertVisible(
          otpField,
          `Transaction OTP field ${i + 1} should be visible`
        );

        await assertion.assertEnabled(
          otpField,
          `Transaction OTP field ${i + 1} should be enabled`
        );


        await step(
          `Enter Transaction OTP Digit ${i + 1}`,
          async () => {

            await otpField.fill(
              transactionOtp[i]
            );

          }
        );


        await assertion.assertValue(
          otpField,
          transactionOtp[i]
        );

      }


      const verifyOtpButton =
        page.getByTestId('verifyOtpBtn');


      await assertion.assertVisible(
        verifyOtpButton,
        'Verify OTP button should be visible'
      );

      await assertion.assertEnabled(
        verifyOtpButton,
        'Verify OTP button should be enabled'
      );


      await step('Verify Transaction OTP', async () => {

        await verifyOtpButton.click();

      });


      // =====================================================
      // 13. FINAL TRANSACTION RESULT
      // =====================================================

      const dashboardButton =
        page.getByTestId('goToDashboard');


      await assertion.assertVisible(
        dashboardButton,
        'Go To Dashboard button should be visible'
      );

      await assertion.assertEnabled(
        dashboardButton,
        'Go To Dashboard button should be enabled'
      );


      await takeScreenshot(
        page,
        REPORT_PATH,
        '05_final'
      );


      // =====================================================
      // 14. DASHBOARD
      // =====================================================

      await step('Navigate to Dashboard', async () => {

        await dashboardButton.click();

      });


      await assertion.assertVisible(
        page.getByTestId('qa-FundTransfer'),
        'Fund Transfer option should be visible on Dashboard'
      );


      console.log(
        `\n✅ ${data.TestCase_ID} completed successfully`
      );


    } catch (error) {

      status = 'FAIL';

      errorMessage =
        error.message || String(error);

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