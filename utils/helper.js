import {test, expect} from '@playwright/test';

//declare some global variables to use across test cases
export const baseURL = 'https://eventhub.rahulshettyacademy.com/';
export const UN = 'indeewaragunathilaka@gmail.com';
export const PW = 'Playwright_282';
export let eventtitle = null;
export let bookingreffull = null;
export let fulltext = null;
export let seatsBeforeBooking = null;
export let seatsAfterBooking = null;
export let bookingcards = null;
export let bookingreforiginal = '';
export let testevent = `${Date.now()}`;

export async function reusablelogin(page) {
  await page.goto(baseURL + 'login');
  await page.getByPlaceholder('you@email.com').fill(UN);
  await page.getByPlaceholder('••••••').fill(PW);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}