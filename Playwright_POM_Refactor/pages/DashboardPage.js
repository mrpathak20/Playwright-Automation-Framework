export class DashboardPage {
  constructor(page, assertion) {
    this.page = page;
    this.assertion = assertion;

    this.fundTransfer = page.getByTestId('qa-FundTransfer');
  }

  async verifyFundTransferVisible() {
    await this.assertion.assertVisible(
      this.fundTransfer,
      'Fund Transfer option should be visible on Dashboard'
    );
  }
}
