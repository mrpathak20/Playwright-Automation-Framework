import { defineConfig, devices } from '@playwright/test';
import { loadEnvironment } from './utils/environmentUtil.js';
import { printExecutionDashboard } from "./utils/dashboardUtil.js";

const ENV = process.env.TEST_ENV || 'uat';

loadEnvironment(ENV);

printExecutionDashboard();
export default defineConfig({

    testDir: './tests',

    timeout: 300000,

    fullyParallel: false,

  reporter: [
    ['list'],
    ['html', {
        outputFolder: 'playwright-report',
        open: 'never'
    }],
    ['json', {
        outputFile: 'test-result.json'
    }],
    ['allure-playwright']
],

// Ensure explicit file extensions so Node can resolve the modules reliably
globalSetup: require.resolve("./global-setup.js"),

globalTeardown: require.resolve("./global-teardown.js"),

    use: {

        baseURL: process.env.BASE_URL,

        browserName: 'chromium',

        headless: true,

        screenshot: 'on',

        video: 'on',

        trace: 'on',

        ignoreHTTPSErrors: true,

        permissions: ['geolocation'],

        ...devices['Galaxy S24']

    }

});