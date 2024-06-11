caller();
async function caller () {
    await getBrendan();
    await getDar();
}
// FETCH DATA //////////////////////
//https://corsproxy.io/?
//https://thingproxy.freeboard.io/fetch/
async function getDar() {
    return await fetch('https://horror-forms.bdoestech.com/movies-darayus')
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
    return await fetch('https://horror-forms.bdoestech.com/movies-brendan')
    .then(response => {
        if (!response.ok) {throw new Error('Network response was not ok');}
        return response.json();
    })
    .then(data => {
        console.log('Data received for Brendan');
        console.log(data);
        create_content(data, "Brendan");
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
            createNewDiv(div_name, element.Date.N);
            document.getElementById(div_name).innerHTML = `<h3 id="text">${element.Title.S} (${element.Year.N})</h3><i><b><p id="date">Watched on: ${date}</p> <p id="text">"${element.Review.S}"</i></b><br> <em>${user} (${element.Rating.N}/10)<e/m></p>`;
        }
        else {
            document.getElementById(div_name).innerHTML += `<i><b><p id="text">"${element.Review.S}"</i></b><br> <em>${user} (${element.Rating.N}/10)<e/m></p>`;
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


// SEARCH BAR FUNCTION //////////////////////////////////////////
function searchFunction() {
    // Declare variables
    var input, filter, id, i, txtValue;
    input = document.getElementById('myInput').value;
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
//////////////////////////////////////////////////////////////////
