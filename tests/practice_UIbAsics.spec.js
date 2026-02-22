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

test.only('Login Function in OHRM', async ({page}) => {
// test('First Test case',async ({ page}) =>  This is another way to write the test case, 
// where we can directly use the page fixture provided by Playwright.

await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

console.log(await page.title()); 
await expect(page).toHaveTitle('OrangeHRM');

await page.locator('[name="username"]').fill("john");
await page.locator('[name="password"]').fill("demo");
await page.locator('[type="submit"]').click();

console.log(await page.locator("[class*='oxd-alert-content oxd-alert-content--error']").textContent());

});