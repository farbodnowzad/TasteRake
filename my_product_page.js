async function getapi(product_id, link_id) {
    const api_url = `https://pludo.app/doost/product?product_id=${product_id}&link_id=${link_id}`;
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

async function create_checkout_session(link_id) {
    const api_url = `https://pludo.app/doost/create-checkout-session?link_id=${link_id}`;
    // Storing response
    fetch(api_url, {
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        return data
    })
}

// Calling that async function
params = window.location.href.split("?")[1].replace("#", "").split("&")
let product_id;
let link_id;
for (let param of params) {
    if (param.includes("product_id")) {
        product_id = param.replace("product_id=", "")
    }
    if (param.includes("link_id")) {
        link_id = param.replace("link_id=", "")
    }
}
var slideIndex = 1;
getapi(product_id, link_id);

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
    item = data.product
    page_title = data.page_title
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
    document.getElementById("banner-link").href = `my_index.html?link_id=${link_id}`
    document.getElementById("slideshow-container").innerHTML = slideshow;
    document.getElementById("product-description").innerHTML = info;
    document.getElementById("product-details").innerHTML = product_details;
    document.getElementById("view-on-goop").href = url;
    if (!page_title) {
        document.getElementById("page-title-user-name").innerHTML = page_title;
    }
}

// Get the button that opens the modal
var buy_btn = document.getElementById("buy-btn");
buy_btn.onclick = function() {
    create_checkout_session(link_id)
}