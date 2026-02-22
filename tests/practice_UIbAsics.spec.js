const  {test,expect} = require('@playwright/test'); 
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

test.only('Select All card Elements- Vision Electronics', async ({page}) => {
await page.goto('https://www.visions.ca/');

const cards = page.locator(".product-item a"); //this is select all the card elements on the page using the CSS selector.
const count = await cards.count(); //this is get the count of the card elements.

console.log(await page.title()); 
await expect(page).toHaveTitle(/Visions Electronics/);

console.log(await cards.first().textContent()); //this is get the text content of the first card element and print it in the console.
console.log(await cards.nth(1).textContent());

const allCardsText = await cards.allTextContents();
console.log(allCardsText);  //this is get the text content of all the card elements and print it in the console.

});

