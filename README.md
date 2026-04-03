# 🎭 Playwright E2E: The Learning Curve

Welcome! This repository documents my journey of mastering **Playwright** from the ground up. It serves as a personal sandbox and portfolio project to demonstrate a deep dive into modern web automation.

## 🎯 Learning Objectives
This project tracks my progress in implementing:
* **Core Automation:** Navigating, locating elements, and handling async operations.
* **Page Object Model (POM):** Architecting clean, maintainable, and reusable code.
* **Advanced Assertions:** Utilizing Playwright's web-first assertions for flaky-free tests.
* **Parallel Execution:** Leveraging Playwright's speed to run tests across multiple browsers.
* **CI/CD Integration:** Running automated suites via GitHub Actions.
* **Reporting:** Analyzing test results using the built-in HTML reporter.

## 🛠️ Tech Stack
* **Engine:** [Playwright Test](https://playwright.dev/)
* **Language:** JavaScript / TypeScript
* **Runner:** Playwright Native Runner
* **CI/CD:** GitHub Actions

## 📁 Project Structure
```text
├── tests/               # All test specifications (.spec.js)
├── pages/               # Page Object Model (POM) classes
├── playwright.config.js # Global configuration (browsers, timeouts, etc.)
├── .github/workflows/   # CI/CD pipeline configuration
└── playwright-report/   # Automatically generated test reports
