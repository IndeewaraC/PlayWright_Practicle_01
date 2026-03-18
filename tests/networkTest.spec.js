const { test, expect, request } = require('@playwright/test');
const { APIutils } = require('../utils/APIutils');

//api testing from playwright
let response;
const loginPayload = { userEmail: "indeewaragunathilaka@gmail.com", userPassword: "Indeewara@282" };//JS object for login payload
const ordersPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };
const fakepaylaod = { data: [], message: "No Orders" };

test.beforeAll(async () => {
  const apicontxt = await request.newContext();
  const apiutil = new APIutils(apicontxt, loginPayload);//create new request context for api testing
  response = await apiutil.createOrder(ordersPayload);//create order by API call to get order id for validation in UI test and store in response.
});

test.describe('Network Interception', () => {

  test('response intercepting', async ({ page }) => {
    await page.addInitScript(value => {
      window.localStorage.setItem('token', value); //set token in to the local storage of the browser before the page loads

    }, response.token);//pass token as value to the init script

    await page.goto("https://rahulshettyacademy.com/client/");//navigate to the client app
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", //* is general wildcard to match any order id in the url, we want to intercept all calls to this endpoint regardless of the order id, and continue with the original response
      async route => {
        //intercepting the reesponse -  API response - >{playwright Mock response} -> continue with the original response
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakepaylaod);//mock response body to return empty orders list converting JS object to Json
        route.fulfill({
          response,
          body,
        })
      });//intercept the network call to get orders for customer and continue with the original request
    await page.locator("button[routerlink*='myorders']").click();//click on my orders button to trigger the network call
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");//wait for the network call to complete
    console.log(await page.locator(".mt-4").textContent());//print the text content of the element that shows the orders list to verify that it shows no orders as per the mock response
  });

});