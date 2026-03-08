import {test, expect} from '@playwright/test';


test.describe('Assignment_09_01', () => {

test.describe.configure({ mode: 'serial' });//runs like a serial test, one after another
let bookingreforiginal = '';
let testevent = `${Date.now()}`;
let eventtitle = null;
let bookingreffull = null;
let fulltext = null;
let seatsBeforeBooking = null;
let seatsAfterBooking = null;
let baseURL = 'https://eventhub.rahulshettyacademy.com/';

test.beforeEach('reusable login function', async ({ page }) => {
  await page.goto(baseURL + 'login');
  await page.getByPlaceholder('you@email.com').fill('indeewaragunathilaka@gmail.com');
  await page.getByPlaceholder('••••••').fill('Playwright_282');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
});

test('Assignment_01_Step_01', async ({page}) => {

//step - 01 before each function will be executed before this test case
await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
  });

test('Assignment_01_Step_02', async ({page}) => {
    //step - 01 before each function will be executed before this test case
    //generatge new event number
    
function futureDateValue() {
  const date = new Date();

  date.setDate(date.getDate() + 7);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`; }

    await page.getByRole('link', { name: 'Manage Events' }).click();
    await page.getByTestId('event-title-input').click();
    eventtitle = 'Test Event ' + testevent;
    await page.getByTestId('event-title-input').fill(eventtitle);
    await page.getByRole('textbox', { name: 'Describe the event…' }).fill('This is Assignment 09_01');
    await page.getByLabel('City*').fill('winnipeg');
    await page.getByLabel('Venue').fill('University of Manitoba');
    await page.getByLabel('Event Date & Time*').fill(futureDateValue());
    await page.getByLabel('Price ($)*').fill('100');
    await page.getByLabel('Total Seats*', { name: 'Total Seats*' }).fill('50');
    await page.getByTestId('add-event-btn').click();

    await expect(page.getByText('Event created!')).toBeVisible();
  });

  test('Assignment_01_Step_03', async ({page}) => {
    //step - 01 before each function will be executed before this test case
    //Access Created New Event
    await page.getByTestId('nav-events').click();
    await expect(page.getByTestId("event-card").first()).toBeVisible();
    const mycard = page.getByTestId("event-card").filter({hasText: eventtitle});
    expect(mycard).toBeVisible({timeout: 5000});

    fulltext = await mycard.getByText(/seats available/i).textContent();
    seatsBeforeBooking = parseInt(fulltext.match(/\d+/)[0], 10);

//Step 04 Start Booking Seats
 await mycard.getByTestId('book-now-btn').click();
 await expect(page.locator('#ticket-count')).toHaveText('1');
 //fill the form
 await page.getByLabel(/Full Name/i).fill('Indeewara Gunathilaka');
 await page.getByTestId('customer-email').fill('Haridelva@gmail.com');
 await page.getByPlaceholder('+91 98765 43210').fill('+91 2265 22210');
 await page.locator('.confirm-booking-btn').click();
 //assertions 
bookingreffull = page.locator('.booking-ref').first();
await expect(bookingreffull).toBeVisible();
bookingreforiginal = await bookingreffull.textContent();

});

test('Assignment_01_Step_07', async ({page}) => {
    //verify my booking in My Bookings
await page.getByTestId('nav-bookings').click();
await expect(page).toHaveURL(baseURL + 'bookings');
const bookingcards= await page.getByTestId('booking-card');
expect(bookingcards.first()).toBeVisible();
await expect(bookingcards.filter({hasText: bookingreforiginal})).toBeVisible();
await expect(bookingcards.filter({hasText: eventtitle})).toBeVisible();

});

test('Assignment_01_Step_08', async ({page}) => {
//verify Seat Reduction after Booking
await page.getByTestId('nav-events').click();
await expect(page.getByTestId("event-card").first()).toBeVisible();
const mycard = await page.getByTestId("event-card").filter({hasText: eventtitle});
expect(mycard).toBeVisible({timeout: 5000});

fulltext = await mycard.getByText(/seats available/i).textContent();
seatsAfterBooking = parseInt(fulltext.match(/\d+/)[0], 10);
await expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
});
});