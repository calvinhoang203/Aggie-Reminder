const express = require('express');
const cors = require('cors');
const xlsx = require('xlsx');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Function to read data from Excel file
function readExcelData(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Get the first sheet name
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    return data; // Returns an array of objects based on Excel rows
}

// API endpoint to serve shifts data from Excel file
app.get('/api/shifts', (req, res) => {
    const shifts = readExcelData('C:/Users/Minh/Documents/Test Calendar 2024.xlsx');
    console.log(shifts);  // Log data to see its structure
    res.json(shifts);
});


// Server port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
