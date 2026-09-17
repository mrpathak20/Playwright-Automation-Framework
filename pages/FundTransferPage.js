export class FundTransferPage {
  constructor(page, assertion) {
    this.page = page;
    this.assertion = assertion;

    this.fundTransfer = page.getByTestId('qa-FundTransfer');
    this.neftOption = page.getByTestId('type-NEFT');

    this.nextBtn1 = page.getByTestId('nextBtn1');
    this.nextBtn2 = page.getByTestId('nextBtn2');
    this.nextBtn3 = page.getByTestId('nextBtn3');

    this.beneficiary = page.getByTestId('bene-BEN002');

    this.transferAmount = page.getByTestId('transferAmount');
    this.remarks = page.getByTestId('remarks');

    this.confirmButton = page.getByTestId('confirmTransferBtn');
    this.verifyOtpButton = page.getByTestId('verifyOtpBtn');
    this.dashboardButton = page.getByTestId('goToDashboard');
  }

  async openFundTransfer() {
    await this.assertion.assertVisible(
      this.fundTransfer,
      'Fund Transfer option should be visible'
    );
    await this.assertion.assertEnabled(
      this.fundTransfer,
      'Fund Transfer option should be enabled'
    );
    await this.fundTransfer.click();
  }

  async selectNeft() {
    await this.assertion.assertVisible(
      this.neftOption,
      'NEFT option should be visible'
    );
    await this.assertion.assertEnabled(
      this.neftOption,
      'NEFT option should be enabled'
    );
    await this.neftOption.click();
  }

  async continueToBeneficiary() {
    await this.assertion.assertVisible(
      this.nextBtn1,
      'Beneficiary Next button should be visible'
    );
    await this.assertion.assertEnabled(
      this.nextBtn1,
      'Beneficiary Next button should be enabled'
    );
    await this.nextBtn1.click();
  }

  async selectBeneficiary() {
    await this.assertion.assertVisible(
      this.beneficiary,
      'BEN002 Beneficiary should be visible'
    );
    await this.assertion.assertEnabled(
      this.beneficiary,
      'BEN002 Beneficiary should be enabled'
    );
    await this.beneficiary.click();
  }

  async continueToTransferDetails() {
    await this.assertion.assertVisible(
      this.nextBtn2,
      'Beneficiary Continue button should be visible'
    );
    await this.assertion.assertEnabled(
      this.nextBtn2,
      'Beneficiary Continue button should be enabled'
    );
    await this.nextBtn2.click();
  }

  async enterTransferDetails(amount = '200000', remarks = 'Partty') {
    await this.assertion.assertVisible(
      this.transferAmount,
      'Transfer Amount field should be visible'
    );
    await this.assertion.assertVisible(
      this.remarks,
      'Remarks field should be visible'
    );

    await this.assertion.assertEnabled(
      this.transferAmount,
      'Transfer Amount field should be enabled'
    );
    await this.assertion.assertEnabled(
      this.remarks,
      'Remarks field should be enabled'
    );

    await this.transferAmount.fill(amount);
    await this.remarks.fill(remarks);

    await this.assertion.assertValue(this.transferAmount, amount);
    await this.assertion.assertValue(this.remarks, remarks);
  }

  async continueTransferValidation() {
    await this.assertion.assertVisible(
      this.nextBtn3,
      'Transfer Details Next button should be visible'
    );
    await this.assertion.assertEnabled(
      this.nextBtn3,
      'Transfer Details Next button should be enabled'
    );
    await this.nextBtn3.click();
  }

  async enterFinalAmount(amount = '20000') {
    await this.assertion.assertVisible(
      this.transferAmount,
      'Final Transfer Amount field should be visible'
    );
    await this.assertion.assertEnabled(
      this.transferAmount,
      'Final Transfer Amount field should be enabled'
    );

    await this.transferAmount.fill(amount);
    await this.assertion.assertValue(this.transferAmount, amount);
  }

  async continueToConfirmation() {
    await this.assertion.assertVisible(
      this.nextBtn3,
      'Final Transfer Next button should be visible'
    );
    await this.assertion.assertEnabled(
      this.nextBtn3,
      'Final Transfer Next button should be enabled'
    );
    await this.nextBtn3.click();
  }

  async confirmTransfer() {
    await this.assertion.assertVisible(
      this.confirmButton,
      'Confirm Transfer button should be visible'
    );
    await this.assertion.assertEnabled(
      this.confirmButton,
      'Confirm Transfer button should be enabled'
    );
    await this.confirmButton.click();
  }

  async enterTransactionOtp(otp = ['1', '2', '3', '4', '5', '6']) {
    for (let i = 0; i < otp.length; i++) {
      const otpField = this.page.getByTestId(`otpBox-${i}`);

      await this.assertion.assertVisible(
        otpField,
        `Transaction OTP field ${i + 1} should be visible`
      );

      await this.assertion.assertEnabled(
        otpField,
        `Transaction OTP field ${i + 1} should be enabled`
      );

      await otpField.fill(otp[i]);
      await this.assertion.assertValue(otpField, otp[i]);
    }
  }

  async verifyTransactionOtp() {
    await this.assertion.assertVisible(
      this.verifyOtpButton,
      'Verify OTP button should be visible'
    );
    await this.assertion.assertEnabled(
      this.verifyOtpButton,
      'Verify OTP button should be enabled'
    );
    await this.verifyOtpButton.click();
  }

  async goToDashboard() {
    await this.assertion.assertVisible(
      this.dashboardButton,
      'Go To Dashboard button should be visible'
    );
    await this.assertion.assertEnabled(
      this.dashboardButton,
      'Go To Dashboard button should be enabled'
    );
    await this.dashboardButton.click();
  }
}
