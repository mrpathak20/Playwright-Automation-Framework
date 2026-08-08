import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

const fs = require('fs');

async function takeScreenshot(page, suite, name) {
    const folder = `./screenshots/${suite}`;

    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }

    const screenshotPath = `${folder}/${name}.png`;

    await page.screenshot({
        path: screenshotPath,
        fullPage: true
    });

    await allure.attachmentPath(
        name,
        screenshotPath,
        {
            contentType: 'image/png'
        }
    );
}

test.describe('Playwright Website Validation', () => {

    test.beforeEach(async () => {

        await allure.epic('Playwright Automation Framework');
        await allure.feature('Environment Management');
        await allure.story('Verify Base URL Navigation');
        await allure.owner('Priyanshu Pathak');
        await allure.severity('critical');
        await allure.tags('Smoke', 'Regression', 'Environment');

        await allure.description(
            `Executing against ${process.env.TEST_ENV?.toUpperCase()} environment`
        );

    });

    test('Verify Homepage Title', async ({ page }) => {

        await allure.step(
            `Navigate to ${process.env.BASE_URL}`,
            async () => {

                await page.goto(process.env.BASE_URL);

            }
        );

        await takeScreenshot(page, 'Playwright_Home', '01_HomePage');

        await allure.step('Verify Page Title', async () => {

            await expect(page).toHaveTitle(/Playwright/);

        });

        await takeScreenshot(page, 'Playwright_Home', '02_TitleVerified');

    });

    test('Verify Get Started Navigation', async ({ page }) => {

        await allure.step(
            `Navigate to ${process.env.BASE_URL}`,
            async () => {

                await page.goto(process.env.BASE_URL);

            }
        );

        await takeScreenshot(page, 'GetStarted', '01_HomePage');

        await allure.step('Click Get Started', async () => {

            await page.getByRole('link', {
                name: 'Get started'
            }).click();

        });

        await takeScreenshot(page, 'GetStarted', '02_ClickedGetStarted');

        await allure.step('Verify Installation Page', async () => {

            await expect(
                page.getByRole('heading', {
                    name: 'Installation'
                })
            ).toBeVisible();

        });

        await takeScreenshot(page, 'GetStarted', '03_InstallationPage');

    });

});