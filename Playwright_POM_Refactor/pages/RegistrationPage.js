export class RegistrationPage {
  constructor(page, assertion, fakerUtility) {
    this.page = page;
    this.assertion = assertion;
    this.fakerUtility = fakerUtility;

    this.registerNav = page.getByTestId('navRegister');

    this.regName = page.getByTestId('regName');
    this.regEmail = page.getByTestId('regEmail');
    this.regPhone = page.getByTestId('regmobileno');
    this.regPassword = page.getByTestId('regPassword');
    this.regConfirmPassword = page.getByTestId('regConfirmPassword');

    this.nextBtn1 = page.getByTestId('nextBtn1');
    this.nextBtn2 = page.getByTestId('nextBtn2');
    this.submitButton = page.getByTestId('submitBtn');
  }

  async openRegistration() {
    await this.assertion.assertVisible(
      this.registerNav,
      'Register navigation should be visible on Banking Portal'
    );

    await this.assertion.assertEnabled(
      this.registerNav,
      'Register navigation should be enabled'
    );

    await this.registerNav.click();
  }

  async enterRegistrationDetails(password = 'PAssword@1233') {
    const name = this.fakerUtility.getFullName();
    const email = this.fakerUtility.getEmail();
    const phone = this.fakerUtility.getIndianMobile();

    const fields = [
      [this.regName, name, 'Full Name'],
      [this.regEmail, email, 'Email Address'],
      [this.regPhone, phone, 'Mobile Number'],
      [this.regPassword, password, 'Password'],
      [this.regConfirmPassword, password, 'Confirm Password']
    ];

    for (const [field, value, label] of fields) {
      await this.assertion.assertVisible(field, `${label} field should be visible`);
      await this.assertion.assertEnabled(field, `${label} field should be enabled`);
      await field.fill(value);
      await this.assertion.assertValue(field, value);
    }

    return { name, email, phone, password };
  }

  async clickFirstNext() {
    await this.assertion.assertVisible(
      this.nextBtn1,
      'Registration Next button should be visible'
    );
    await this.assertion.assertEnabled(
      this.nextBtn1,
      'Registration Next button should be enabled'
    );
    await this.nextBtn1.click();
  }

  async clickSecondNext() {
    await this.assertion.assertVisible(
      this.nextBtn2,
      'Registration second Next button should be visible'
    );
    await this.assertion.assertEnabled(
      this.nextBtn2,
      'Registration second Next button should be enabled'
    );
    await this.nextBtn2.click();
  }

  async enterRegistrationOtp(otp = ['1', '2', '3', '4', '5', '6']) {
    for (let i = 0; i < otp.length; i++) {
      const otpField = this.page.getByTestId(`regOtp${i}`);

      await this.assertion.assertVisible(
        otpField,
        `Registration OTP field ${i + 1} should be visible`
      );

      await this.assertion.assertEnabled(
        otpField,
        `Registration OTP field ${i + 1} should be enabled`
      );

      await otpField.fill(otp[i]);
      await this.assertion.assertValue(otpField, otp[i]);
    }
  }

  async submitRegistration() {
    await this.assertion.assertVisible(
      this.submitButton,
      'Registration Submit button should be visible'
    );

    await this.assertion.assertEnabled(
      this.submitButton,
      'Registration Submit button should be enabled'
    );

    await this.submitButton.click();
  }
}
