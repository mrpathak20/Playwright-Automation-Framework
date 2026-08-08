const {
    allure
} = require("allure-playwright");

class AllureUtil {

    async epic(name) {
        await allure.epic(name);
    }

    async feature(name) {
        await allure.feature(name);
    }

    async story(name) {
        await allure.story(name);
    }

    async owner(name) {
        await allure.owner(name);
    }

    async severity(level) {
        await allure.severity(level);
    }

    async tag(...tags) {
        await allure.tags(...tags);
    }

    async description(text) {
        await allure.description(text);
    }

    async suite(name) {
        await allure.parentSuite(name);
    }

    async subSuite(name) {
        await allure.suite(name);
    }

}

module.exports = new AllureUtil();