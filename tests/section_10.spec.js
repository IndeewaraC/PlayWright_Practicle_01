const {test,expect} = require('@playwright/test');

test.describe('Section 10', () => {

    test('browser navigation', async ({ page }) => {
        await page.goto('https://www.rahulshettyacademy.com/AutomationPractice/');
        //await page.goto('http://google.com');
        //go forward and backward navigation
        //await page.goBack();
        //await page.goForward();
        
    });

    test('Alert Validations', async ({ page }) => {
        await page.goto('https://www.rahulshettyacademy.com/AutomationPractice/');

        await expect(page.locator("#displayed-text")).toBeVisible();
        await page.locator("#hide-textbox").click();
        await expect(page.locator("#displayed-text")).toBeHidden();

    });

    
});