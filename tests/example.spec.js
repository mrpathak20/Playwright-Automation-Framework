import { test, expect } from '@playwright/test';
// Inline fallback for takeScreenshot to avoid missing module error
// (was: ../utilities/CommonUtilities)
async function takeScreenshot(page, suite, name) {
  const fs = require('fs');
  const path = `./screenshots/${suite}`;
  if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
  await page.screenshot({ path: `${path}/${name}.png`, fullPage: true });
}

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await takeScreenshot(page, 'Playwright_Home', '01_HomePage');

  await expect(page).toHaveTitle(/Playwright/);

  await takeScreenshot(page, 'Playwright_Home', '02_TitleVerified');
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await takeScreenshot(page, 'GetStarted', '01_HomePage');

  await page.getByRole('link', { name: 'Get started' }).click();

  await takeScreenshot(page, 'GetStarted', '02_ClickedGetStarted');

  await expect(
    page.getByRole('heading', { name: 'Installation' })
  ).toBeVisible();

  await takeScreenshot(page, 'GetStarted', '03_InstallationPage');
});