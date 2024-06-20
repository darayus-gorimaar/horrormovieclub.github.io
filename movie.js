const queryString = window.location.search;
console.log("Grabbing url parameters");

const urlParams = new URLSearchParams(queryString);

const title = urlParams.get('title')
console.log(title);

const year = urlParams.get('year')
console.log(year);

fetchMovieDetails(title, year);

//fetches OMBD data using the API
function fetchMovieDetails(title, year){
    // OMBD apikey=8e050c1e
    fetch(`https://www.omdbapi.com/?t=${title}&y=${year}&plot=full&apikey=8e050c1e`)
    .then(response => {
        if (!response.ok) {throw new Error('OMBD response was not ok');}
        return response.json();
    })
    .then(data => {
        console.log('Data received');
        console.log(data);
        if (data.Response !=  'False'){
            injectTitle(data.Title);
            // injectPoster(data.Poster);
            injectRight(data);
            injectLeft(data.Poster);
            injectPlot(data.Plot);
        }
        else {
            const OMDBerr = "OMDB API doesn't work for this title unfortunately :/";
            injectTitle(OMDBerr);
        }

    })
    .catch(error => {console.error('There was a problem with the OMBD fetch operation:', error);});
}

function injectTitle(title){
    document.getElementById("title").innerHTML += `${title}`;
}


function injectLeft(poster){
    document.getElementById("poster").innerHTML += `<img id = "big-poster" src="${poster}">`;

}
function injectRight(content){
    //title
    // document.getElementById("left").innerHTML += `<h3>${content.Title} (${content.Year})</h3>`;
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
    document.getElementById("right").innerHTML += `<p><b>Actors:</b> ${content.Actors}</p>`;
    document.getElementById("right").innerHTML += `<p><b>Box Office:</b> ${content.BoxOffice}</p>`;
    document.getElementById("right").innerHTML += `<p><b>Released:</b> ${content.Released}</p>`;

}

function injectPlot(plot) {
    document.getElementById("plot").innerHTML += `<h2>Plot</h2>`;
    document.getElementById("plot").innerHTML += `<p>${plot}</p>`;
}