async function getapi(my_page_id) {
    const api_url = `http://127.0.0.1:5000/doost/my_page?id=${my_page_id}`;
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
my_page_id = window.location.href.split("?id=")[1].replace("#", "")
var slideIndex = 1;
getapi(my_page_id);

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
    document.getElementById("view-on-goop").href = url;
}

// Get the button that opens the modal
var buy_btn = document.getElementById("buy-btn");
buy_btn.onclick = function() {
    
}