// @ts-nocheck
import { defineConfig, devices } from '@playwright/test';
import { loadEnvironment } from './utils/environmentUtil.js';
import { printExecutionDashboard } from './utils/dashboardUtil.js';

const ENV = process.env.TEST_ENV || 'uat';

// Load environment configuration
loadEnvironment(ENV);

// Print execution dashboard
printExecutionDashboard();

export default defineConfig({
    testDir: './tests',

    webServer: undefined,

    timeout: 300000,

    fullyParallel: false,

    reporter: [
        ['list'],
        [
            'html',
            {
                outputFolder: 'playwright-report',
                open: 'never'
            }
        ],
        [
            'json',
            {
                outputFile: 'test-result.json'
            }
        ],
        ['allure-playwright']
    ],

    globalSetup: require.resolve('./global-setup.js'),

    globalTeardown: require.resolve('./global-teardown.js'),

    use: {
        baseURL: process.env.BASE_URL,

        browserName: 'chromium',

        headless: true,

        screenshot: 'on',

        video: 'on',

        trace: 'on',

        slowMo: 800,

        ignoreHTTPSErrors: true,

        permissions: ['geolocation'],

        ...devices['Galaxy S20'] // Example of using a specific device configuration
    }
});