import { test, expect } from '@playwright/test';

test.describe('@regression - editor', () => {
  test('show editor dialog', async ({ page }) => {
    await page.goto('/', {
      waitUntil: 'domcontentloaded',
    });

    const header = page.locator('header');

    await expect(header).toBeVisible();

    await expect(header).toContainText(new RegExp(/Lightbar/));
  });
});
