const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const {
    writeEnvironment
} = require("./reporting/allure/environmentWriter");

module.exports = async () => {

    console.log("");
    console.log("========================================");
    console.log("Generating Allure Report...");
    console.log("========================================");

    try {

        // Generate environment.properties
        writeEnvironment();

        const reportHistory = path.join(process.cwd(), "allure-report", "history");
        const resultsHistory = path.join(process.cwd(), "allure-results", "history");

        // Preserve history for trend graphs
        if (fs.existsSync(reportHistory)) {

            fs.mkdirSync(resultsHistory, { recursive: true });

            fs.cpSync(reportHistory, resultsHistory, {
                recursive: true,
                force: true
            });

            console.log(" Previous Allure history copied.");

        } else {

            console.log("ℹ️ No previous Allure history found. Trend will start from this execution.");

        }

        // Generate new report
        execSync(
            "allure generate allure-results --clean -o allure-report",
            {
                stdio: "inherit"
            }
        );

        console.log("");
        console.log("✅ Allure Report Generated Successfully");
        console.log("");

    } catch (error) {

        console.error("❌ Unable to generate Allure Report");
        console.error(error);

    }

};