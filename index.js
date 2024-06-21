//fetch DynamoDB data
const brendan = fetch('https://effedupforms.bdoestech.com/movies-brendan')
    .then(response => {
        if (!response.ok) {throw new Error('Network response was not ok');}
        return response.json();
    })
    .then(data => {
        console.log('Data received');
        var recent = getMostRecent(data);
        fetchMovieDetails(recent.Title, recent.Year);
        // console.log(recent);
    })
    .catch(error => {console.error('There was a problem with the DynamoDB fetch operation:', error);});

//fetches OMBD data using the API
function fetchMovieDetails(title, year){
    // OMBD apikey=8e050c1e
    fetch(`https://www.omdbapi.com/?t=${title}&y=${year}&apikey=8e050c1e`)
    .then(response => {
        if (!response.ok) {throw new Error('OMBD response was not ok');}
        return response.json();
    })
    .then(data => {
        console.log('Data received');
        injectTitle(data.Title);
        injectRight(data);
        injectLeft(data.Poster);
        console.log(data);
    })
    .catch(error => {console.error('There was a problem with the OMBD fetch operation:', error);});
}
function injectTitle(title){
    document.getElementById("title").innerHTML += `<h3>${title}</h3>`;
}
function injectLeft(content){
    console.log(content);
    document.getElementById("left").innerHTML += `<img id = "poster" src="${content}">`;
}
function injectRight(content){
    //title
    // document.getElementById("right").innerHTML += `<h3>${content.Title} (${content.Year})</h3>`;
    //Director
    document.getElementById("right").innerHTML += `<p><b>Director:</b> ${content.Director}</p>`;
    //Language
    document.getElementById("right").innerHTML += `<p><b>Lanuage:</b> ${content.Language}</p>`;
    //Genre
    document.getElementById("right").innerHTML += `<p><b>Genre:</b> ${content.Genre}</p>`;
    //Rated
    document.getElementById("right").innerHTML += `<p><b>Rated:</b> ${content.Rated}</p>`;
    //Runtime
    document.getElementById("right").innerHTML += `<p><b>Runtime:</b> ${content.Runtime}</p>`;
    //Plot
    document.getElementById("right").innerHTML += `<p><b>Plot:</b> ${content.Plot}</p>`;
}


//grabs the most recent movie
function getMostRecent(movies){
    var recent_date=0;
    var recent_movie = movies[0];
    movies.forEach(element => {
        if (element.Date > recent_date){
            recent_date = element.Date;
            recent_movie = element;
        }
      });
      return recent_movie;
}












//https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6W82aujnngUJG_p48n3Bp9n6jS6rYBoW_LPlJOEy6iS90zQwzOEPvPgJOjniVfxA-oe47iOeXf1ZF/pubhtml
// async function fetchSheets() {
//     var spreadsheet = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6W82aujnngUJG_p48n3Bp9n6jS6rYBoW_LPlJOEy6iS90zQwzOEPvPgJOjniVfxA-oe47iOeXf1ZF/pubhtml";
//     const response = await fetch(spreadsheet).then(response => {return response});
//     const json = response.json();
//     console.log(json);
//     let list_of_cells = json.feed.entry;
//     for (cell of list_of_cells) {
//         console.log(cell.gs$cell.$t);
//     }
// }

// // Call the function when the page loads
// window.onload = fetchSheets;
// window.onload = updateCurrentWeekDates;




















// OLDDDDDDDDDD
// Function to get the start and end dates of the current week
// function getCurrentWeekDates() {
//     var today = new Date();
//     var currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
//     var startDate = new Date(today); // Clone the current date
//     startDate.setDate(today.getDate() - currentDay); // Calculate the start date of the current week
//     var endDate = new Date(startDate); // Clone the start date
//     endDate.setDate(startDate.getDate() + 6); // Calculate the end date of the current week
//     return { startDate: startDate.toLocaleDateString(), endDate: endDate.toLocaleDateString() };
// }

// // Function to update the HTML with current week start and end dates
// function updateCurrentWeekDates() {
//     var dates = getCurrentWeekDates();
//     document.getElementById('startDate').textContent = dates.startDate;
//     document.getElementById('endDate').textContent = dates.endDate;
// }