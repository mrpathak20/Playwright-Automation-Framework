import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

class ReportUtils {
    static async createExcelSheet(folderPath) {
        console.log(`Creating excel report inside: ${folderPath}`);

        const fileName = "ExecutionReport.xlsx";
        const filePath = path.join(folderPath, fileName);

        if (fs.existsSync(filePath)) {
            return;
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('ExecutionReport');

        const headers = [
            "Test_Case", "Product", "Status", "Execution_Date_Time",
            "Execution_Duration", "Error_Message", "Policy_Number"
        ];

        const headerRow = worksheet.addRow(headers);

        const borderStyle = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        headerRow.eachCell((cell) => {
            cell.font = { bold: true, color: { argb: 'FF000000' } };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFD9E1F2' }
            };
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
            cell.border = borderStyle;
        });

        worksheet.columns = headers.map(header => ({ header, width: 22 }));

        await workbook.xlsx.writeFile(filePath);
    }

    static async appendTestResult(folderPath, data) {
        if (!folderPath) {
            throw new Error('Report path is empty');
        }

        const resolvedFolderPath = path.isAbsolute(folderPath)
            ? folderPath
            : path.resolve(process.cwd(), folderPath);

        const filePath = path.join(resolvedFolderPath, 'ExecutionReport.xlsx');

        if (!fs.existsSync(filePath)) {
            await this.createExcelSheet(resolvedFolderPath);
        }

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);

        const worksheet = workbook.getWorksheet('ExecutionReport');

        const row = worksheet.addRow([
            data.testCase,
            data.product,
            data.status,

            new Date().toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                hour12: true
            }),
            `${data.duration} mins`,

            data.errorMessage || '',
            data.policyNumber || ''
        ]);

        const borderStyle = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        row.eachCell((cell, colNumber) => {
            cell.border = borderStyle;

            // ✅ Status color formatting
            if (colNumber === 3) {
                if (String(cell.value).toUpperCase() === 'PASS') {
                    cell.font = { color: { argb: 'FF008000' }, bold: true };
                } else if (String(cell.value).toUpperCase() === 'FAIL') {
                    cell.font = { color: { argb: 'FFFF0000' }, bold: true };
                }
            }

            // ✅ Wrap text ONLY for Error_Message column (6th)
            if (colNumber === 6) {
                cell.alignment = {
                    ...(cell.alignment || {}),
                    wrapText: true
                };
            }
        });

        // ✅ Auto-fit columns (existing functionality preserved)
        worksheet.columns.forEach(column => {
            let maxLength = 2;
            column.eachCell({ includeEmpty: true }, cell => {
                const value = cell.value ? cell.value.toString() : '';
                maxLength = Math.max(maxLength, value.length);
            });
            column.width = maxLength + 2;
        });

        await workbook.xlsx.writeFile(filePath);
    }
}

export { ReportUtils };