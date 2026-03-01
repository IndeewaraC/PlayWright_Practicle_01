import {test, expect} from '@playwright/test'; // Import the test and expect functions from Playwright

test.describe('Section 07 - Testing with Playwright', () => { 
   test('Playwrite Special Locators - GetbyLabel', async ({page}) => { 
      await page.goto('https://rahulshettyacademy.com/angularpractice/'); 
      await page.getByLabel("Check me out if you Love IceCreams!").check();
      // playwright locate the labele and click any clicable element in the labelnearmy in that zone
      await page.getByLabel("Employed").check();
      await page.getByLabel("gender").selectOption("Male");
   });
test('Playwrite Special Locators - GetByPlaceholder', async ({page}) => {
   await page.goto('https://rahulshettyacademy.com/angularpractice/');
   await page.getByPlaceholder("Password").fill("Test");
});



});// Describe the test suite for Section 07

