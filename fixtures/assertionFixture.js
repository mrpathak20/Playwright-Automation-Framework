const Assertion = require("../utils/assertionUtil");
const SoftAssertionUtil = require("../utils/softAssertionUtil");

class Assertions {

    constructor() {

        this.soft = new SoftAssertionUtil();

    }

    async assertVisible(locator) {
        await Assertion.assertVisible(locator);
    }

    async assertHidden(locator) {
        await Assertion.assertHidden(locator);
    }

    async assertText(locator, expected) {
        await Assertion.assertText(locator, expected);
    }

    async assertURL(page, url) {
        await Assertion.assertURL(page, url);
    }

}

module.exports = Assertions;