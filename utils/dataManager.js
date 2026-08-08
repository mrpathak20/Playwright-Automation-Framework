const fs = require("fs");
const path = require("path");

class DataManager {

    constructor() {
        this.cache = {};
    }

    getEnvironment() {
        return process.env.TEST_ENV || "uat";
    }

    load(fileName) {

        const env = this.getEnvironment();

        const filePath = path.join(
            process.cwd(),
            "testData",
            env,
            `${fileName}.json`
        );

        if (!fs.existsSync(filePath)) {
            throw new Error(
                `Data file not found: ${filePath}`
            );
        }

        // Cache the file
        if (!this.cache[filePath]) {

            console.log(` Loading Test Data: ${filePath}`);

            this.cache[filePath] = JSON.parse(
                fs.readFileSync(filePath, "utf8")
            );

        }

        return this.cache[filePath];

    }

    clearCache() {
        this.cache = {};
    }

}

module.exports = new DataManager();