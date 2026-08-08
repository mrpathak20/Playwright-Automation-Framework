<div align="center">

# 🚀 Playwright Automation Framework

### Enterprise-Ready | Smart Utilities | Data-Driven | Cross-Browser | Mobile Web

<p align="center">
  <img src="https://img.shields.io/badge/Version-v1.1.0-blue"/>
  <img src="https://img.shields.io/badge/Playwright-Latest-2EAD33?logo=playwright&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Architecture-POM-blue"/>
  <img src="https://img.shields.io/badge/Data--Driven-Excel-success"/>
  <img src="https://img.shields.io/badge/Execution-Smart-green"/>
  <img src="https://img.shields.io/badge/Open%20Source-❤️-red"/>
</p>

A scalable, reusable, and enterprise-ready Playwright Automation Framework designed for modern web and mobile browser automation.

Built with clean architecture, reusable utilities, smart execution features, environment management, cross-browser testing, and browser-based mobile automation.

⭐ **If you like this project, don't forget to Star this repository!**

</div>

---

# 📖 Overview

This framework is built following enterprise automation best practices with a focus on:

* Maintainability
* Scalability
* Execution stability
* Test data management
* Reusable components
* Detailed reporting
* Environment management
* Cross-browser execution
* Mobile web automation
* CI/CD readiness

It helps teams build reliable Playwright automation by providing reusable utilities, environment management, environment-aware test data, custom fixtures, smart execution helpers, centralized assertions, organized artifacts, Allure reporting, email reporting, and modular project architecture.

The framework is designed to support both **day-to-day automation execution** and **long-term framework scalability**.

---

# 🚀 What's New in v1.2

* ✅ **Custom Playwright Fixtures**
* ✅ **Environment-Aware Test Data Management**
* ✅ **Allure Reporting**
* ✅ **Allure Environment Information**
* ✅ **Allure History & Trends**
* ✅ **Soft Assertion Support**
* ✅ **Email Execution Reporting**
* ✅ **Automatic Report ZIP Generation**
* ✅ **Allure Report Packaging**
* ✅ **Playwright HTML Report Packaging**
* ✅ **Screenshots, Videos & Trace Attachments**
* ✅ **Global Setup & Teardown Reporting Integration**
* ✅ **Improved Reporting Architecture**

---

# ✨ Features

## 🏗️ Framework

* ✅ Page Object Model (POM)
* ✅ Modular Architecture
* ✅ Custom Playwright Fixtures
* ✅ Cross Browser Testing
* ✅ Browser-Based Mobile Testing
* ✅ Parallel Execution
* ✅ Excel Data-Driven Framework
* ✅ Environment-Aware Test Data
* ✅ Multi-Environment Support
* ✅ Reusable Utilities
* ✅ Centralized Configuration

---

## ⚡ Smart Execution

* ✅ Smart Click Utility
* ✅ Smart Fill Utility
* ✅ Smart Wait Utility
* ✅ Generic Retry Utility
* ✅ Assertion Utility
* ✅ Soft Assertion Support
* ✅ Execution Dashboard
* ✅ Environment Management
* ✅ Test Data Management

---

## 🛠️ Utilities

* ✅ Excel Utility
* ✅ Screenshot Utility
* ✅ Download Utility
* ✅ Faker Utility
* ✅ Date & Time Utility
* ✅ Common Utility
* ✅ Assertion Utility
* ✅ Environment Utility
* ✅ Retry Utility
* ✅ Wait Utility

---

## 📊 Reporting

* ✅ HTML Report
* ✅ Allure Report
* ✅ Allure Environment
* ✅ Allure History
* ✅ Allure Trends
* ✅ Execution Summary
* ✅ Email Reporting
* ✅ Automatic Report Packaging
* ✅ Screenshots
* ✅ Videos
* ✅ Playwright Traces
* ✅ Test Attachments
* ✅ Smart Artifact Management

---

# 🌍 Environment Management

Execute the same test suite across multiple environments without changing test code.

### Supported Environments

```text
config
│
└── environment
    ├── dev.env
    ├── uat.env
    ├── pre-prod.env
    └── prod.env
```

### Run Tests

```bash
npm run uat
```

```bash
npm run preprod
```

```bash
npm run prod
```

Simply switch the command.

No test code changes are required.

The framework loads the corresponding environment configuration and uses the environment-specific Base URL and configuration during execution.

---

# 🗃️ Environment-Aware Test Data

The framework includes an environment-aware test data management layer.

Environment switching is not limited to changing the application URL.

The framework also provides a structured approach for handling test data according to the selected environment.

### Example

```text
Environment
│
├── DEV
│   └── DEV Test Data
│
├── UAT
│   └── UAT Test Data
│
├── PRE-PROD
│   └── PRE-PROD Test Data
│
└── PROD
    └── PROD Test Data
```

This approach helps maintain separation between:

* Application Configuration
* Environment Configuration
* Test Data
* Test Implementation

The same automation test can therefore be executed across different environments without modifying the actual test implementation.

---

# 🧩 Custom Playwright Fixtures

Custom Playwright Fixtures have been integrated into the framework to centralize reusable test dependencies and setup logic.

Fixtures help reduce repeated setup code and provide a cleaner way to manage framework-level dependencies.

### Benefits

* Reusable test context
* Reduced duplicate setup
* Cleaner test cases
* Centralized dependencies
* Better maintainability
* Easier framework extension
* Consistent test initialization

### Example

```javascript
test('Login Test', async ({ page }) => {

    // Test implementation

});
```

Framework-level setup and reusable dependencies can be handled through fixtures instead of repeating setup logic across individual tests.

---

# 📊 Execution Dashboard

Every execution automatically displays:

* Framework Version
* Environment
* Base URL
* Browser
* Execution Mode
* Workers
* Platform
* Operating System
* Node Version
* Execution Start Time

### Example

```text
══════════════════════════════════════════════════════════════

🚀 Playwright Automation Framework

Framework Version : v1.2.0

Environment       : UAT

Base URL          : Environment Base URL

Browser           : Chromium

Execution Mode    : Parallel

Workers           : 4

Platform          : Windows

Operating System  : Windows

Node Version      : v22.x

Started At        : 30-Jul-2026

══════════════════════════════════════════════════════════════
```

The dashboard provides immediate visibility into the execution context before the test suite starts.

---

# ⚡ Smart Utilities

The framework includes reusable smart utilities designed to improve execution stability and reduce repetitive automation code.

---

## 🖱️ Smart Click

```javascript
await smartClick(page.locator("#login"));
```

Automatically:

* Waits for visibility
* Scrolls into view
* Performs the click
* Retries on failure
* Provides execution logs

---

## ✍️ Smart Fill

```javascript
await smartFill(username, "Admin");
```

Automatically:

* Waits until editable
* Clears existing value
* Enters data
* Verifies entered value
* Retries if required
* Provides execution logs

---

## ⏳ Smart Wait

```javascript
await waitForPageReady(page);
```

Handles common page readiness conditions such as:

* DOM Loaded
* Network Idle
* Loader Disappearance
* Spinner Completion

---

# 🧪 Assertion Utility

Instead of:

```javascript
await expect(locator).toBeVisible();
```

Use:

```javascript
await Assertion.assertVisible(locator);
```

Supports:

* Element Assertions
* Page Assertions
* URL Assertions
* Text Assertions
* Count Assertions
* API Assertions
* Generic Assertions
* Soft Assertions

The centralized assertion layer keeps validation logic consistent across the framework.

---

# 🌐 Supported Browsers

| Browser       | Supported |
| ------------- | :-------: |
| Chromium      |     ✅     |
| Chrome        |     ✅     |
| Firefox       |     ✅     |
| WebKit        |     ✅     |
| Mobile Chrome |     ✅     |
| Mobile Safari |     ✅     |

---

# 📂 Framework Structure

```text
Playwright_Automation
│
├── config
│   │
│   ├── environment
│   │   ├── dev.env
│   │   ├── uat.env
│   │   ├── pre-prod.env
│   │   └── prod.env
│   │
│   └── executionConfig.js
│
├── pages
│
├── tests
│
├── testData
│
├── fixtures
│
├── utilities
│   ├── assertionUtil.js
│   ├── clickUtil.js
│   ├── dashboardUtil.js
│   ├── downloadUtil.js
│   ├── environmentUtil.js
│   ├── excelUtil.js
│   ├── fakerUtil.js
│   ├── fillUtil.js
│   ├── retryUtil.js
│   ├── screenshotUtil.js
│   └── waitUtil.js
│
├── reporting
│   │
│   ├── allure
│   │   └── environmentWriter.js
│   │
│   ├── email
│   │   ├── executionSummary.js
│   │   └── emailUtil.js
│   │
│   └── zip
│       └── zipReport.js
│
├── reports
├── screenshots
├── downloads
├── allure-results
├── allure-report
├── playwright-report
├── test-results
├── global-setup.js
├── global-teardown.js
├── playwright.config.js
└── package.json
```

---

# 📊 Reporting

The framework provides multiple reporting layers for better execution visibility.

Automatically generates:

* HTML Report
* Allure Report
* Execution Summary
* Passed Test Cases
* Failed Test Cases
* Skipped Test Cases
* Execution Duration
* Screenshots
* Videos
* Playwright Traces
* Test Attachments
* Allure Environment Information
* Allure History
* Allure Trends
* Organized Artifacts
* Email Execution Report

---

# 📈 Allure Reporting

The framework integrates **Allure Reporting** for detailed execution analysis.

Allure provides:

* Test Execution Summary
* Passed Tests
* Failed Tests
* Skipped Tests
* Test Duration
* Test Details
* Test Steps
* Screenshots
* Videos
* Trace Information
* Attachments
* Environment Information
* Categories
* History
* Trends

### Generate Allure Report

```bash
allure generate allure-results --clean -o allure-report
```

### Open Allure Report

```bash
allure open allure-report
```

### Check Allure Version

```bash
npx allure --version
```

---

# 🌍 Allure Environment

The framework automatically provides execution environment information to the Allure report.

Environment information includes:

* Framework Version
* Test Environment
* Browser
* Operating System
* Platform
* Node Version
* Base URL

This provides better visibility into where and how the test execution was performed.

---

# 📊 Allure History & Trends

Allure history and trend information is maintained across executions.

The report provides trend information such as:

* Test Execution History
* Duration Trends
* Retry Trends
* Category Trends

This allows teams to analyze execution stability and test behavior across multiple runs.

---

# 📧 Email Reporting

The framework includes automated email execution reporting.

The email report generates a professional HTML execution summary.

The report can include:

* Execution Environment
* Total Tests
* Passed Tests
* Failed Tests
* Skipped Tests
* Execution Duration
* Execution Status
* Test Summary
* Report Attachments

### Example

```text
════════════════════════════════════════════

🚀 Playwright Automation Execution Summary

Environment : UAT

Total Tests : 10

Passed      : 8

Failed      : 1

Skipped     : 1

Execution Status : COMPLETED

════════════════════════════════════════════
```

---

# 📦 Automatic Report Packaging

The framework automatically packages execution reports into ZIP files.

### Generated Reports

```text
reports
│
├── allure-report.zip
│
└── playwright-report.zip
```

The generated ZIP files can be attached to the execution email.

This makes it easier to share complete execution results with:

* QA Teams
* Developers
* Managers
* Clients
* CI/CD Stakeholders

---

# 📁 Smart Artifact Management

Each execution automatically manages:

```text
Execution
│
├── Reports
├── Screenshots
├── Downloads
└── Artifacts
```

### Benefits

* No overwritten reports
* No mixed screenshots
* Organized execution artifacts
* Easier failure investigation
* Easier report sharing

---

# 🔄 Reporting Workflow

```text
                          Test Execution
                               │
                               ▼
                       Execution Dashboard
                               │
                               ▼
                         Playwright Tests
                               │
              ┌────────────────┼─────────────────┐
              │                │                 │
              ▼                ▼                 ▼
        Screenshots          Videos            Traces
              │                │                 │
              └────────────────┼─────────────────┘
                               ▼
                         Test Results
                               │
                               ▼
                         Allure Results
                               │
                               ▼
                          Allure Report
                               │
                               ▼
                       Report Packaging
                               │
                               ▼
                        Email Reporting
```

---

# 📱 Mobile Testing

Supports browser-based mobile automation using **Playwright Device Emulation**.

### Features

* Responsive Testing
* Mobile Scroll Utility
* Touch Gestures
* Mobile Viewports
* Cross Device Validation
* Mobile Browser Testing

---

# 🚀 Parallel Execution

Supports:

* Multiple Workers
* Stable Parallel Execution
* Independent Test Execution
* Faster Test Execution
* Cross Browser Execution
* Organized Test Artifacts

---

# 📊 Data-Driven Testing

The framework supports **Excel-based data-driven testing**.

Excel utilities can be used for:

* Test Data Management
* Multiple Test Combinations
* Parameterized Execution
* Data-Driven Test Cases
* Environment-Specific Test Data

### Execution Flow

```text
Excel Test Data
      │
      ▼
Test Data Utility
      │
      ▼
Test Case
      │
      ▼
Playwright Execution
```

---

# 🎲 Faker Utility

The framework includes Faker-based dynamic test data generation.

It can be used for generating dynamic values such as:

* Names
* Mobile Numbers
* Email Addresses
* Random Values
* Test Data

This reduces dependency on hardcoded test values.

---

# 🛠️ Utility Layer

The framework contains reusable utilities for common automation requirements.

### Utilities Include

* Assertion Utility
* Click Utility
* Fill Utility
* Wait Utility
* Retry Utility
* Screenshot Utility
* Download Utility
* Excel Utility
* Faker Utility
* Environment Utility
* Dashboard Utility
* Common Utility

The utility layer helps reduce duplicate automation code and improves maintainability.

---

# 📷 Framework Screenshots

## Framework Structure

```text
images/framework-structure.png
```

---

## Execution Dashboard

```text
images/dashboard.png
```

---

## HTML Report

```text
images/html-report.png
```

---

## Allure Report

```text
images/allure-report.png
```

---

## Email Report

```text
images/email-report.png
```

---

## Artifacts

```text
images/artifacts.png
```

---

# 🚀 Getting Started

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git
* Playwright
* Allure CLI

---

## Clone Repository

```bash
git clone https://github.com/mrpathak20/Playwright-Automation-Framework.git
```

---

## Navigate to Project

```bash
cd Playwright-Automation-Framework
```

---

## Install Dependencies

```bash
npm install
```

---

## Install Playwright Browsers

```bash
npx playwright install
```

---

# ▶️ Run Tests

## Run All Tests

```bash
npx playwright test
```

---

## Run Tests in Headed Mode

```bash
npx playwright test --headed
```

---

## Run Specific Test

```bash
npx playwright test tests/example.spec.js
```

---

## Run UAT

```bash
npm run uat
```

---

## Run Pre-Production

```bash
npm run preprod
```

---

## Run Production

```bash
npm run prod
```

---

# 📈 Allure Commands

## Check Allure Version

```bash
npx allure --version
```

---

## Generate Allure Report

```bash
allure generate allure-results --clean -o allure-report
```

---

## Open Allure Report

```bash
allure open allure-report
```

---

# 📊 Playwright HTML Report

Open the Playwright HTML report:

```bash
npx playwright show-report
```

The Playwright report provides:

* Test Execution Summary
* Passed Tests
* Failed Tests
* Test Duration
* Screenshots
* Videos
* Trace Viewer
* Test Details

---

# 📧 Email Configuration

Email credentials should be managed through environment variables.

### Example

```env
EMAIL_FROM=your-email@example.com
EMAIL_PASSWORD=your-email-password
EMAIL_TO=recipient@example.com
```

**Do not commit actual credentials to GitHub.**

Recommended approaches include:

* Environment Variables
* GitHub Actions Secrets
* Jenkins Credentials
* Azure DevOps Variables
* CI/CD Secret Management

---

# 🔐 Environment & Credentials

Environment files containing credentials or sensitive information should not be committed to GitHub.

Sensitive information such as:

* Usernames
* Passwords
* Email Credentials
* API Credentials
* Access Tokens

should be managed using environment variables or CI/CD secret management.

---

# 🔄 Global Setup & Teardown

The framework uses global setup and teardown processes for framework-level execution tasks.

### Global Setup

Global setup can be used for:

* Framework initialization
* Reporting folder preparation
* Environment initialization
* Execution preparation

### Global Teardown

Global teardown can be used for:

* Allure report generation
* Report processing
* Execution cleanup
* Final reporting operations

This provides a centralized lifecycle for framework execution.

---

# 🚀 CI/CD Ready

The framework is structured for integration with:

* GitHub Actions
* Jenkins
* Azure DevOps
* GitLab CI

Execution reports and artifacts can be published as part of CI/CD execution.

The reporting architecture also allows execution summaries and reports to be distributed through email.

---

# 🏗️ Enterprise Architecture

The framework follows a modular architecture:

```text
                     ┌─────────────────────┐
                     │     Test Cases      │
                     └──────────┬──────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │   Custom Fixtures   │
                     └──────────┬──────────┘
                                │
                ┌───────────────┼───────────────┐
                ▼               ▼               ▼
        ┌──────────────┐ ┌────────────┐ ┌──────────────┐
        │ Page Objects │ │ Test Data  │ │  Utilities   │
        └──────┬───────┘ └─────┬──────┘ └──────┬───────┘
               │               │               │
               └───────────────┼───────────────┘
                               ▼
                     ┌─────────────────────┐
                     │ Playwright Engine   │
                     └──────────┬──────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │   Test Execution    │
                     └──────────┬──────────┘
                                │
                ┌───────────────┼─────────────────┐
                ▼               ▼                 ▼
        ┌─────────────┐ ┌─────────────┐   ┌─────────────┐
        │ HTML Report │ │Allure Report│   │   Artifacts │
        └─────────────┘ └──────┬──────┘   └─────────────┘
                               │
                               ▼
                         ┌─────────────┐
                         │Email Report │
                         └─────────────┘
```

---

# 📋 Framework Capabilities

| Capability                  | Status |
| --------------------------- | :----: |
| Page Object Model           |    ✅   |
| Playwright Test             |    ✅   |
| Custom Fixtures             |    ✅   |
| Environment Management      |    ✅   |
| Environment-Aware Test Data |    ✅   |
| Excel Data-Driven Testing   |    ✅   |
| Faker Test Data             |    ✅   |
| Smart Click                 |    ✅   |
| Smart Fill                  |    ✅   |
| Smart Wait                  |    ✅   |
| Retry Utility               |    ✅   |
| Assertion Utility           |    ✅   |
| Soft Assertions             |    ✅   |
| Execution Dashboard         |    ✅   |
| Cross Browser Testing       |    ✅   |
| Mobile Web Testing          |    ✅   |
| HTML Reporting              |    ✅   |
| Allure Reporting            |    ✅   |
| Allure Environment          |    ✅   |
| Allure History              |    ✅   |
| Allure Trends               |    ✅   |
| Screenshots                 |    ✅   |
| Videos                      |    ✅   |
| Playwright Traces           |    ✅   |
| Email Reporting             |    ✅   |
| Report ZIP Packaging        |    ✅   |
| CI/CD Ready                 |    ✅   |

---

# 📦 Release History

## 🚀 v1.2.0 - Enterprise Reporting & Test Execution Update

### Framework

* Custom Playwright Fixtures
* Environment-Aware Test Data Management
* Improved Framework Architecture

### Reporting

* Allure Reporting
* Allure Environment Information
* Allure History
* Allure Trends
* Email Execution Reporting
* Execution Summary
* Automatic Report Packaging

### Test Execution

* Soft Assertion Support
* Screenshots
* Videos
* Playwright Traces
* Global Setup & Teardown Reporting Integration

### Report Distribution

* Allure Report ZIP
* Playwright HTML Report ZIP
* Email Attachments

---

## 🚀 v1.1.0 - Intelligent Execution Update

* Environment Management
* Execution Dashboard
* Smart Retry Utility
* Smart Click Utility
* Smart Fill Utility
* Smart Wait Utility
* Assertion Utility

---

## 🚀 v1.0.0

* Page Object Model
* Excel Data Driven Framework
* Cross Browser Testing
* Mobile Browser Automation
* API Utility
* Database Utility
* HTML Reporting
* Organized Artifacts

---

# 🛣️ Future Roadmap

Future versions may include:

* 🤖 AI-Assisted Test Generation
* 🔌 Playwright MCP Integration
* 🤖 AI Agent Support
* 🧠 Intelligent Failure Analysis
* 🩹 AI-Assisted Automation Recovery
* 🔔 Slack / Teams Notifications
* 🐳 Docker Integration
* ☁️ Cloud Browser Execution
* 📊 Advanced Execution Analytics

AI and self-healing capabilities are intentionally planned for a future AI-enabled evolution of the framework.

---

# 🤝 Contributions

Contributions are always welcome.

If you'd like to improve this framework:

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Commit your changes
5. Push the branch
6. Submit a Pull Request

---

# 💼 Services

Available for:

* Playwright Framework Development
* QA Automation
* UI Automation
* API Automation
* Mobile Web Automation
* Test Framework Design
* Test Data Management
* Reporting Framework Development
* CI/CD Integration
* Automation Consulting

---

# 💬 Collaboration

Open to collaboration, knowledge sharing, and freelance opportunities around:

* Playwright Automation
* Test Automation Frameworks
* QA Automation
* JavaScript / Playwright
* Test Data Management
* Reporting Automation
* CI/CD Automation

Feel free to connect and discuss automation requirements or framework development opportunities.

---

# ⭐ Support

If this project helped you:

⭐ **Star this repository**

🍴 **Fork it**

💡 **Suggest Improvements**

🤝 **Contribute**

📢 **Share it with other automation engineers**

---

# 📄 License

This project is intended for:

* Learning
* Experimentation
* Framework Development
* Professional Automation Use

---

## 🚀 Made with ❤️ by Priyanshu Pathak

</div>
