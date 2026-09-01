const params = new URLSearchParams(window.location.search);
const categoryType = params.get("type");
const productId = Number(params.get("id"));

document.getElementById("back-link").href = `category.html?type=${categoryType}`;

fetch("data/products.json")
    .then(response => response.json())
    .then(products => {

        const product = products.find(item => item.id === productId);

        if (!product) {
            document.getElementById("product-page").innerHTML = "<p>Product nahi mila.</p>";
            return;
        }

        document.getElementById("page-title").textContent = product.name + " - K.D JEWELLERY";
        document.getElementById("product-image").src = `image/products/${categoryType}/${product.image}`;
        document.getElementById("product-name").textContent = product.name;
        document.getElementById("product-metal").textContent = product.metal;
        document.getElementById("product-purity").textContent = product.purity;
        document.getElementById("product-weight").textContent = product.weight;
        document.getElementById("product-occasion").textContent = product.occasion;
        document.getElementById("product-description").textContent = product.description;

        // Related products
        const related = products
            .filter(item => item.category === categoryType && item.id !== productId)
            .slice(0, 6);

        document.getElementById("related-products").innerHTML = related.map(item => `
            <a href="product.html?type=${categoryType}&id=${item.id}" class="related-card">
                <img src="image/products/${categoryType}/${item.image}" alt="${item.name}">
                <p>${item.name}</p>
            </a>
        `).join("");

        window.currentProduct = product;
    })
    .catch(error => console.error("Error loading product:", error));

function enquireWhatsApp() {
    const name = window.currentProduct ? window.currentProduct.name : "product";
    const message = encodeURIComponent(`Hi, mujhe "${name}" ke baare me jaankari chahiye.`);
    window.open(`https://wa.me/919399231265?text=${message}`, "_blank");
}