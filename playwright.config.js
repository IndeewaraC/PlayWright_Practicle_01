//Basic configuration file for Playwright tests
// In this file, we define the configuration for our Playwright tests,
// such as the test directory, timeout settings, and the browser to use for testing.

const { defineConfig, devices } = require('@playwright/test');
const { trace } = require('node:console');
/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests', 
  workers: process.env.CI ? 1 : undefined,
  // Specify the directory where the test files are located, 
  //we can also give the test js files in the testDir, 
  // for example: testDir: './tests/*.spec.js'

  timeout: 30 * 1000, // Set the maximum time one test can run for.
  //default 30 sec is the timeout for each test, you can change it according to your needs.

  expect:{
    timeout: 40 * 1000, // Set the maximum time expect() 
    // should wait for the condition(Assertions) to be met.

  },
  reporter: 'html', // Set the reporter to use for test results.


  // use: {
  //   // Set the browser to use for testing.
  //   browserName: 'chromium',
  //   channel: 'msedge',
  // Headless: true,
  // Use the Microsoft Edge browser for testing.

  // },
  use: {
    // Set the browser to use for testing.
    browserName: 'chromium',
  Headless: false,
  viewport: { width: 1920, height: 1080 },
  screenshot: 'on',// Capture screenshots every 
  trace: 'on', // Collect trace when retrying the failed test.retain-on-failure
  }

// projects: 
//   {
//     name: 'Chromium',
//     use: { 
//       browserName: 'chromium',
//       Headless: true, // Run tests in headed mode (with a visible browser window).
//     },
//   },
//   {
//     name: 'Microsoft Edge',
//     use: { 
//       browserName: 'chromium',
//       channel: 'msedge',
//       Headless: true,
//     },
//   },
// ],


});

module.exports = config  // Export the configuration object for Playwright to use.