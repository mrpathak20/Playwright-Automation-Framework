export class BankingHomePage {
  constructor(page, assertion) {
    this.page = page;
    this.assertion = assertion;

    this.bankingCard = page.getByTestId('app-card-banking');
    this.bankingPortal = page.getByRole('link', {
      name: /Banking Portal.*Start Practice/i
    });
  }

  async verifyBankingApplication() {
    await this.assertion.assertVisible(
      this.bankingCard,
      'Banking application card should be visible'
    );

    await this.assertion.assertContainsText(
      this.page.locator('body'),
      'Banking'
    );
  }

  async openBankingPortal() {
    await this.assertion.assertVisible(
      this.bankingPortal,
      'Banking Portal - Start Practice link should be visible'
    );

    await this.bankingPortal.click();

    await this.assertion.assertURLContains(
      this.page,
      '/banking'
    );
  }
}
