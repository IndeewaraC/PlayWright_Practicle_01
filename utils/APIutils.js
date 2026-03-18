class APIutils
{

    constructor(apicontxt,loginPayload)//constructor to initialize api context and login payload for API calls
    {
        this.apiContext = apicontxt;
        this.loginPayload = loginPayload;
    }

    async getToken()
    {
    const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: this.loginPayload, headers: {'Content-Type': 'application/json','User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36','Origin': 'https://rahulshettyacademy.com','Referer': 'https://rahulshettyacademy.com/client/'} });//send post request to login endpoint with login payload
    
    const loginresponsejson = await loginResponse.json();
    const token = loginresponsejson.token; //get token from login response
    console.log(token);
    return token;
    }

    async getToken_01()
    {
     const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: this.loginPayload, headers: {'Content-Type': 'application/json','User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36','Origin': 'https://rahulshettyacademy.com','Referer': 'https://rahulshettyacademy.com/client/'} });//send post request to login endpoint with login payload
    
    const loginresponsejson = await loginResponse.json();
    const token1 = loginresponsejson.token; //get token from login response
    console.log(token1);
    return token1;
    }

    async createOrder(ordersPayload)
    {
        let response = {}; //js object to store response from create order api call
       response.token = await this.getToken(); //get token by calling getToken method to set authorization header for create order api call
        //create Order by API call to get order id for validation in UI test
            const ordersResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
                data: ordersPayload,
                headers: {
                    'Authorization': response.token, //set authorization header with token for authentication
                    'content-Type': 'application/json' //set content type header for json payload
                }
            });
            const ordersResponseJson = await ordersResponse.json();
            console.log(ordersResponseJson);
            const orderId = ordersResponseJson.orders[0];
            response.orderId = orderId;//get order id from create order response

            return response;
    }

}

module.exports = {APIutils};//this is the way to export a class in nodejs so that it can be imported in other files using require()