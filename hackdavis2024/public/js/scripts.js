document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/shifts')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        const tableBody = document.getElementById('shiftsTable').getElementsByTagName('tbody')[0];
        
        // Insert the first "Week 1" row immediately
        let initialWeekRow = tableBody.insertRow();
        initialWeekRow.classList.add('week-row');
        let initialWeekCell = initialWeekRow.insertCell(0);
        initialWeekCell.colSpan = 3;
        initialWeekCell.textContent = 'Week 1';

        let weekCount = 2;  // Start the week counter from 2 since Week 1 is already displayed
        data.forEach((row, index) => {
            let newRow = tableBody.insertRow();
            let cell1 = newRow.insertCell(0);
            let cell2 = newRow.insertCell(1);
            let cell3 = newRow.insertCell(2);
            cell1.textContent = row['Shift Time'];
            if (row['Date']) {
                const date = new Date((row['Date'] - (25567 + 2)) * 86400000);
                date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
                cell2.textContent = date.toLocaleDateString();
            } else {
                cell2.textContent = '';
            }
            cell3.textContent = row['Volunteers'];

            // Add a week separator after every 7 rows starting from the second group of 7 rows
            if ((index + 1) % 7 === 0) {
                let weekRow = tableBody.insertRow();
                weekRow.classList.add('week-row');
                let weekCell = weekRow.insertCell(0);
                weekCell.colSpan = 3;
                weekCell.textContent = 'Week ' + weekCount;
                weekCount++;  // Increment week counter
            }
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});


document.getElementById('reminderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const recipients = document.getElementById('recipients').value;

    fetch('/send-custom-reminders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ subject, message, recipients })
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error('Error sending reminders:', error));
});