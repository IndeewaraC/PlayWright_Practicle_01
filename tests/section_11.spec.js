const {test,expect,request} = require('@playwright/test');
//api testing from playwright

const loginPayload = {userEmail: "indeewaragunathilaka@gmail.com", userPassword: "Indeewara@282"};//JS object for login payload
let token; //variable to store token from login response

const ordersPayload = {orders: [{country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
let orderId; //variable to store order id from create order response


test.beforeAll('before all api tests',async ({})=>{
//login API call to get token for authentication in subsequent API calls
const apicontext = await request.newContext(); //create new request context for api testing
const loginResponse = await apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: loginPayload });//send post request to login endpoint with login payload
expect(loginResponse.ok()).toBeTruthy(); //assert that login response is successful 200 status code

const loginresponsejson = await loginResponse.json();
token = loginresponsejson.token; //get token from login response
console.log(token);

//create Order by API call to get order id for validation in UI test
const orderapiContext = await request.newContext(); //create new request context for api testing
    const ordersResponse = await orderapiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: ordersPayload,
        headers: {
            'Authorization': token, //set authorization header with token for authentication
            'content-Type': 'application/json' //set content type header for json payload
        }
    });
    expect(ordersResponse.ok()).toBeTruthy();//assert that create order response is successful 200 status code
    const ordersResponseJson = await ordersResponse.json();
    console.log(ordersResponseJson);
    orderId = ordersResponseJson.orders[0];
});


test.describe('API testing',()=>{

 test('place the order', async ({page}) => {

    await page.addInitScript(value => {
     window.localStorage.setItem('token', value); //set token in to the local storage of the browser before the page loads

    }, token);//pass token as value to the init script
    await page.goto("https://rahulshettyacademy.com/client/");//navigate to the client app
   });

 test('validate order in UI', async ({page}) => {

    await page.addInitScript(value => {
     window.localStorage.setItem('token', value); //set token in to the local storage of the browser before the page loads

    }, token);//pass token as value to the init script
    await page.goto("https://rahulshettyacademy.com/client/");//navigate to the client app
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const orderRows = await page.locator("tbody tr");

        for(let i =0; i<await orderRows.count(); ++i)
        {
            const rowOrderId =await orderRows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId))
                {
                await orderRows.nth(i).locator("button").first().click();
                break;
                }
        }

const orderIdDetails =await page.locator(".col-text").textContent();
expect(orderId.includes(orderIdDetails)).toBeTruthy();

   });

});