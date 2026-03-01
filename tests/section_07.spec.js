const  {test,expect} = require('@playwright/test'); 
const { escape } = require('node:querystring');
// this is import the test and expect functions from the Playwright testing library.


//@test in test file exeutes in sequentially, 
// so we can write multiple test cases in the same file and they will be executed 
// one after the other.

test.only('First Test case',async ({browser}) => {
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