// CREATE CONTENT FROM DYNAMO DB //////////////////////

const dar = fetch('http://reverse-proxy.bdoestech.com/?url=http://horror-forms.bdoestech.com/movies-darayus')
    .then(response => {
        if (!response.ok) {throw new Error('Network response was not ok');}
        return response.json();
    })
    .then(data => {
        console.log('Data received for Darayus');
        create_content(data, "Darayus");
    })
    .catch(error => {console.error('There was a problem with the fetch operation:', error);});

const brendan = fetch('http://reverse-proxy.bdoestech.com/?url=http://horror-forms.bdoestech.com/movies-brendan')
    .then(response => {
        if (!response.ok) {throw new Error('Network response was not ok');}
        return response.json();
    })
    .then(data => {
        console.log('Data received for Brendan');
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
    document.getElementById("reviews").appendChild(newDiv);  
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
