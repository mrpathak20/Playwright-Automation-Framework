function generateEmailTemplate(summary) {

    return `

<!DOCTYPE html>

<html>

<head>

<style>

body{

font-family:Arial,Helvetica,sans-serif;

background:#f5f5f5;

padding:30px;

}

.container{

background:white;

padding:25px;

border-radius:10px;

box-shadow:0 2px 10px rgba(0,0,0,.1);

}

h2{

color:#2E7D32;

}

table{

width:100%;

border-collapse:collapse;

margin-top:20px;

}

th{

background:#2E7D32;

color:white;

padding:10px;

}

td{

padding:10px;

border:1px solid #ddd;

}

.footer{

margin-top:30px;

font-size:14px;

color:#666;

}

</style>

</head>

<body>

<div class="container">

<h2>🚀 Playwright Automation Framework</h2>

<h3>Execution Summary</h3>

<table>

<tr>

<th>Property</th>

<th>Value</th>

</tr>

<tr>

<td>Framework</td>

<td>${summary.framework}</td>

</tr>

<tr>

<td>Version</td>

<td>${summary.frameworkVersion}</td>

</tr>

<tr>

<td>Environment</td>

<td>${summary.environment}</td>

</tr>

<tr>

<td>Browser</td>

<td>${summary.browser}</td>

</tr>

<tr>

<td>Execution</td>

<td>${summary.executionMode}</td>

</tr>

<tr>

<td>Total</td>

<td>${summary.total}</td>

</tr>

<tr>

<td style="color:green;"><b>Passed</b></td>

<td style="color:green;"><b>${summary.passed}</b></td>

</tr>

<tr>

<td style="color:red;"><b>Failed</b></td>

<td style="color:red;"><b>${summary.failed}</b></td>

</tr>

<tr>

<td>Skipped</td>

<td>${summary.skipped}</td>

</tr>

<tr>

<td>Duration</td>

<td>${summary.duration}</td>

</tr>

</table>

<br>

<b>Attachments</b>

<ul>

<li>📊 Allure Report</li>

<li>📄 Playwright HTML Report</li>

<li>📸 Screenshots</li>

<li>🎥 Videos</li>

<li>📦 Trace Files</li>

</ul>

<div class="footer">

Regards,

<br><br>

<b>Playwright Automation Framework</b>

</div>

</div>

</body>

</html>

`;

}

module.exports = {

generateEmailTemplate

};