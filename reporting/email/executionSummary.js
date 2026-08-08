const fs = require("fs");
const path = require("path");

function getExecutionSummary() {

    const reportPath = path.join(process.cwd(), "test-result.json");

    if (!fs.existsSync(reportPath)) {
        throw new Error("test-result.json not found.");
    }

    const report = JSON.parse(fs.readFileSync(reportPath, "utf-8"));

    let passed = 0;
    let failed = 0;
    let skipped = 0;

    function traverseSuites(suites) {

        if (!suites) return;

        for (const suite of suites) {

            if (suite.specs) {

                for (const spec of suite.specs) {

                    for (const test of spec.tests) {

                        const result = test.results?.[0];

                        if (!result) continue;

                        switch (result.status) {

                            case "passed":
                                passed++;
                                break;

                            case "failed":
                                failed++;
                                break;

                            case "skipped":
                                skipped++;
                                break;
                        }

                    }

                }

            }

            if (suite.suites) {
                traverseSuites(suite.suites);
            }

        }

    }

    traverseSuites(report.suites);

    return {

        framework: "Playwright Automation Framework",

        frameworkVersion: "v1.2.0",

        environment: process.env.TEST_ENV?.toUpperCase() || "UAT",

        browser: process.env.BROWSER || "Chromium",

        executionMode: "Parallel",

        total: passed + failed + skipped,

        passed,

        failed,

        skipped,

        duration: report.stats?.duration
            ? `${Math.round(report.stats.duration / 1000)} Seconds`
            : "N/A"

    };

}

module.exports = {

    getExecutionSummary

};