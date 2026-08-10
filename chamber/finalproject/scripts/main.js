const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-navigation");
const currentYear = document.querySelector("#current-year");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = menuButton.getAttribute("aria-expanded") === "true";

        menuButton.setAttribute("aria-expanded", String(!isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Open navigation menu" : "Close navigation menu"
        );

        navigation.classList.toggle("open");
    });
}

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


const featuredProductsContainer =
    document.querySelector("#featured-products");

    async function loadFeaturedProducts() {
    try {
        const response = await fetch("data/products.json");

        if (!response.ok) {
            throw new Error("Unable to load featured products.");
        }

        const products = await response.json();

       const featuredProducts = [
    products[0],
    products[3],
    products[2]
];

displayFeaturedProducts(featuredProducts);
    } catch (error) {
        console.error("Error loading featured products:", error);
    }
}
loadFeaturedProducts();

function displayFeaturedProducts(products) {
    featuredProductsContainer.innerHTML = "";

    products.forEach((product) => {
        const card = document.createElement("article");

        card.classList.add("featured-product-card");

        card.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >

            <div class="featured-product-content">
                <p class="product-category">
                    ${product.category === "food-flask"
                        ? "Food Flask"
                        : "Vacuum Bottle"}
                </p>

                <h3>${product.name}</h3>

                <p>
                    <strong>Capacity:</strong>
                    ${product.capacity}
                </p>

                <p>
                    <strong>Price:</strong>
                    AOA ${product.price.toLocaleString()}
                </p>
            </div>
        `;

        featuredProductsContainer.appendChild(card);
    });
}
const valueCards = document.querySelectorAll(".value-card");

valueCards.forEach((card) => {
    card.addEventListener("click", () => {
        card.classList.toggle("active");
    });
});