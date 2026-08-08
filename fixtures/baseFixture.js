import { test as base } from "@playwright/test";

import { Actions } from "./actionFixture";
import { Assertions } from "./assertionFixture";
    const dataManager = require("../utils/dataManager");
    const allure = require("../utils/allureUtil");
    const allureUtil = require("../reporting/allure/allureUtil");
export const test = base.extend({

    actions: async ({}, use) => {

        await use(new Actions());

    },

    assertion: async ({}, use) => {

        await use(new Assertions());

    },

    data: async ({}, use) => {

        await use(dataManager);

    },

    allure: async ({}, use) => {

        await use(allure);

    },

    allure: async ({}, use) => {

    await use(allureUtil);

    },

});

export { expect } from "@playwright/test";