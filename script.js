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

//https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6W82aujnngUJG_p48n3Bp9n6jS6rYBoW_LPlJOEy6iS90zQwzOEPvPgJOjniVfxA-oe47iOeXf1ZF/pubhtml
async function fetchSheets() {
    var spreadsheet = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6W82aujnngUJG_p48n3Bp9n6jS6rYBoW_LPlJOEy6iS90zQwzOEPvPgJOjniVfxA-oe47iOeXf1ZF/pubhtml";
    const response = await fetch(spreadsheet).then(response => {return response});
    const json = response.json();
    console.log(json);
    let list_of_cells = json.feed.entry;
    for (cell of list_of_cells) {
        console.log(cell.gs$cell.$t);
    }
}

$('.content').hide();
$(".collapsible").click(function () {
    
    $header = $(this);
    //getting the next element
    $content = $header.next();
    //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
    $content.slideToggle(500, function () {
        //execute this after slideToggle is done
        //change text of header based on visibility of content div
        $header.text(function () {
            //change text based on condition
            // return $content.is(":visible") ? "Collapse" : "Expand";
        });
    });

});

// Call the function when the page loads
window.onload = fetchSheets;
window.onload = updateCurrentWeekDates;
