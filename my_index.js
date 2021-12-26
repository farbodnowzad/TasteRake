function show(link_id) {
    category_links = document.getElementsByClassName("category-link")
    for (let category_link of category_links) {
        console.log(category_link.outerHTML)
        category_link.setAttribute("href", category_link.href + `&link_id=${link_id}`);
    }
    document.getElementById("banner-link").href = `my_index.html?link_id=${link_id}`
    document.getElementsByClassName("nav-home")[0].href = `my_index.html?link_id=${link_id}`
}

link_id = window.location.href.split("?link_id=")[1].replace("#", "")
show(link_id);