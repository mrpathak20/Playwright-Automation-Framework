const nodemailer = require("nodemailer");

const { getExecutionSummary } = require("./executionSummary");
const { generateEmailTemplate } = require("./emailTemplate");
const emailConfig = require("./emailConfig");
const {

zipExecutionReports

} = require("../zip/zipReport");
async function sendExecutionReport() {

    const summary = getExecutionSummary();

    const transporter = nodemailer.createTransport({

        service: emailConfig.service,

        auth: {

            user: emailConfig.from,

            pass: emailConfig.password

        }

    });

    // create zip attachments before preparing mail options
    await zipExecutionReports();

    const mailOptions = {
        from: emailConfig.from,
        to: emailConfig.to,
        subject: ` Playwright Execution Report | ${summary.environment}`,
        html: generateEmailTemplate(summary),
        attachments: [

        {

            filename: "AllureReport.zip",

            path: "reports/allure-report.zip"

        },

        {

            filename: "PlaywrightReport.zip",

            path: "reports/playwright-report.zip"

        }

    ]

    };

    await transporter.sendMail(mailOptions);

    console.log("");

    console.log("========================================");

    console.log("✅ Execution Email Sent Successfully");

    console.log("========================================");

}

module.exports = {

    sendExecutionReport

};