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

This framework is built following enterprise automation best practices with a focus on maintainability, scalability, and execution stability.

It helps teams build reliable Playwright automation by providing reusable utilities, environment management, smart execution helpers, organized artifacts, and modular project architecture.

---

# 🚀 What's New in v1.1

- ✅ **Assertion Utility**
- ✅ Environment Management
- ✅ Execution Dashboard
- ✅ Smart Retry Engine
- ✅ Smart Click Utility
- ✅ Smart Fill Utility
- ✅ Smart Wait Utility


---

# ✨ Features

## Framework

- ✅ Page Object Model (POM)
- ✅ Modular Architecture
- ✅ Cross Browser Testing
- ✅ Browser-Based Mobile Testing
- ✅ Parallel Execution
- ✅ Excel Data-Driven Framework

## Smart Execution

- ✅ Smart Click Utility
- ✅ Smart Fill Utility
- ✅ Smart Wait Utility
- ✅ Generic Retry Utility
- ✅ Assertion Utility
- ✅ Execution Dashboard
- ✅ Multi-Environment Support

## Utilities

- ✅ Excel Utility
- ✅ Screenshot Utility
- ✅ Download Utility
- ✅ Faker Utility
- ✅ Date & Time Utility
- ✅ Common Utility

## Reporting

- ✅ HTML Report
- ✅ Automatic Screenshots
- ✅ Smart Artifact Management

---

# 🌍 Environment Management

Execute the same test suite across multiple environments without changing code.

Supported environments:

```
config
│
└── environment
    ├── dev.env
    ├── uat.env
    ├── pre-prod.env
    └── prod.env
```

Run Tests

```bash
npm run uat

npm run preprod

npm run prod
```

Simply switch the command.

No code changes required.

---

# 📊 Execution Dashboard

Every execution automatically displays

- Framework Version
- Environment
- Base URL
- Browser
- Execution Mode
- Workers
- Platform
- Operating System
- Node Version
- Execution Start Time

Example

```
══════════════════════════════════════════════════════════════

🚀 Playwright Automation Framework

Framework Version : v1.1.0

Environment       : UAT

Browser           : Chromium

Execution Mode    : Parallel

Workers           : 4

Platform          : Windows

Node Version      : v22.x

Started At        : 30-Jul-2026

══════════════════════════════════════════════════════════════
```

---

# ⚡ Smart Utilities

The framework includes reusable smart utilities designed to improve execution stability.

### Smart Click

```javascript
await smartClick(page.locator("#login"));
```

Automatically

- Waits for visibility
- Scrolls into view
- Retries on failure
- Provides detailed logs

---

### Smart Fill

```javascript
await smartFill(username,"Admin");
```

Automatically

- Waits until editable
- Clears existing value
- Enters data
- Verifies entered value
- Retries if required

---

### Smart Wait

```javascript
await waitForPageReady(page);
```

Waits for

- DOM Loaded
- Network Idle
- Loader Disappearance
- Spinner Completion

---

### Assertion Utility

Instead of

```javascript
await expect(locator).toBeVisible();
```

Use

```javascript
await Assertion.assertVisible(locator);
```

Supports

- Element Assertions
- Page Assertions
- URL Assertions
- Text Assertions
- Count Assertions
- API Assertions
- Generic Assertions

---

# 🌐 Supported Browsers

| Browser | Supported |
|----------|-----------|
| Chromium | ✅ |
| Chrome | ✅ |
| Firefox | ✅ |
| WebKit | ✅ |
| Mobile Chrome | ✅ |
| Mobile Safari | ✅ |

---

# 📂 Framework Structure

```
Playwright_Automation
│
├── config
│   ├── environment
│   └── executionConfig.js
│
├── pages
│
├── tests
│
├── testData
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
├── reports
│
├── screenshots
│
├── downloads
│
├── playwright.config.js
│
└── package.json
```

---

# 📊 Reporting

Automatically generates

- HTML Report
- Execution Summary
- Passed Test Cases
- Failed Test Cases
- Execution Duration
- Screenshots
- Organized Artifacts

---

# 📁 Smart Artifact Management

Each execution automatically creates

```
Execution Date
│
├── Reports
├── Screenshots
├── Downloads
└── Artifacts
```

No overwritten reports.

No mixed screenshots.

Clean execution history.

---

# 📱 Mobile Testing

Supports browser-based mobile automation using Playwright Device Emulation.

- Responsive Testing
- Mobile Scroll Utility
- Touch Gestures
- Mobile Viewports
- Cross Device Validation

---

# 🚀 Parallel Execution

Supports

- Multiple Workers
- Stable Parallel Execution
- Independent Reports
- Faster Test Execution
- Cross Browser Execution

---

# 📷 Framework Screenshots

## Framework Structure

```
images/framework-structure.png
```

---

## Execution Dashboard

```
images/dashboard.png
```

---

## HTML Report

```
images/html-report.png
```

---

## Artifacts

```
images/artifacts.png
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/mrpathak20/Playwright-Automation-Framework.git
```

---

## Install Dependencies

```bash
npm install
```

---

## Install Browsers

```bash
npx playwright install
```

---

## Run Tests

```bash
npx playwright test
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

# 📦 Release History

## 🚀 v1.1.0 - Intelligent Execution Update

- Environment Management
- Execution Dashboard
- Smart Retry Utility
- Smart Click Utility
- Smart Fill Utility
- Smart Wait Utility
- Assertion Utility

---

## 🚀 v1.0.0

- Page Object Model
- Excel Data Driven Framework
- Cross Browser Testing
- Mobile Browser Automation
- API Utility
- Database Utility
- HTML Reporting
- Organized Artifacts

---


# 🤝 Contributions

Contributions are always welcome.

If you'd like to improve this framework:

- Fork the repository
- Create a feature branch
- Commit your changes
- Submit a Pull Request

---

# 💼 Services

Available for

- Playwright Framework Development
- QA Automation
- UI Automation
- API Automation
- Mobile Web Automation
- Test Framework Design
- CI/CD Integration
- Automation Consulting

---

# ⭐ Support

If this project helped you,

⭐ Star this repository

🍴 Fork it

💡 Suggest Improvements

🤝 Contribute

---

<div align="center">

## 🚀 Made with ❤️ by Priyanshu Pathak

### Happy Testing!

</div>