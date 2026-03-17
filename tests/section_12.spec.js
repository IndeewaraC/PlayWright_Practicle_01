import {test, expect} from '@playwright/test';

let webContext;
test.beforeAll(async ({browser}) => {
    const brcontxt = await browser.newContext();
    const page = await brcontxt.newPage();

    const email = "Indeewara@gmial.com";
     const password = "Indee@123";
     await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
     await page.getByPlaceholder("email@example.com").fill(email);
     await page.getByPlaceholder("enter your passsword").fill(password);
     await page.getByRole("button",{name:"Login"}).click();
     await page.waitForLoadState('networkidle');

// save all the cookies and local storage data in a json file, so that we can use it in the next test case
//storageState() method is used to save the cookies and local storage data in a json file, so that we can use it in the next test case
     await brcontxt.storageState({path:"state.json"});//create a new state.jsoin file in the root directory and store the login state in it

//create a new context and load the login state from the state.json file
     webContext = await browser.newContext({storageState:"state.json"});
});

test.describe('Section 07 - Testing with Playwright', () => { 

   test('Login to the Client App with New Method', async () => {
   const page = await webContext.newPage();//create a new page in the new context and load the login state from the state.json file
     //In this test case we are using locators to automate login functionality of the client app

    await page.goto('https://rahulshettyacademy.com/client');

    await page.locator(".card-body b").first().waitFor();

     await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).
     getByRole("button", {name:"Add To Cart"}).click();

     await page.getByRole("listitem").getByRole("button", {name:"Cart"}).click();
     await page.locator("div li").first().waitFor();
     await expect(page.getByText("ZARA COAT 3")).toBeVisible();

     await expect(page.getByRole("button", {name:"Checkout"})).toBeVisible();
     await page.getByRole("button", {name:"Checkout"}).click();

    await page.locator(".form__cc input.text-validated").fill("4542 9931 9292 2222");
    await page.locator("select.ddl.input:first-of-type").selectOption("08");
    await page.locator("select.ddl.input:last-of-type").selectOption("29");
    await page.locator('div.field.small:has-text("CVV Code") input').fill("555");
    await page.locator('div.field:has-text("Name on Card") input').fill("Indeewara");

     await page.getByPlaceholder('Select Country').pressSequentially("Can", { delay: 150 });
     await page.getByRole("button", {name:" Canada"}).click();
     await page.getByText("Place Order ").click();
     await expect(page.getByText("Thankyou for the order.")).toBeVisible();

   });

   test('Calanders Automation Using Playwright', async ({browser})=> {
    const page = await webContext.newPage();//create a new page in the new context and load the login state from the state.json file
     //In this test case we are using locators to automate login functionality of the client app

    await page.goto('https://rahulshettyacademy.com/client');

    await page.locator(".card-body b").first().waitFor();

     await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).
     getByRole("button", {name:"Add To Cart"}).click();
   });


});