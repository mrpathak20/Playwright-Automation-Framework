import { expect } from "@playwright/test";

export class Assertion {

    /* ==========================
       Element Assertions
    ========================== */

    static async assertVisible(locator, message = "Element should be visible") {
        console.log(` ${message}`);
        await expect(locator).toBeVisible();
    }

    static async assertHidden(locator, message = "Element should be hidden") {
        console.log(`${message}`);
        await expect(locator).toBeHidden();
    }

    static async assertEnabled(locator, message = "Element should be enabled") {
        console.log(`${message}`);
        await expect(locator).toBeEnabled();
    }

    static async assertDisabled(locator, message = "Element should be disabled") {
        console.log(`${message}`);
        await expect(locator).toBeDisabled();
    }

    static async assertEditable(locator, message = "Element should be editable") {
        console.log(`${message}`);
        await expect(locator).toBeEditable();
    }

    static async assertChecked(locator, message = "Checkbox should be checked") {
        console.log(`${message}`);
        await expect(locator).toBeChecked();
    }

    static async assertFocused(locator, message = "Element should be focused") {
        console.log(`${message}`);
        await expect(locator).toBeFocused();
    }

    /* ==========================
       Text Assertions
    ========================== */

    static async assertText(locator, expectedText) {
        console.log(`Validating text : ${expectedText}`);
        await expect(locator).toHaveText(expectedText);
    }

    static async assertContainsText(locator, expectedText) {
        console.log(`Validating partial text : ${expectedText}`);
        await expect(locator).toContainText(expectedText);
    }

    static async assertValue(locator, expectedValue) {
        console.log(`Validating input value`);
        await expect(locator).toHaveValue(expectedValue);
    }

    static async assertPlaceholder(locator, placeholder) {
        console.log(`Validating placeholder`);
        await expect(locator).toHaveAttribute("placeholder", placeholder);
    }

    /* ==========================
       Page Assertions
    ========================== */

    static async assertTitle(page, title) {
        console.log(`Validating page title`);
        await expect(page).toHaveTitle(title);
    }

    static async assertTitleContains(page, title) {
        console.log(`Validating page title`);
        await expect(page).toHaveTitle(new RegExp(title));
    }

    static async assertURL(page, url) {
        console.log(`Validating URL`);
        await expect(page).toHaveURL(url);
    }

    static async assertURLContains(page, text) {
        console.log(`Validating URL contains ${text}`);
        await expect(page).toHaveURL(new RegExp(text));
    }

    /* ==========================
       Count Assertions
    ========================== */

    static async assertCount(locator, expectedCount) {
        console.log(`Validating locator count`);
        await expect(locator).toHaveCount(expectedCount);
    }

    /* ==========================
       Attribute Assertions
    ========================== */

    static async assertAttribute(locator, attribute, value) {
        console.log(`Validating attribute ${attribute}`);
        await expect(locator).toHaveAttribute(attribute, value);
    }

    static async assertClass(locator, className) {
        console.log(`Validating class`);
        await expect(locator).toHaveClass(className);
    }

    /* ==========================
       Generic Assertions
    ========================== */

    static assertTrue(value, message = "Expected value to be true") {
        expect(value, message).toBeTruthy();
    }

    static assertFalse(value, message = "Expected value to be false") {
        expect(value, message).toBeFalsy();
    }

    static assertEqual(actual, expected) {
        expect(actual).toBe(expected);
    }

    static assertNotEqual(actual, expected) {
        expect(actual).not.toBe(expected);
    }

    static assertContains(actual, expected) {
        expect(actual).toContain(expected);
    }

    static assertNotContains(actual, expected) {
        expect(actual).not.toContain(expected);
    }

    static assertGreaterThan(actual, expected) {
        expect(actual).toBeGreaterThan(expected);
    }

    static assertLessThan(actual, expected) {
        expect(actual).toBeLessThan(expected);
    }

    /* ==========================
       API Assertions
    ========================== */

    static assertStatus(response, expectedStatus) {
        expect(response.status()).toBe(expectedStatus);
    }

    static async assertJsonValue(response, key, expectedValue) {
        const body = await response.json();
        expect(body[key]).toBe(expectedValue);
    }

}