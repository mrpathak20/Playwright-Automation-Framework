import { test as base, expect } from "@playwright/test";

import { Actions } from "./actionFixture.js";
import { Assertion } from "./assertionFixture.js";

const dataManager = require("../utils/dataManager");
const allure = require("../utils/allureUtil");
const allureUtil = require("../reporting/allure/allureUtil");

export const test = base.extend({

    actions: async ({}, use) => {
        await use(new Actions());
    },

    assertion: async ({}, use) => {
        await use(Assertion);
    },

    data: async ({}, use) => {
        await use(dataManager);
    },

    allure: async ({}, use) => {
        await use(allure);
    },

    allureUtil: async ({}, use) => {
        await use(allureUtil);
    },

});

export { expect };