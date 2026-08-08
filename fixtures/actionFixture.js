import { smartClick } from "../utils/clickUtil";
import { smartFill } from "../utils/fillUtil";
import { waitForPageReady } from "../utils/waitUtil";

export class Actions {

    async smartClick(locator) {
        await smartClick(locator);
    }

    async smartFill(locator, value) {
        await smartFill(locator, value);
    }

    async waitForPageReady(page) {
        await waitForPageReady(page);
    }

}