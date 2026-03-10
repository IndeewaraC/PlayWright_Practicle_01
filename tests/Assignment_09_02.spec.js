import {test, expect} from '@playwright/test';
import * as helper from '../utils/helper.js';
import { time } from 'node:console';
import { equal } from 'node:assert';

test.describe('Assignment_09_02_Section_01', () => {
//variable decleration
let eventtitle = null;
let bookingreffull = null;
let fulltext = null;
let seatsBeforeBooking = null;
let seatsAfterBooking = null;
let bookingcards = null;
let bookingreforiginal = '';

test.describe.configure({ mode: 'serial' });  //runs like a serial test, one after another
test.beforeEach('reusable login function', async ({ page }) => {
  //Use reusable login function from helper.js
  await helper.reusablelogin(page);
});


//login function and assertion to verify login is successful will be executed before each test case
test('Assignment_02_Test_01_Step_01', async ({page}) => {
await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
});
//step-02 navigate tot he book first event from events page.
test('Assignment_02_Test_01_Step_02_to_04', async ({page}) => {

await test.step('Step_02 to _04', async () => {

    await page.getByTestId('nav-events').click();
    await expect(page.getByTestId("event-card").first()).toBeVisible();
    const mycard = page.getByTestId("event-card").first();
    expect(mycard).toBeVisible({timeout: 5000});
    eventtitle = await mycard.getByRole('heading').textContent();

//select first card and click book now
    await mycard.getByTestId('book-now-btn').click();
    await expect(page.locator('#ticket-count')).toHaveText('1');
    await page.getByLabel(/Full Name/i).fill('James Bond');
    await page.getByTestId('customer-email').fill('bonds@gmail.com');
    await page.getByPlaceholder('+91 98765 43210').fill('+91 2265 22210');
    await page.locator('.confirm-booking-btn').click();
    bookingreffull = page.locator('.booking-ref').first();
});

await test.step('Step_03', async () => {

//navigate and verify booking in My Bookings page
await page.getByTestId('nav-bookings').click();
await expect(page).toHaveURL(helper.baseURL+ 'bookings');
});

await test.step('Step_04', async () => {
    //get the first card and verify the booking reference and event title
    const firstcard = await page.getByTestId('booking-card').first();
    await expect(firstcard).toBeVisible({timeout: 5000});
    //assertions
    await firstcard.getByRole('button', { name: 'View Details' }).click({timeout: 5000});
});

await test.step('Step_05', async () => {

    //verify the booking details in the card after cllicking view details button
    await expect(page.getByText(bookingreforiginal).nth(1)).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('heading', { name: eventtitle, level: 1 })).toBeVisible();
    //By adding , level: 1, Playwright completely ignores all those <h3> elements and locks straight onto the main event title at the top of the details page.
});

await test.step('Step_06', async () => {
    // Check refund eligibility and click on refund button if eligible
    await expect(page.getByTestId('check-refund-btn')).toBeVisible();
    //assert spinner is visible after clicking check refund button
     await page.getByTestId('check-refund-btn').click();
     await expect(page.getByRole('status', { name: 'Loading' })).toBeVisible({ timeout: 6000 });
     await expect(page.getByText('Eligible for refund. Single-')).toBeVisible();


});

});
});

test.describe('Assignment_09_02_Section_02', () => {
let eventtitle = null;
let bookingreffull = null;
let fulltext = null;
let seatsBeforeBooking = null;
let seatsAfterBooking = null;
let bookingcards = null;
let bookingreforiginal = '';
test.describe.configure({ mode: 'serial' });  //runs like a serial test, one after another
test.beforeEach('reusable login function', async ({ page }) => {
  //Use reusable login function from helper.js
  await helper.reusablelogin(page);
});
//login function and assertion to verify login is successful will be executed before each test case
test('Assignment_02_Test_01_Step_01', async ({page}) => {
await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
});

//step-02 navigate to the book first event from events page.
test('Assignment_02_Test_02_Step_02_to_04', async ({page}) => {

await test.step('Step_02 to _04', async () => {

    await page.getByTestId('nav-events').click();
    await expect(page.getByTestId("event-card").first()).toBeVisible();
    const mycard = page.getByTestId("event-card").first();
    expect(mycard).toBeVisible({timeout: 5000});
    eventtitle = await mycard.getByRole('heading').textContent(); 
    
    //select first card and click book now
    await mycard.getByTestId('book-now-btn').click();
    await expect(page.locator('#ticket-count')).toHaveText('1');
    
    //set iteration count to 3 and click + button until the ticket count is 3
    const targetcount = 3;
    for(let i=0; i<(targetcount - 1); i++){
        await page.getByRole('button', { name: '+' }).click();
    }
    //check the ticket count is updated to 3
    await expect(page.locator('#ticket-count')).toHaveText(targetcount.toString());

    //validate the amount is correct for 3 tickets
     await expect(page.getByText('$300 × 3 ticket')).toBeVisible();
     await expect(page.getByText('$').nth(3)).toHaveText('$900');

    //fill the booking form and click confirm booking button
    await page.getByLabel(/Full Name/i).fill('James Bond');
    await page.getByTestId('customer-email').fill('bonds@gmail.com');
    await page.getByPlaceholder('+91 98765 43210').fill('+91 2265 22210');
    await page.locator('.confirm-booking-btn').click();
    bookingreffull = page.locator('.booking-ref').first();

    //navigate and verify booking in My Bookings page
    await page.getByTestId('nav-bookings').click();
    await expect(page).toHaveURL(helper.baseURL+ 'bookings');
});

await test.step('Step_04', async () => {
    //get the first card and verify the booking reference and event title
    const firstcard = await page.getByTestId('booking-card').first();
    await expect(firstcard).toBeVisible({timeout: 10000});
    //assertions
    await firstcard.getByRole('button', { name: 'View Details' }).click({timeout: 5000});
});

await test.step('Step_05', async () => {

    //verify the booking details in the card after cllicking view details button
    await expect(page.getByText(bookingreforiginal).nth(1)).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('heading', { name: eventtitle, level: 1 })).toBeVisible();
    //By adding , level: 1, Playwright completely ignores all those <h3> elements and locks straight onto the main event title at the top of the details page.
});

await test.step('Step_06', async () => {
    // Check refund eligibility and click on refund button if eligible
    await expect(page.getByTestId('check-refund-btn')).toBeVisible();
    //assert spinner is visible after clicking check refund button
     await page.getByTestId('check-refund-btn').click();
     await expect(page.getByRole('status', { name: 'Loading' })).toBeVisible({ timeout: 6000 });
     await expect(page.getByText('Not eligible for refund. Group bookings (3 tickets) are non-refundable.')).toBeVisible();
});

});
});