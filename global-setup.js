const fs = require("fs");
const path = require("path");

module.exports = async () => {

    console.log("\n========================================");
    console.log("🚀 Playwright Framework Initialization");
    console.log("========================================");

    const folders = [
        "allure-results",
        "allure-report",
        "playwright-report",
        "test-results"
    ];

    folders.forEach(folder => {
        const folderPath = path.join(process.cwd(), folder);

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
            console.log(`✅ Created Folder : ${folder}`);
        } else {
            console.log(`📁 Folder Exists : ${folder}`);
        }
    });

    console.log("\n✅ Reporting folders initialized successfully.");
    console.log("========================================\n");

};