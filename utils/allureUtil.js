

const {
    allure
} = require("allure-playwright");

class AllureUtil {

    async feature(name) {
        await allure.feature(name);
    }

    async story(name) {
        await allure.story(name);
    }

    async severity(level) {
        await allure.severity(level);
    }

    async owner(name) {
        await allure.owner(name);
    }

    async tag(name) {
        await allure.tag(name);
    }

    async description(text) {
        await allure.description(text);
    }

}

module.exports = new AllureUtil();