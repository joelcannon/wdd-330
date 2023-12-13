import { loadHeader } from './utils.mjs';

loadHeader();

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
