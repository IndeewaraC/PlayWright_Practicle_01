
export const FOUR_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live', category: 'Concert', eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals', category: 'Sports', eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
};

export const SIX_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live', category: 'Concert', eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals', category: 'Sports', eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
    { id: 5, title: 'Lollapalooza India', category: 'Festival', eventDate: '2025-06-20T12:00:00.000Z', venue: 'Mahalaxmi Racecourse', city: 'Mumbai', price: '3000', totalSeats: 5000, availableSeats: 2000, imageUrl: null, isStatic: false },
    { id: 6, title: 'AI & ML Expo', category: 'Conference', eventDate: '2025-06-25T10:00:00.000Z', venue: 'Bangalore International Exhibition Centre', city: 'Bangalore', price: '750', totalSeats: 300, availableSeats: 180, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },
};

export const baseurl = "https://eventhub.rahulshettyacademy.com/";
export const baseapiurl_06 = 'https://api.eventhub.rahulshettyacademy.com/api/events?page=1&limit=12';
export const eventurl = "https://eventhub.rahulshettyacademy.com/events";

class Assignment13helper {

  //initialize login payload and api context for API calls in tests
  constructor(apicontxt, loginpayload) {
    this.Loginpayload = loginpayload;
    this.Apicontxt = apicontxt;
  }

  async getToken() {
    let response = {};
    
    const responseToken = await this.Apicontxt.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login", { data: this.Loginpayload });
    
    
    const JsonresponseToken = await responseToken.json();
    response = {
      success: JsonresponseToken.success,
      token: JsonresponseToken.token,
      user: {
        id: JsonresponseToken.user.id,
        email: JsonresponseToken.user.email,
      }
    };
   
   
    console.log(response);
    return response;
  }

  async getAuth(response)
  {
    let authresponse = {};
    const authStatus = await this.Apicontxt.get("https://api.eventhub.rahulshettyacademy.com/api/auth/me", 
      { headers: { 'Authorization': `Bearer ${response.token}`,'Accept': 'application/json, text/plain, */*' } });
    const authStatusJson = await authStatus.json();
     authresponse = {
      success: authStatusJson.success,
      user: {
        userId: authStatusJson.user.userId,
        email: authStatusJson.user.email,
        iat: authStatusJson.user.iat,
        exp: authStatusJson.user.exp,
      }
    };
 console.log("Auth status response:", authStatusJson);
    return authresponse;

  }
}

module.exports = { Assignment13helper, FOUR_EVENTS_RESPONSE, SIX_EVENTS_RESPONSE, baseurl, baseapiurl_06, eventurl };