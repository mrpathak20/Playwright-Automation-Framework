const XLSX = require('xlsx');

const inputFile = './test-data/userDataTDL.xlsx';
const outputFile = './test-data/userDataTDL.xlsx';

// Read Excel file
const workbook = XLSX.readFile(inputFile);

// Get worksheet
const worksheet = workbook.Sheets['Sheet1'];

// Convert Excel data to JavaScript objects
const data = XLSX.utils.sheet_to_json(worksheet);

// Search for Name
for (let row of data) {

    if (row['Emp Name'] === 'Rohan') {
        row['Status'] = 'Present';
    } else {
        row['Status'] = 'Not Present';
    }

}

// Convert data back to worksheet
const newWorksheet = XLSX.utils.json_to_sheet(data);

// Update worksheet
workbook.Sheets['Sheet1'] = newWorksheet;

// Save updated Excel
XLSX.writeFile(workbook, outputFile);

console.log('Excel file updated successfully.');