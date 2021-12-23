// Defining async function
async function getapi(product_id) {
    // api url
    const api_url = `http://127.0.0.1:5000/doost/product?id=${product_id}`;
    // Storing response
    fetch(api_url, {
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        show(data);
    })
    .then(() => {
        showSlides(slideIndex);
    });
    // if (response) {
    //     hideloader();
    // }
}
// Calling that async function
product_id = window.location.href.split("?id=")[1].replace("#", "")
var slideIndex = 1;
getapi(product_id);

function submitNumber() {
    phone_number = document.getElementById('number-input').value

    const api_url = `http://127.0.0.1:5000/doost/link`;
    const data = {
        'product_id' : product_id,
        'phone_number' : phone_number,
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

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    console.log(slides.length)
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}
  
function show(data) {
    item = data.response
    let slideshow = ``;
    
    // Loop to access all rows 
    images = item.images
    for (let image of images) {
        console.log(image)
        slideshow += `<div class="mySlides fading">
                <img src="${image}">
                </div>`;
    }

    total_usd = item.price.split(" $")[1]
    reduced_price = (total_usd * 0.90).toFixed(2)

    info = `${item.brand}<br>
    <span class="product-title">${item.title}</span><br>
    US $${reduced_price} <s>${item.price}</s> <span class="discount">10% Off Exclusive</span>`
    
    earnings = (reduced_price * 0.10).toFixed(2)
    earnings = 'US $' + earnings
    
    product_details = `<span class="product-details-title"><b>Product Details</b><br></span>`
    product_details_texts = item.product_details
    for (let detail of product_details_texts) {
        product_details += `${detail}<br><br>`;
    }
    url = item.url;
    // Setting innerHTML as tab variable
    document.getElementById("slideshow-container").innerHTML = slideshow;
    document.getElementById("product-description").innerHTML = info;
    document.getElementById("product-details").innerHTML = product_details;
    document.getElementById("you-earn").innerHTML = earnings;
    document.getElementById("view-on-goop").href = url;
}

// Get the modal
var modal = document.getElementById("phoneNumberModal");

// Get the button that opens the modal
var btn = document.getElementById("share-this-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

var submit_btn = document.getElementById("submit-btn");
submit_btn.onclick = function() {
    submitNumber();
    modal.style.display = "none";
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