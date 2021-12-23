
// api url
const api_url = "http://127.0.0.1:5000/doost/products";
  
// Defining async function
async function getapi(url) {
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
getapi(api_url);
  
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
        row += `<div class="col-6 item-container">
                    <a href="product_page.html?id=${r._id}" class="item-link">
                    <div class="img-container">
                        <img
                            src=${r.primary_image}></img>
                    </div>
                    <div class="item-footer">
                        <div class="item-description">
                            ${r.brand}<br>
                            <span class="item-title">${r.title}</span><br>
                            ${r.price}
                        </div>
                    </div>
                </a>
            </div>`;
    }
    // Setting innerHTML as tab variable
    document.getElementById("product_results").innerHTML = row;
}