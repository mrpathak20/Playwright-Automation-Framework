import os from "os";
import { EXECUTION_CONFIG } from "../config/executionConfig.js";

export function printExecutionDashboard() {

    const now = new Date();

    const startedAt = now.toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "medium"
    });

    console.log(`
══════════════════════════════════════════════════════════════════════

🚀 ${EXECUTION_CONFIG.frameworkName}

══════════════════════════════════════════════════════════════════════

Framework Version : ${EXECUTION_CONFIG.frameworkVersion}

Environment       : ${(process.env.TEST_ENV || "UAT").toUpperCase()}

Base URL          : ${process.env.BASE_URL}

Browser           : ${EXECUTION_CONFIG.browser}

Execution Mode    : ${EXECUTION_CONFIG.executionType}

Workers           : ${process.env.PW_WORKERS || "Default"}

Platform          : ${os.platform()}

Operating System  : ${os.type()} ${os.release()}

Node Version      : ${process.version}

Started At        : ${startedAt}

══════════════════════════════════════════════════════════════════════
`);

}