document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/shifts')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('shiftsTable').getElementsByTagName('tbody')[0];
        data.forEach(row => {
            // Convert Excel serial date to JavaScript Date object
            const date = convertExcelDate(row['__EMPTY_1']);
            
            // Check if the date is valid before appending the row
            if (!isNaN(date.getTime())) { // This checks if the date is valid
                let newRow = tableBody.insertRow();
                let cell1 = newRow.insertCell(0);
                let cell2 = newRow.insertCell(1);
                let cell3 = newRow.insertCell(2);
                cell1.textContent = row['__EMPTY'];
                cell2.textContent = date.toLocaleDateString(); // Use the valid date
                cell3.textContent = row['__EMPTY_2'];
            }
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});

// Helper function to convert Excel date serial numbers to JS Date objects
function convertExcelDate(serial) {
    return new Date(Date.UTC(0, 0, serial - 1, 0, 0, 0));
}
