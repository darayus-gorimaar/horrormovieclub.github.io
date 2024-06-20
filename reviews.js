caller();
var dataLength = 0;
async function caller () {
    await getBrendan();
    await getDar();
    paginate(dataLength, 3);
}
// FETCH DATA //////////////////////
//https://corsproxy.io/?
//https://thingproxy.freeboard.io/fetch/
async function getDar() {
    return await fetch('https://effedupforms.bdoestech.com/movies-darayus')
    .then(response => {
        if (!response.ok) {throw new Error('Network response was not ok');}
        return response.json();
    })
    .then(data => {
        console.log('Data received for Darayus');
        console.log(data);
        create_content(data, "Darayus");
    })
    .catch(error => {console.error('There was a problem with the fetch operation:', error);});
}
async function getBrendan() {
    return await fetch('https://effedupforms.bdoestech.com/movies-brendan')
    .then(response => {
        if (!response.ok) {throw new Error('Network response was not ok');}
        return response.json();
    })
    .then(data => {
        console.log('Data received for Brendan');
        console.log(data);
        create_content(data, "Brendan");
        paginate(5);
    })
    .catch(error => {console.error('There was a problem with the fetch operation:', error);});
}


// CREATE NEW DIVS ////////////////////////////////////////////////
//this function loops through each item in the dataset, injects content to new div
function create_content(data, user) {
    // let sorted = sortJSON(data);
    data.forEach(element => {
        let div_name = `${element.Title.S}`;
        let date = DatetoDate(element.Date.N);
        if (!document.getElementById(div_name)) {
            dataLength++;
            createNewDiv(div_name, element.Date.N);
            document.getElementById(div_name).innerHTML = `<h3 id="text">${element.Title.S} (${element.Year.N})</h3><i><p id="date">Watched on: ${date}</p> <p id="text">"${element.Review.S}"</i><br> <em>${user} (${element.Rating.N}/10)<e/m></p>`;
        }
        else {
            document.getElementById(div_name).innerHTML += `<i><p id="text">"${element.Review.S}"</i><br> <em>${user} (${element.Rating.N}/10)<e/m></p>`;
        }
    });
}
// creates and places new div in chronological order
function createNewDiv(id, date) {
    const newDiv = document.createElement("div");
    let reviews = document.getElementById("reviews").getElementsByClassName("film");
    newDiv.setAttribute("id", id);
    newDiv.setAttribute("date", date)
    newDiv.setAttribute("class", "film");
    
    if (reviews.length == 0){
        document.getElementById("reviews").appendChild(newDiv); 
    }
    else {
        for (let i = 0; i < reviews.length; i++) {
            current = reviews[i].getAttribute("date");
            if(date > current) {
                reviews[i].insertAdjacentElement('beforebegin', newDiv);
                break;
            }
        }
    }
}
//////////////////////////////////////////////////////////////////

// PAGINATE ///////////////////////////////
function paginate (dataLength, itemsOnEach){
    console.log(itemsOnEach)
    $("#reviews .film").slice(3).hide();

    $('#pagination').pagination({ 

        // Total number of items present 
        // in wrapper class 
        items: dataLength, 
        class: 'dark-theme',
        // Items allowed on a single page 
        itemsOnPage: itemsOnEach,  
        onPageClick: function (noofele) { 
            $("#reviews .film").hide() 
                .slice(itemsOnEach*(noofele-1), 
                itemsOnEach + itemsOnEach* (noofele - 1)).show(); 
        } 
    }); 
}


// GET READABLE DATE ////////////////////////////////////////
function DatetoDate(date_DB) {
    var str = date_DB.toString();
    if(str.length == 8){
        return str.substring(0, 2) + "/" + str.substring(2, 4) + "/" + str.substring(4, 7);
    }
    if(str.length == 7){
        return str.substring(0, 1) + "/" + str.substring(1, 3) + "/" + str.substring(3, 6);
    }
}
//////////////////////////////////////////////////////////////////




$("#searchInput").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#searchButton").click();
    }
});
$("#searchButton").click(function() {
    console.log("Search button executed.");
});


// SEARCH BAR FUNCTION //////////////////////////////////////////
function searchFunction() {
    $("#pagination").hide();
    // Declare variables
    var input, filter, id, i, txtValue;
    input = document.getElementById('searchInput').value;
    input = input.toLowerCase();
    list = document.getElementsByClassName('film');
    
    for (i = 0; i < list.length; i++) {
      if (!list[i].innerHTML.toLowerCase().includes(input)) {
        list[i].style.display = 'none';
      }
      else {
        list[i].style.display = '';
      }
  }
}

function isEmpty() {
    var text = $("#searchInput").val();
    console.log("Empty:");
    console.log(text);
    if (text == ""){
        location.reload();
    }
}
//////////////////////////////////////////////////////////////////
