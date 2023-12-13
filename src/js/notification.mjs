import { loadHeader } from './utils.mjs';

loadHeader('Notice');

// Get the table element
const table = document.getElementById('notifications-table');

// Get the table rows as an array
const rows = Array.from(table.querySelectorAll('tbody tr'));

// Function to sort the rows
function sortRows(index, asc = true) {
  // Existing sortRows function
}

// Get the sortable column headings
const sortables = Array.from(table.querySelectorAll('.sortable'));

// Add click event listeners to the sortable column headings
for (const sortable of sortables) {
  sortable.addEventListener('click', () => {
    // Get the column index based on the data-sort attribute
    const index = sortable.dataset.sort === 'status' ? 0 : 1;

    // Sort the rows
    sortRows(index, false);

    // Remove the selected class from all sortables
    for (const other of sortables) {
      other.classList.remove('selected');
    }

    // Add the selected class to the clicked sortable
    sortable.classList.add('selected');
  });
}

// Fetch the JSON file
fetch('/json/notification.json')
  .then((response) => response.json())
  .then((data) => {
    // Get the table body
    const tbody = document.querySelector('#notifications-table tbody');

    // Create a table row for each item in the data
    for (const item of data) {
      const row = document.createElement('tr');

      // Create a status indicator for the status
      const statusCell = document.createElement('td');
      const statusIndicator = document.createElement('span');
      statusIndicator.className = `status-indicator ${item.status.toLowerCase()}`;
      statusCell.appendChild(statusIndicator);
      row.appendChild(statusCell);

      // Create a table cell for the timestamp and message
      const timestampCell = document.createElement('td');
      timestampCell.textContent = item.timestamp;
      row.appendChild(timestampCell);

      const messageCell = document.createElement('td');
      messageCell.innerHTML = `<a href="more-info.html">${item.message}</a>`;
      row.appendChild(messageCell);

      // Add the row to the table body
      tbody.appendChild(row);
    }
  })
  .catch((error) => console.error('Error:', error));
