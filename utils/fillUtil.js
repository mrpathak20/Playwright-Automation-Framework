import { retry } from "./retryUtil.js";

export async function smartFill(
    locator,
    value,
    {
        retries = 3,
        timeout = 5000,
        delay = 1000
    } = {}
) {

    await retry(async () => {

        await locator.waitFor({
            state: "visible",
            timeout
        });

        await locator.clear();

        await locator.fill(value);

        const enteredValue = await locator.inputValue();

        if (enteredValue !== value) {

            throw new Error(
                `Expected "${value}" but found "${enteredValue}"`
            );

        }

    }, {

        retries,
        delay,
        actionName: "Smart Fill"

    });

}