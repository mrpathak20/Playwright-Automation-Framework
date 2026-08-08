const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

async function zipDirectory(sourceDir, outputZip) {

    return new Promise((resolve, reject) => {

        const output = fs.createWriteStream(outputZip);

        const archive = archiver("zip", {

            zlib: {

                level: 9

            }

        });

        output.on("close", () => {

            console.log(`✅ Created ${outputZip}`);

            resolve();

        });

        archive.on("error", reject);

        archive.pipe(output);

        archive.directory(sourceDir, false);

        archive.finalize();

    });

}

async function zipExecutionReports() {

    const reportsFolder = path.join(process.cwd(), "reports");

    if (!fs.existsSync(reportsFolder)) {

        fs.mkdirSync(reportsFolder);

    }

    if (fs.existsSync("playwright-report")) {

        await zipDirectory(

            "playwright-report",

            "reports/playwright-report.zip"

        );

    }

    if (fs.existsSync("allure-report")) {

        await zipDirectory(

            "allure-report",

            "reports/allure-report.zip"

        );

    }

}

module.exports = {

    zipExecutionReports

};