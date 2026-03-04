const  {test,expect} = require('@playwright/test'); 
const { escape } = require('node:querystring');
// this is import the test and expect functions from the Playwright testing library.


//@test in test file exeutes in sequentially, 
// so we can write multiple test cases in the same file and they will be executed 
// one after the other.

test('First Test case',async ({browser}) => {
//in JS steps are assynchronous,
//  so we need to use async and (await) to handle the asynchronous nature of the code.
//Async functions allow us to write code that looks synchronous 
// but actually runs asynchronously and allows us to use the await keyword to wait for 
// promises to resolve before moving on to the next line of code.

//()=> is an annonymous function, it is a function without a name.
//In this case, we are using an arrow function to define the test case. 
// The test function takes two arguments: the name of the test case and a 
// callback function that contains the test code. 

// The callback function is defined as an async function, which allows 
// us to use the await keyword inside it to handle asynchronous operations.

//{browser} is a playwright fixture that provides a browser instance for the test.
// A fixture is a special function that provides a value to the test case. 
// In this case, the browser fixture provides a browser instance that 
// we can use to interact with the web page.



const context = await browser.newContext();
//we can send progies or plugins to the browser context, which will be used for all the pages created in that context.
//A browser context is an isolated environment within a browser instance. 
// It allows you to create multiple independent sessions within the same browser instance, 
// which can be useful for testing different scenarios or for running tests in parallel.

const page = await context.newPage(); //this is create new page in the browser context,
//  which we can use to navigate to a web page and interact with it.

await page.goto('https://www.google.com'); //this is navigate to the google website.


}); 

// This is the playwright test case temolate, 
// you can write your test code inside the function.

test('Browser Context Test', async ({page}) => {
// test('First Test case',async ({ page}) =>  This is another way to write the test case, 
// where we can directly use the page fixture provided by Playwright.

await page.goto('https://parabank.parasoft.com/parabank/index.htm');

//get the title of the page and print it in the console.
console.log(await page.title()); //this is get the title of the page and print it in the console.
await expect(page).toHaveTitle('ParaBank | Welcome | Online Banking');

//.only is a method provided by Playwright that allows 
// us to run only a specific test case or a group of test cases.


//css selector is a way to select elements on a web page using CSS syntax.
//xpath is a way to select elements on a web page using XML syntax.


await page.locator('[name="username"]').fill("john");
await page.locator('[name="password"]').fill("demo");
await page.locator('[value="Log In"]').click();


});

test('Login Function in OHRM', async ({page}) => {
// test('First Test case',async ({ page}) =>  This is another way to write the test case, 
// where we can directly use the page fixture provided by Playwright.

const UN = page.locator('[name="username"]');
const PW = page.locator('[name="password"]');

await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

console.log(await page.title()); 
await expect(page).toHaveTitle('OrangeHRM');

await UN.type("john");
await PW.type("demo");
await page.locator('[type="submit"]').click();

console.log(await page.locator("[class*='oxd-alert-content oxd-alert-content--error']").textContent());
await expect(page.locator("[class*='oxd-alert-content oxd-alert-content--error']")).toContainText('Invalid credentials');

//clear exsitisting text in the input field and type new text
await UN.fill("");
await UN.fill("Admin");
await PW.fill("");
await PW.fill("admin123");
await page.locator('[type="submit"]').click();

console.log(await page.locator("[class*='oxd-topbar-header-title']").textContent());
await expect(page.locator("[class*='oxd-topbar-header-title']")).toContainText('Dashboard');

});

test('Select All card Elements- Swag Labs', async ({page}) => {
const UN = page.getByPlaceholder('Username');
const PW = page.getByPlaceholder('Password');

await page.goto('https://www.saucedemo.com/');

await UN.fill("standard_user");
await PW.fill("secret_sauce");
await page.locator('[type="submit"]').click();


const cards = page.locator(".inventory_item_description a"); //this is select all the card elements on the page using the CSS selector.
const count = await cards.count(); //this is get the count of the card elements.

console.log(await page.title()); 
await expect(page).toHaveTitle('Swag Labs');

console.log(await cards.first().textContent()); //this is get the text content of the first card element and print it in the console.
console.log(await cards.nth(1).textContent());

const allCardsText = await cards.allTextContents();
console.log(allCardsText);  //this is get the text content of all the card elements and print it in the console.

});

test('Network Idle Method- Swag Labs', async ({page}) => {
const cards = page.locator(".inventory_item_description a"); //this is select all the card elements on the page using the CSS selector.
const count = await cards.count(); //this is get the count of the card elements.

const UN = page.getByPlaceholder('Username');
const PW = page.getByPlaceholder('Password');

await page.goto('https://www.saucedemo.com/');

await UN.fill("standard_user");
await PW.fill("secret_sauce");
await page.locator('[type="submit"]').click();



console.log(await page.title()); 
await expect(page).toHaveTitle('Swag Labs');
 //this is wait for the network to be idle, which means that there are no more network requests being made.
await page.waitForLoadState('networkidle');

console.log(await cards.first().textContent()); //this is get the text content of the first card element and print it in the console.
console.log(await cards.nth(1).textContent());

const allCardsText = await cards.allTextContents();
console.log(allCardsText);  //this is get the text content of all the card elements and print it in the console.

});

//test('UI Controls', async ({page}) => {
//await page.goto('https://www.visions.ca/');

//const menuWrapper = page.locator('.signin-dropdown-wrapper').first();
//this is select the menu wrapper element on the page using the CSS selector 
// and get the first element if there are multiple elements with the same class name.

//await menuWrapper.hover({force: true});
 //this is hover over the menu wrapper element to display the dropdown menu. The force option is used to force the hover action even if the element is not visible or interactable.

//const signInBtn = page.locator('.signin-links a', { hasText: 'Sign In' }).first();
//this is select the sign in button element from the dropdown menu using the CSS selector and the hasText option to filter the elements based on their text content.
//await signInBtn.click({force: true}); //this is click on the sign in button to navigate to the sign in page.

//await expect(page).toHaveURL(/.*account\/login/); //verify that the URL of the page contains the expected path after clicking the sign in button.

//await page.pause(); 
//this is pause the test execution, which allows us to inspect the page and debug the test if needed.

//});

test('UI Controls-2 Radio check box', async ({page}) => {
await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

await page.locator('#radio-btn-example .radioButton').first().click();
//await page.locator('input[type="checkbox"]').nth(1).click();
//this is select the first radio button element and click on it, and then select the second checkbox element and click on it.

await expect(page.locator('#radio-btn-example .radioButton').first()).toBeChecked();
//this is verify that the last radio button element is checked after clicking on it.

});

test('UI Controls-3 checkbox', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await page.locator('#checkbox-example #checkBoxOption1').click();
     //this is select the checkbox element with the value "option1" and check it.
     await expect(page.locator('#checkbox-example #checkBoxOption1')).toBeChecked();
     //this is verify that the checkbox element with the value "option1" is checked after clicking on it.
     await page.locator('#checkbox-example #checkBoxOption1').uncheck();
     //this is uncheck the checkbox element with the value "option1" if it is checked.

     //await expect(page.locator('#checkbox-example #checkBoxOption1')).not.toBeChecked()
      expect(await page.locator('#checkbox-example #checkBoxOption1').isChecked()).toBeFalsy();
     //we can also use .tobefalse() instead of .not.toBeChecked() to verify that the checkbox element is not checked.
     //this is verify that the checkbox element with the value "option1" is not checked after unchecking it.
});

test('UI Controls-4 dropdown', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    const items = page.locator('.cen-right-align #dropdown-class-example');
    const value = await items.selectOption('option1');
    page.pause();

    console.log(value); //this is get the value of the selected option in the dropdown and print it in the console.

    expect(value).toContain('option1'); //this is verify that the value of the selected option in the dropdown is "option1".

    expect(value).not.toContain('select'); 
});

test('UI Controls-5 Blink Banner Test', async ({page}) => {
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

const Href = page.locator("[href*='documents-request']");
// this select by Href contains "documents-request" and click on it.
await expect(Href).toHaveAttribute("class","blinkingText");
// in herer we pass to toHaveAttribute() method the 
// attribute name "class" and the expected value "blinkingText" to 
// verify that the element has the expected class attribute value.
});

test('@Child windows hadl', async ({browser})=>
 {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened
   
 
    const  text = await newPage.locator(".red").textContent();
    //textcontent() is a method that returns the text already in the DOM
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
   
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
 
 });

 test('add Item to the Cart', async ({page}) => {

const productname = "ZARA COAT 3";
const products = page.locator(".card-body");
const email = "Indeewara@gmial.com";

await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
await page.locator("#userEmail").fill(email);
await page.locator("#userPassword").fill("Indee@123");
await page.locator("#login").click();

await page.waitForLoadState('networkidle');
await page.locator(".card-body b").first().waitFor();

const titles = await page.locator(".card-body b").allTextContents();
console.log(titles);

const count = await products.count();

for(let i = 0; i < count; ++i){
   if (await products.nth(i).locator("b").textContent() === productname)
{
//logic to add the product to the cart
 await products.nth(i).locator("text= Add To Cart").click();
 break;
}
}

await page.locator("[routerlink*='cart']").click();
await page.locator("div li").first().waitFor();// this is autowaiting method
await expect(page).toHaveURL(/.*cart/);
const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); //search only h3 tag which has the text "ZARA COAT 3" and wait for it to be visible on the page.
expect(bool).toBeTruthy(); //verify that the product is added to the cart by checking if the element is visible on the page.

await page. locator("text=Checkout").click();

const CC = await page.locator(".form__cc input.text-validated").fill("4542 9931 9292 2222");
console.log(CC);

const month= await page.locator("select.ddl.input:first-of-type").selectOption("08");
console.log(month);

const year = await page.locator("select.ddl.input:last-of-type").selectOption("29");
console.log(year);
 
const CVVnum = await page.locator('div.field.small:has-text("CVV Code") input').fill("555");
console.log(CVVnum);

const nameoncard = await page.locator('div.field:has-text("Name on Card") input').fill("Indeewara");
console.log(nameoncard);

//auto suggetion dropdown handle
await page.getByPlaceholder('Select Country').pressSequentially("Can", { delay: 150 });
 const dropdown = await page.locator(".ta-results");
await dropdown.waitFor();

  const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " Canada") //we can user text.trim() 
        {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
   

expect(page.locator(".user__name label")).toHaveText(email);
expect(page.locator(".user__name input[type='text']")).toHaveValue(email);

expect(page.locator(".action__submit").click());
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
const order_ID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(order_ID);

await page.pause();
 });

 test('Go to ORders and Check Order ID', async ({page}) => {
 const order_id = '699fbb110ab5a029774ae082';
 const email = "Indeewara@gmial.com";

await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
await page.locator("#userEmail").fill(email);
await page.locator("#userPassword").fill("Indee@123");
await page.locator("#login").click();

await page.waitForLoadState('networkidle');
await page.locator("button[routerlink*='myorders']").click();
await page.locator("tbody").waitFor();

const rows = await page.locator("tbody tr");
const count = await rows.count();

for(let i = 0; i < count; ++i){
   const rowOrderID = await rows.nth(i).locator("th").textContent();
   if (rowOrderID.includes(order_id)) {
      await rows.nth(i).locator("button").first().click();
      expect(Number(rowOrderID)).toBe(Number(order_id));
      break;
   }
}


await page.pause();
 });