const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');
const { resolve } = require('dns');


//Faker

// const { faker } = require('@faker-js/faker');

// function generateFakeUser() {

//   return {

//     Fullname: faker.person.fullName(),

//     email: faker.internet.email(),

//     phone: "9" + faker.string.numeric(9)

//   };

// }


//create folder

/**
     * Get today's date as a string in dd_mm_yyyy format (local timezone).
     * Example: "20_01_2026"
     */
function getCurrentDate() {
  console.log('[CommonUtilities] Generating current date string (dd_mm_yyyy)...');

  const today = new Date();
  console.log(`[CommonUtilities] System date: ${today.toString()}`);

  let day = today.getDate();
  let month = today.getMonth() + 1; // Months are zero-based (0-11)
  const year = today.getFullYear();

  // Add leading zero if day or month is less than 10
  day = day < 10 ? '0' + day : String(day);
  month = month < 10 ? '0' + month : String(month);

  const formatted = `${day}_${month}_${year}`;
  console.log(`[CommonUtilities] Formatted date: ${formatted}`);
  return formatted;
}

/**
* Create a folder at <basePath>/<folderName>.
* - Uses sync FS operations (simple & reliable for small utility work).
* - Returns the absolute path of the created/existing folder.
*
* @param {string} folderName - Name of the folder to create.
* @param {string} [basePath='reports'] - Base path under which the folder will be created.
* @returns {Promise<string>} Absolute folder path.
*/
async function createFolder(folderName, basePath = 'reports') {
  console.log(
    `[CommonUtilities] Requested to create folder: "${folderName}" under base path: "${basePath}"`
  );

  try {
    if (!folderName || typeof folderName !== 'string') {
      throw new Error('createFolder: "folderName" must be a non-empty string.');
    }

    // ✅ If absolute path is passed, use it directly
    const folderPath = path.isAbsolute(folderName)
      ? folderName
      : path.join(basePath, folderName);

    console.log(`[CommonUtilities] Resolved folder path: ${folderPath}`);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`[CommonUtilities] ✅ Folder created at: ${folderPath}`);
    } else {
      console.log(`[CommonUtilities] ℹ️ Folder already exists at: ${folderPath}`);
    }

    return folderPath;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    throw new Error(`Error creating folder: ${msg}`);
  }
}
``




/*Download Utility*/

async function downloadFile(page, locator, filePath) {

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    locator.click()
  ]);

  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  await download.saveAs(filePath);
}

/*Excel Reader */




function getTestdata(filePath, Sheet1) {
  const workbook = XLSX.readFile(filePath);
  const Sheet = workbook.Sheets[Sheet1];
  const data = XLSX.utils.sheet_to_json(Sheet);

  // Attach Original Index
  const dataWithIndex = data.map((row, index) => ({
    ...row,
    originalIndex: index
  }));

  //FILTER THE EXECUTOR = Y

  const filteredData = dataWithIndex.filter(row => String(row.executor).toUpperCase() === 'Y');

  return filteredData;
}

/*Excel Writer*/



function writePolicyNumber(filePath, sheetName, rowIndex, policyNumber) {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  console.log("Row Index:", rowIndex);
  console.log("total Rows:", data.length);

  if (!data[rowIndex]) {
    throw new Error(`Row${rowIndex} not found in Excel`);
  }

  data[rowIndex].policyNumber = policyNumber;
  const newSheet = XLSX.utils.json_to_sheet(data);
  workbook.Sheets[sheetName] = newSheet;
  XLSX.writeFile(workbook, filePath);

}

// Generate DashBoard





// // ✅ Wait until JSON file exists AND is fully written
// // ================== COMMON UTILITIES + DASHBOARD + GLOBAL TEARDOWN ==================


// // ------------------ WAIT FOR JSON FILE TO BE STABLE ------------------


// // ================= FILE STABILITY CHECK =================
// async function waitForFileStable(filePath, timeout = 15000) {
//   const start = Date.now();
//   let lastSize = -1;

//   while (Date.now() - start < timeout) {
//     if (fs.existsSync(filePath)) {
//       const { size } = fs.statSync(filePath);
//       if (size === lastSize) return true;
//       lastSize = size;
//     }
//     await new Promise(r => setTimeout(r, 500));
//   }

//   throw new Error('❌ test-result.json not stable');
// }

// // ================= DASHBOARD =================
// async function generateDashboard() {
//   const filePath = path.resolve('test-result.json');
//   await waitForFileStable(filePath);

//   const raw = fs.readFileSync(filePath, 'utf-8');
//   const data = JSON.parse(raw);

//   let passed = 0;
//   let failed = 0;
//   let rows = '';

//   data.suites.forEach(suite => {
//     suite.specs.forEach(spec => {
//       spec.tests.forEach(test => {
//         const result = test.results.at(-1);
//         if (!result) return;

//         const status = result.status;
//         status === 'passed' ? passed++ : failed++;

//         rows += `
// <tr>
//   <td>${spec.title}</td>
//   <td style="color:${status === 'passed' ? 'green' : 'red'}">${status}</td>
//   <td>${(result.duration / 1000).toFixed(2)}s</td>
// </tr>`;
//       });
//     });
//   });

//   const html = `
// <!DOCTYPE html>
// <html>
// <head>
// <title>Test Dashboard</title>
// https://cdn.jsdelivr.net/npm/chart.js>
// <style>
// body{font-family:Arial;padding:20px}
// table{width:100%;border-collapse:collapse;margin-top:25px}
// th,td{border:1px solid #ccc;padding:8px;text-align:center}
// th{background:#f4f4f4}
// </style>
// </head>
// <body>

// <h2>📊 Test Execution Dashboard</h2>

// <table>
// <tr><th>Test</th><th>Status</th><th>Duration</th></tr>
// ${rows}
// </table>

// <script>
// new Chart(document.createElement('canvas'), {});
// </script>

// </body>
// </html>`;

//   fs.writeFileSync('dashboard.html', html);
//   console.log('✅ Dashboard generated');
// }

// // ================= GLOBAL TEARDOWN =================
// async function globalTeardown() {
//   console.log('🧹 Global Teardown started');
//   await generateDashboard();
//   console.log('✅ Global Teardown completed');
// };

// module.export=globalTeardown;




//ScreenShot Utility

let screenshotCounter = 1;

async function takeScreenshot(page, caseName, stepName) {
  const baseDir = 'Screenshots';
  const TODAYS_DATE = getCurrentDate();

  const SS_PATH = path.join(baseDir, TODAYS_DATE);

  const caseDir = path.join(SS_PATH, caseName);

  if (!fs.existsSync(caseDir)) {
    fs.mkdirSync(caseDir, { recursive: true });
  }
  //const timestamp = new Date(). toISOString().replace(/[:.]/g,'-');
  //const filePath = path.join(caseDir, `${stepName}-${timestamp}.jpg`);
  const number = String(screenshotCounter).padStart(2, '0');
  const filePath = path.join(caseDir, `${number}_${stepName}.jpg`);

  await page.screenshot({
    path: filePath,
    fullPage: true,
  });
  screenshotCounter++;

}


//Scrollfunction

async function clickWithScroll(container, text) {
  const maxScrolls = 15;
  const scrollStep = 500;

  async function findAndClick() {
    const btn = container.getByRole('button', { name: text }).first();

    if (await btn.count() === 0) return false;
    if (!(await btn.isVisible())) return false;

    await btn.click();
    return true;
  }


  //  STEP 0: Try directly first

  if (await findAndClick()) return;


  //  STEP 1: Scroll RIGHT fully

  for (let i = 0; i < maxScrolls; i++) {
    await container.evaluate((el, step) => el.scrollLeft += step, scrollStep);
    await new Promise(r => setTimeout(r, 300));

    if (await findAndClick()) return;
  }


  //  STEP 2: Scroll LEFT to beginning

  await container.evaluate(el => el.scrollLeft = 0);
  await new Promise(r => setTimeout(r, 500));


  //  STEP 3: Scroll RIGHT again slowly

  for (let i = 0; i < maxScrolls; i++) {
    await container.evaluate((el, step) => el.scrollLeft += step, scrollStep);
    await new Promise(r => setTimeout(r, 300));

    if (await findAndClick()) return;
  }

  throw new Error(`❌ Button not found: "${text}"`);
}


module.exports = {
  downloadFile,
  getTestdata,
  writePolicyNumber,
  takeScreenshot,
  // generateFakeUser,
  getCurrentDate,
  createFolder,
 
  clickWithScroll,
  
};




