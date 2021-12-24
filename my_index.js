// Defining async function
async function getapi(link_id) {
    // api url
    const url = `https://pludo.app/doost/my_index?link_id=${link_id}`;
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
link_id = window.location.href.split("?link_id=")[1].replace("#", "")
getapi(link_id);
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
        total_usd = r.price.split(" $")[1]
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
}