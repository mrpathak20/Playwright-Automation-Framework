
import { test as base, expect } from '@playwright/test';

const API_BASE_URL =
    process.env.API_BASE_URL || 'https://automationexercise.com';

export const test = base.extend({
    apiBaseURL: async ({}, use) => {
        await use(API_BASE_URL);
    },

    api: async ({ request, apiBaseURL }, use) => {
        await use({
            get: (path, options = {}) =>
                request.get(`${apiBaseURL}${path}`, options),

            post: (path, options = {}) =>
                request.post(`${apiBaseURL}${path}`, options),

            put: (path, options = {}) =>
                request.put(`${apiBaseURL}${path}`, options),

            delete: (path, options = {}) =>
                request.delete(`${apiBaseURL}${path}`, options),
        });
    },
});

export { expect };
