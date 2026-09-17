# Playwright POM Refactor

This refactor converts the supplied banking-flow test into Page Object Model structure.

## Pages

- `BankingHomePage.js`
- `RegistrationPage.js`
- `FundTransferPage.js`
- `DashboardPage.js`

## Test

- `tests/banking.pom.spec.js`

## Existing project dependencies

The refactor intentionally continues using the existing project components:

- `baseFixture`
- `ReportUtils`
- `FakerUtility`
- `CommonUtilities`
- `environment.js`
- existing custom `assertion` fixture

No new framework dependency is required.

## POM responsibility

Page classes contain locators and page-level actions.
The test contains the business flow and reporting orchestration.

This keeps locators out of the test and makes the test easier to maintain.
