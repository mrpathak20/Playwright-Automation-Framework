/**
 * Generic retry utility
 * Reuses the same retry logic across Smart Click, Smart Fill, etc.
 */

export async function retry(
    action,
    {
        retries = 3,
        delay = 1000,
        actionName = "Action",
        logRetries = true
    } = {}
) {

    let lastError;

    for (let attempt = 1; attempt <= retries; attempt++) {

        try {

            return await action();

        } catch (error) {

            lastError = error;

            if (logRetries) {

                console.log(
                    `⚠ ${actionName} failed. Retry ${attempt}/${retries}`
                );

            }

            if (attempt < retries) {

                await new Promise(resolve => setTimeout(resolve, delay));

            }

        }

    }

    throw new Error(
        `${actionName} failed after ${retries} attempts.\n${lastError.message}`
    );

}