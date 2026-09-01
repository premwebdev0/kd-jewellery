// URL se category naam nikalo, jaise category.html?type=necklace
const params = new URLSearchParams(window.location.search);
const categoryType = params.get("type");

const productGrid = document.getElementById("product-grid");
const heading = document.getElementById("category-heading");
const pageTitle = document.getElementById("page-title");

if (!categoryType) {
    heading.textContent = "Category nahi mili";
} else {
    // Heading ko sundar banane ke liye pehla letter capital
    const niceName = categoryType.charAt(0).toUpperCase() + categoryType.slice(1);
    heading.textContent = niceName + " Collection";
    pageTitle.textContent = niceName + " - K.D JEWELLERY";
}

// ===============================
// LOAD PRODUCTS (isi category ke)
// ===============================

fetch("data/products.json")
    .then(response => response.json())
    .then(products => {

        const filtered = products.filter(
            product => product.category.trim().toLowerCase() === categoryType
        );

        if (filtered.length === 0) {
            productGrid.innerHTML = "<p>Is category me abhi koi product nahi hai.</p>";
            return;
        }

       productGrid.innerHTML = filtered.map(product => `
    <a href="product.html?type=${categoryType}&id=${product.id}" class="product-card">
        <img 
            src="image/products/${categoryType}/${product.image}" 
            alt="${product.name}"
        >
        <h3>${product.name}</h3>
        <p>Weight: ${product.weight}</p>
    </a>
`).join("");

    })
    .catch(error => {
        console.error("Error loading products:", error);
        productGrid.innerHTML = "<p>Products load nahi ho paaye.</p>";
    });

