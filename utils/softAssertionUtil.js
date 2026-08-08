const { expect } = require("@playwright/test");

class SoftAssertionUtil {

    constructor() {
        this.failures = [];
    }

    async assertVisible(locator, message = "") {
        try {
            await expect.soft(locator, message).toBeVisible();
        } catch (error) {
            this.failures.push(error.message);
        }
    }

    async assertHidden(locator, message = "") {
        try {
            await expect.soft(locator, message).toBeHidden();
        } catch (error) {
            this.failures.push(error.message);
        }
    }

    async assertEnabled(locator, message = "") {
        try {
            await expect.soft(locator, message).toBeEnabled();
        } catch (error) {
            this.failures.push(error.message);
        }
    }

    async assertDisabled(locator, message = "") {
        try {
            await expect.soft(locator, message).toBeDisabled();
        } catch (error) {
            this.failures.push(error.message);
        }
    }

    async assertText(locator, expected, message = "") {
        try {
            await expect.soft(locator, message).toHaveText(expected);
        } catch (error) {
            this.failures.push(error.message);
        }
    }

    async assertValue(locator, expected, message = "") {
        try {
            await expect.soft(locator, message).toHaveValue(expected);
        } catch (error) {
            this.failures.push(error.message);
        }
    }

    async assertURL(page, expected, message = "") {
        try {
            await expect.soft(page, message).toHaveURL(expected);
        } catch (error) {
            this.failures.push(error.message);
        }
    }

    async assertTitle(page, expected, message = "") {
        try {
            await expect.soft(page, message).toHaveTitle(expected);
        } catch (error) {
            this.failures.push(error.message);
        }
    }

    assertAll() {

        if (this.failures.length > 0) {

            throw new Error(
                "\nSoft Assertion Failures\n\n" +
                this.failures.join("\n\n")
            );

        }

    }

    clear() {
        this.failures = [];
    }

}

module.exports = SoftAssertionUtil;