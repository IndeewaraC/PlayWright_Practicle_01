const {test,expect,request} = require('@playwright/test');
const {APIutils} = require('../utils/APIutils');

//api testing from playwright
let response ;
const loginPayload = {userEmail: "indeewaragunathilaka@gmail.com", userPassword: "Indeewara@282"};//JS object for login payload
const ordersPayload = {orders: [{country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};

test.beforeAll(async () =>
{
    const apicontxt = await request.newContext(); 
    const apiutil= new APIutils(apicontxt,loginPayload);//create new request context for api testing
    response = await apiutil.createOrder(ordersPayload);//create order by API call to get order id for validation in UI test and store in response.
});

test.describe('API testing',()=>{

 test('By Pass login page with API', async ({page}) => {
    await page.addInitScript(value => {
     window.localStorage.setItem('token', value); //set token in to the local storage of the browser before the page loads

    }, response.token);//pass token as value to the init script
    await page.goto("https://rahulshettyacademy.com/client/");//navigate to the client app
   });

 test('validate order in UI', async ({page}) => {
    await page.addInitScript(value => {
     window.localStorage.setItem('token', value); //set token in to the local storage of the browser before the page loads

    }, response.token);//pass token as value to the init script

    await page.goto("https://rahulshettyacademy.com/client/");//navigate to the client app
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const orderRows = await page.locator("tbody tr");

        for(let i =0; i<await orderRows.count(); ++i)
        {
            const rowOrderId =await orderRows.nth(i).locator("th").textContent();
            if (response.orderId.includes(rowOrderId))
                {
                await orderRows.nth(i).locator("button").first().click();
                break;
                }
        }

const orderIdDetails =await page.locator(".col-text").textContent();
expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

   });

});