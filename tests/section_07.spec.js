import { test, expect } from '@playwright/test'; // Import the test and expect functions from Playwright

test.describe('Section 07 - Testing with Playwright', () => {
   test('Playwrite Special Locators - GetbyLabel', async ({ page }) => {
      await page.goto('https://rahulshettyacademy.com/angularpractice/');
      await page.getByLabel("Check me out if you Love IceCreams!").check();
      // playwright locate the labele and click any clicable element in the labelnearmy in that zone
      await page.getByLabel("Employed").check();
      await page.getByLabel("gender").selectOption("Male");
   });
   test('Playwrite Special Locators - GetByPlaceholder & GetbyRole', async ({ page }) => {
      expect(await page.goto('https://rahulshettyacademy.com/angularpractice/'));
      expect(await page.getByPlaceholder("Password").fill("Test"));
      expect(await page.getByRole("button", { name: "Submit" }).click());
      expect(await page.getByText("Success! The Form has been submitted successfully!").isVisible());
      await page.getByRole("Link", { name: "Shop" }).click();

      // In this care there is only one button no need to filter with name
      await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button", { name: "Add " }).click();

   });

});// Describe the test suite for Section 07

