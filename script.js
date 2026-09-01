// ---------- Hero button: Explore Collection click ----------
function showMessage() {
    document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
}

// ---------- Product ke "View Product" button click ----------
function addToCart(productName) {
    alert(productName + " enquiry list mein add ho gaya! Neeche diye WhatsApp button se hume seedha message bhi kar sakte hain.");
}

// ---------- Calculator ka logic ----------
function calculateGold() {
    const weight = document.getElementById('weight').value;
    const goldRatePerGram = 7000; // abhi hardcoded hai, baad mein live rate se badlenge

    if (!weight || weight <= 0) {
        document.getElementById('result').textContent = "Sahi weight daaliye";
        return;
    }

    const totalPrice = weight * goldRatePerGram;
    document.getElementById('result').textContent = "Total Price: ₹" + totalPrice.toLocaleString('en-IN');
}

// ---------- Category filter buttons ----------
const categoryButtons = document.querySelectorAll(".categories button");
const products = document.querySelectorAll(".product-card");

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        products.forEach(product => {
            if (filter === "all" || product.classList.contains(filter)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    });
});
// ---------- Scroll animations ----------
document.querySelectorAll("section").forEach(section => {
    section.classList.add("fade-in-section");
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".fade-in-section").forEach(section => {
    observer.observe(section);
});
// ---------- Staggered card entrance ----------
document.querySelectorAll(".category-card, .product-card").forEach((card, index) => {
    card.style.animationDelay = (index * 0.08) + "s";
});