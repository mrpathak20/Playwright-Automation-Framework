# Playwright Automation Framework Context

## Framework

Name:
Playwright Automation Framework

Language:
TypeScript

Automation Tool:
Playwright

Architecture:
Page Object Model

## Framework Components

### Fixtures

Location:
fixtures/

Purpose:
Centralized reusable Playwright dependencies and test setup.

### Page Objects

Location:
pages/

Purpose:
Store page locators and reusable page actions.

### Tests

Location:
tests/

Purpose:
Contain business-level test scenarios.

### Test Data

Location:
testData/

Purpose:
Store reusable and environment-aware test data.

### Utilities

Location:
utils/

Purpose:
Reusable automation utilities.

Major utilities include:

- Assertion Utility
- Click Utility
- Fill Utility
- Wait Utility
- Retry Utility
- Screenshot Utility
- Excel Utility
- Faker Utility
- Environment Utility
- Dashboard Utility

### Reporting

Location:
reporting/

Includes:

- Allure reporting
- Email reporting
- Report packaging

## Environment Management

Supported environments include:

- DEV
- UAT
- PRE-PROD
- PROD

Environment configuration is separated from test implementation.

Architecture:

Environment
    ↓
Configuration
    ↓
Test Data
    ↓
Test Execution

## Test Architecture

Tests should preferably use:

- Existing fixtures
- Existing page objects
- Existing utilities
- Existing test-data mechanisms
- Existing assertion utilities

Do not create duplicate utilities when an existing framework utility can be reused.

## AI Rules

When generating automation code:

1. Prefer existing framework components.
2. Follow the Page Object Model.
3. Use TypeScript.
4. Reuse existing fixtures.
5. Reuse existing assertions.
6. Reuse environment configuration.
7. Avoid hard-coded environment URLs.
8. Avoid duplicate helper functions.
9. Do not introduce unnecessary dependencies.
10. Do not modify framework architecture without explicit approval.