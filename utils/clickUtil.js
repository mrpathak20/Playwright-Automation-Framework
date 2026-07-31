import { retry } from "./retryUtil.js";

/**
 * Smart Click Utility
 * @param {Locator} locator
 * @param {Object} options
 */
export async function smartClick(
    locator,
    {
        retries = 3,
        timeout = 5000,
        force = false,
        delay = 1000
    } = {}
) {

    await retry(async () => {

        // Wait until visible
        await locator.waitFor({
            state: "visible",
            timeout
        });

        // Scroll into view
        await locator.scrollIntoViewIfNeeded();

        // Wait until enabled
        await locator.waitFor({
            state: "attached"
        });

        // Click
        await locator.click({
            force,
            timeout
        });

    }, {

        retries,
        delay,
        actionName: "Smart Click"

    });

}