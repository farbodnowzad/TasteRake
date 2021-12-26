// Defining async function
async function getapi(category) {
    var api_url = "https://pludo.app/doost/products";
    if (category != null) {
        api_url+=`?category=${category}`
    }
    // Storing response
    fetch(api_url, {
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        show(data);
    });
    // if (response) {
    //     hideloader();
    // }
}
// Calling that async function
href_split = window.location.href.split("?category=")
let category = null;
if (href_split.length > 1) {
    category = href_split[1].replace("#", "")
}
getapi(category);
  
// // Function to hide the loader
// function hideloader() {
//     document.getElementById('loading').style.display = 'none';
// }
// Function to define innerHTML for HTML table
function show(data) {
    results = data.response
    let row = ``;
    
    // Loop to access all rows 
    for (let r of results) {
        total_usd = r.price.split(" $")[1].replace(",", "")
        reduced_price = (total_usd * 0.90).toFixed(2)

        row += `<div class="col-6 item-container">
                    <a href="product_page.html?product_id=${r._id}" class="item-link">
                    <div class="img-container">
                        <img
                            src=${r.primary_image}></img>
                    </div>
                    <div class="item-footer">
                        <div class="item-description">
                            ${r.brand}<br>
                            <span class="item-title">${r.title}</span><br>
                            US $${reduced_price} <s>${r.price}</s>
                        </div>
                    </div>
                </a>
            </div>`;
    }
    // Setting innerHTML as tab variable
    document.getElementById("product_results").innerHTML = row;
}

function submitNumber() {
    phone_number = document.getElementById('number-input').value
    user_name = document.getElementById('name-input').value

    const api_url = `https://pludo.app/doost/link`;
    const data = {
        'phone_number' : phone_number,
        'name' : user_name,
    };
    const other_params = {
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(data),
        method : "POST",
    };
    fetch(api_url, other_params)
    .then(function(response) {
        if (response.ok) {
            return true;
        } else {
            throw new Error("Could not reach the API: " + response.statusText);
        }
    })
}

// Get the modal
var modal = document.getElementById("phoneNumberModal");

// Get the button that opens the modal
var share_this_btn = document.getElementById("share-this-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
share_this_btn.onclick = function() {
  modal.style.display = "block";
}

var submit_btn = document.getElementById("submit-btn");
var number_input = document.getElementById("number-input");
var name_input = document.getElementById("name-input");
var modal_title = document.getElementById("modal-title");
submit_btn.onclick = function() {
    submitNumber();
    submit_btn.style.display = "none";
    number_input.style.display = "none";
    name_input.style.display = "none";
    modal_title.innerHTML = "Success! Check your phone for a text.";
    modal_title.style.textAlign = "center";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}