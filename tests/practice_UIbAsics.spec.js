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

test('Select All card Elements- Vision Electronics', async ({page}) => {
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

test('Network Idle Method- Vision Electronics', async ({page}) => {
const cards = page.locator(".product-item a"); //this is select all the card elements on the page using the CSS selector.
const count = await cards.count(); //this is get the count of the card elements.


await page.goto('https://www.visions.ca/');



console.log(await page.title()); 
await expect(page).toHaveTitle(/Visions Electronics/);
 //this is wait for the network to be idle, which means that there are no more network requests being made.
await page.waitForLoadState('networkidle');

console.log(await cards.first().textContent()); //this is get the text content of the first card element and print it in the console.
console.log(await cards.nth(1).textContent());

const allCardsText = await cards.allTextContents();
console.log(allCardsText);  //this is get the text content of all the card elements and print it in the console.

});

test('UI Controls', async ({page}) => {
await page.goto('https://www.visions.ca/');

const menuWrapper = page.locator('.signin-dropdown-wrapper').first();
//this is select the menu wrapper element on the page using the CSS selector 
// and get the first element if there are multiple elements with the same class name.

await menuWrapper.hover({force: true});
 //this is hover over the menu wrapper element to display the dropdown menu. The force option is used to force the hover action even if the element is not visible or interactable.

const signInBtn = page.locator('.signin-links a', { hasText: 'Sign In' }).first();
//this is select the sign in button element from the dropdown menu using the CSS selector and the hasText option to filter the elements based on their text content.
await signInBtn.click({force: true}); //this is click on the sign in button to navigate to the sign in page.

await expect(page).toHaveURL(/.*account\/login/); //verify that the URL of the page contains the expected path after clicking the sign in button.

await page.pause(); 
//this is pause the test execution, which allows us to inspect the page and debug the test if needed.

});

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
await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

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
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
 
 });

