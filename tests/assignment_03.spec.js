import { test, expect } from '@playwright/test';
import * as utils from '../utils/helper_03';

test('sandbox banner is shown when 6 events are returned', async ({ page }) => {

    await page.route('**/api/events**', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(utils.SIX_EVENTS_RESPONSE),
        });
    });

    await utils.loginAndGoToEvents(page);
    const cards = page.locator('[data-testid="event-card"]');
    await expect(cards.first()).toBeVisible();
    await expect(cards).toHaveCount(6);

    const banner = page.getByText(/sandbox holds up to/i);
    await expect(banner).toBeVisible();
    await expect(banner).toContainText('9 bookings');
});

test('sandbox banner is shown when 4 events are returned', async ({ page }) => {

    await page.route('**/api/events**', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(utils.FOUR_EVENTS_RESPONSE),
        });
    });

    await utils.loginAndGoToEvents(page);
    const cards = page.locator('[data-testid="event-card"]');
    await expect(cards.first()).toBeVisible();
    await expect(cards).toHaveCount(4);

    const banner = page.getByText(/sandbox holds up to/i);
    await expect(banner).not.toBeVisible();
});

