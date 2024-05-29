// Function to get the start and end dates of the current week
function getCurrentWeekDates() {
    var today = new Date();
    var currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    var startDate = new Date(today); // Clone the current date
    startDate.setDate(today.getDate() - currentDay); // Calculate the start date of the current week
    var endDate = new Date(startDate); // Clone the start date
    endDate.setDate(startDate.getDate() + 6); // Calculate the end date of the current week
    return { startDate: startDate.toLocaleDateString(), endDate: endDate.toLocaleDateString() };
}

// Function to update the HTML with current week start and end dates
function updateCurrentWeekDates() {
    var dates = getCurrentWeekDates();
    document.getElementById('startDate').textContent = dates.startDate;
    document.getElementById('endDate').textContent = dates.endDate;
}

// Call the function when the page loads
window.onload = updateCurrentWeekDates;
