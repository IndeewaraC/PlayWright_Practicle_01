import {test, expect} from '@playwright/test'; // Import the test and expect functions from Playwright
import { isGeneratorObject } from 'node:util/types';

test.describe('Section 07 - Testing with Playwright', () => { 
   test('Login to the Client App with New Method', async ({page}) => {
     //In this test case we are using locators to automate login functionality of the client app
     const email = "Indeewara@gmial.com";
     const password = "Indee@123";
     await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
     await page.getByPlaceholder("email@example.com").fill(email);
     await page.getByPlaceholder("enter your passsword").fill(password);
     await page.getByRole("button",{name:"Login"}).click();
     await page.waitForLoadState('networkidle');
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
});

test.describe('Calanders Automation Using Playwright', () => {
  test('New Page open and set calander', async ({browser})=> {
    const context = await browser.newContext();
    const page =  await context.newPage();

    const monthnumber = "9";
    const yearnumber = "2027";
    const date = "9";

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    
    const documentLink = page.getByRole("link", { name: "Top Deals" });
 
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])
   
   await newPage.waitForLoadState('networkidle');
   await newPage.bringToFront(page);
   await page.pause();

   await newPage.locator(".react-date-picker__inputGroup").click();
   await newPage.locator(".react-calendar__navigation__label").click();
   await newPage.locator(".react-calendar__navigation__label").click();

   await newPage.getByText(yearnumber).click();
   await newPage.locator(".react-calendar__year-view__months__month").nth(Number(monthnumber-1)).click();
   await newPage.locator("//abbr[text()='"+date+"']").click();

  });

});




