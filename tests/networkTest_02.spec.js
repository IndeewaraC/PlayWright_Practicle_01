const { test, expect, request } = require('@playwright/test');
const { APIutils } = require('../utils/APIutils');

const loginPayload = { userEmail: "indeewaragunathilaka@gmail.com", userPassword: "Indeewara@282" };
let response;
test.beforeAll(async () => {
  const apicontxt = await request.newContext();
  const apiutil = new APIutils(apicontxt, loginPayload);
  response = await apiutil.getToken_01();
});
test('Security test request interception', async ({ page }) => {
  //login and reach orders page
  await page.addInitScript(value => {
    window.localStorage.setItem('token', value);

  }, response);
  await page.goto("https://rahulshettyacademy.com/client/");
  await page.locator("button[routerlink*='myorders']").click();
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route =>
      route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6" })
  )
  await page.locator("button:has-text('view')").first().click();
  await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
});