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
        await page.pause();
        page.on('dialog', async dialog => {
                console.log(dialog.message());
            dialog.accept()});//accept the dialog box (.dismiss() for cancel)

        await page.locator("#confirmbtn").click();

        //hoover mouse        await page.locator("#mousehover").hover();
        await page.locator("#mousehover").hover();
        const topLink = page.getByRole('link', { name: 'Top' });
        await expect(topLink).toBeVisible();
    });

    test('Child Window Handling', async ({ page }) => {
        await page.goto('https://www.rahulshettyacademy.com/AutomationPractice/');
        //iframes cannot be handled by page, first switch to the frame and then handle the elements inside the frame.
        const framepage = page.frameLocator("#courses-iframe");
        await framepage.locator("li a[href*='lifetime-access']:visible").click();
        const textcont = await framepage.locator(".text h2").textContent();
        console.log(textcont.split(" ")[1].trim());

    });

    
});