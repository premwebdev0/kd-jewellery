import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const categoryType = params.get("type");

const productGrid = document.getElementById("product-grid");
const heading = document.getElementById("category-heading");
const pageTitle = document.getElementById("page-title");

if (!categoryType) {
    heading.textContent = "Category nahi mili";
} else {
    const niceName = categoryType.charAt(0).toUpperCase() + categoryType.slice(1);
    heading.textContent = niceName + " Collection";
    if (pageTitle) {
        pageTitle.textContent = niceName + " - K.D JEWELLERY";
    }
}

async function loadProducts() {
    const querySnapshot = await getDocs(collection(db, "products"));
    let products = [];
    querySnapshot.forEach((docSnap) => {
        products.push({ id: docSnap.id, ...docSnap.data() });
    });

    const filtered = products.filter(p => p.category === categoryType);

    if (filtered.length === 0) {
        productGrid.innerHTML = "<p>Is category me abhi koi product nahi hai.</p>";
        return;
    }

    productGrid.innerHTML = filtered.map(product => `
        <a href="product.html?type=${categoryType}&id=${product.id}" class="product-card">
            <img src="image/products/${categoryType}/${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Weight: ${product.weight}</p>
        </a>
    `).join("");
}

loadProducts();