// CREATE CONTENT FROM DYNAMO DB //////////////////////

const dar = fetch('http://horror-forms.bdoestech.com/movies-darayus')
    .then(response => {
        if (!response.ok) {throw new Error('Network response was not ok');}
        return response.json();
    })
    .then(data => {
        console.log('Data received');
        create_content(data, "Darayus");
    })
    .catch(error => {console.error('There was a problem with the fetch operation:', error);});

const brendan = fetch('http://horror-forms.bdoestech.com/movies-brendan')
    .then(response => {
        if (!response.ok) {throw new Error('Network response was not ok');}
        return response.json();
    })
    .then(data => {
        console.log('Data received');
        create_content(data, "Brendan");
    })
    .catch(error => {console.error('There was a problem with the fetch operation:', error);});

function create_content(data, user) {
      // create a new div element
      data.forEach(element => {
        let div_name = `${element.Title.S}`;
        if (!document.getElementById(div_name)) {
            createNewDiv(div_name);
            document.getElementById(div_name).innerHTML = `<h3 id="text">${element.Title.S} (${element.Year.N})</h3><i><b><p id="text">"${element.Review.S}"</i></b><br> <em>${user} (${element.Rating.N}/10)<e/m></p>`;
        }
        else {
            document.getElementById(div_name).innerHTML += `<i><b><p id="text">"${element.Review.S}"</i></b><br> <em>${user} (${element.Rating.N}/10)<e/m></p>`;
        }
      });
}
function createNewDiv(id) {
    const newDiv = document.createElement("div");
    const foot = document.getElementById('footer');
    newDiv.setAttribute("id", id)
    newDiv.setAttribute("class", "film");
    document.getElementById("movies").appendChild(newDiv);  
}
//////////////////////////////////////////////////////////////////






// SEARCH BAR FUNCTION //////////////////////////////////////////
function searchFunction() {
    // Declare variables
    var input, filter, cl, id, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    list = document.body.getElementsByTagName('div');
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < list.length; i++) {
      id = list[i].getAttribute('id');
      cl = list[i].getAttribute('class');
      txtValue = $(document.getElementById(id)).text();
      if ((txtValue.toUpperCase().indexOf(filter) < 0) && (cl != 'topnav') && (id != 'search'))  {
        list[i].style.display = "none";
      } else {
        list[i].style.display = "none";
      }
    }
  }
//////////////////////////////////////////////////////////////////
