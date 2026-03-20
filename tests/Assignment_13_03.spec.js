import { test, expect, request } from '@playwright/test';
import * as utils from '../utils/Assignemnt13helper';

const loginpayload = { email: "indeewaragunathilaka@gmail.com", password: "Playwright_282" };
let shresponse;
let authresponse;

test.beforeAll(async () => {
    const apicontxt = await request.newContext();
    const assignment13helpers = new utils.Assignment13helper(apicontxt, loginpayload);
    shresponse = await assignment13helpers.getToken();
    authresponse = await assignment13helpers.getAuth(shresponse);
});

test.beforeEach(async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.clear();
        window.localStorage.setItem('success', String(value.shresponse.success));
        window.localStorage.setItem('token', value.shresponse.token);
        window.localStorage.setItem('user.userId', String(value.authresponse.user.userId));
        window.localStorage.setItem('user.email', value.authresponse.user.email);
        window.localStorage.setItem('user.iat', String(value.authresponse.user.iat));
        window.localStorage.setItem('user.exp', String(value.authresponse.user.exp));

        const userObject = {
            userId: value.authresponse.user.userId,
            email: value.authresponse.user.email,
            iat: value.authresponse.user.iat,
            exp: value.authresponse.user.exp
        };
        window.localStorage.setItem('user', JSON.stringify(userObject));
    }, { shresponse, authresponse });
});

test.describe("Assignment 13.03 - Mocking API responses", () => {
    test("Mocking API response with 6 events", async ({ page }) => { 
        await page.route('**/api/auth/me', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(authresponse)
            });
        });

        await page.route(utils.baseapiurl_06, async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(utils.SIX_EVENTS_RESPONSE),
            });
        });

        await page.goto(utils.eventurl);
        const cards = page.locator('.event-card');
        await expect(cards.nth(0)).toContainText('Tech Summit 2025');
        await expect(cards.nth(1)).toContainText('Rock Night Live');
        await expect(cards.nth(2)).toContainText('IPL Finals');
        await expect(cards.nth(3)).toContainText('UX Design Workshop');
        await expect(cards.nth(4)).toContainText('Lollapalooza India');
        await expect(cards.nth(5)).toContainText('AI & ML Expo');
    });
});