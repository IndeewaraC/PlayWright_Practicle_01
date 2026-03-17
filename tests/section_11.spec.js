const {test,expect,request} = require('@playwright/test');
//api testing from playwright

const loginPayload = {userEmail: "indeewaragunathilaka@gmail.com", userPassword: "Indeewara@282"};//JS object for login payload
let token; //variable to store token from login response

test.beforeAll('before all api tests',async ({})=>{

const apicontext = await request.newContext(); //create new request context for api testing
const loginResponse = await apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: loginPayload });//send post request to login endpoint with login payload
expect(loginResponse.ok()).toBeTruthy(); //assert that login response is successful 200 status code

const loginresponsejson = await loginResponse.json();
token = loginresponsejson.token; //get token from login response
console.log(token);

});


test.describe('API testing',()=>{

 test('place the order', async ({page}) => {

    await page.addInitScript(value => {
     window.localStorage.setItem('token', value); //set token in to the local storage of the browser before the page loads

    }, token);//pass token as value to the init script
await page.goto("https://rahulshettyacademy.com/client/");//navigate to the client app

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