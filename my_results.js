// Defining async function
async function getapi(link_id, category) {
    // api url
    const url = `https://pludo.app/doost/my_results?link_id=${link_id}&category=${category}`;
    // Storing response
    fetch(url, {
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
params = window.location.href.split("?")[1].replace("#", "").split("&")
let link_id;
let category;
for (let param of params) {
    if (param.includes("link_id")) {
        link_id = param.replace("link_id=", "")
    }
    if (param.includes("category")) {
        category = param.replace("category=", "")
    }
}
getapi(link_id, category);
// Calling that async function
  
// // Function to hide the loader
// function hideloader() {
//     document.getElementById('loading').style.display = 'none';
// }
// Function to define innerHTML for HTML table
function show(data) {
    results = data.products
    page_title = data.page_title
    let row = ``;
    
    // Loop to access all rows 
    for (let r of results) {
        total_usd = r.price.split(" $")[1].replace(",", "")
        reduced_price = (total_usd * 0.90).toFixed(2)

        row += `<div class="col-6 item-container">
                <a href="my_product_page.html?product_id=${r._id}&link_id=${link_id}" class="item-link">
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
    if (page_title) {
        document.getElementById("page-title-user-name").innerHTML = page_title;
    }
    document.getElementById("banner-link").href = `my_index.html?link_id=${link_id}`
    document.getElementById("nav-home-link").href = `my_index.html?link_id=${link_id}`
}