const dialogMaterial = document.querySelector("#dialog-material");
const dialogRetention = document.querySelector("#dialog-retention");
const productGrid = document.querySelector("#product-grid");
const productStatus = document.querySelector("#product-status");
const categoryFilter = document.querySelector("#category-filter");
const searchInput = document.querySelector("#product-search");

let products = [];

async function getProducts() {
    try {
        const response = await fetch("data/products.json");

        if (!response.ok) {
            throw new Error("Unable to load product data.");
        }

        products = await response.json();

        productStatus.textContent = "";
        displayProducts(products);
    } catch (error) {
        console.error("Error loading products:", error);

        productStatus.textContent =
            "Sorry, the products could not be loaded.";
    }
}

function displayProducts(productList) {
    productGrid.innerHTML = "";

    if (productList.length === 0) {
        productStatus.textContent =
            "No products match your search.";
        return;
    }

    productStatus.textContent = "";

    productList.forEach((product) => {
        const productCard = document.createElement("article");

        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >

            <div class="product-card-content">
                <p class="product-category">
                    ${
                        product.category === "food-flask"
                            ? "Food Flask"
                            : "Vacuum Bottle"
                    }
                </p>

                <h3>${product.name}</h3>

                <p>
                    <strong>Capacity:</strong>
                    ${product.capacity}
                </p>

                <p>
                    <strong>Color:</strong>
                    ${product.color}
                </p>
                <p>
    <strong>Price:</strong>
    AOA ${product.price.toLocaleString()}
</p>
               
    

                <button
                    type="button"
                    class="product-details-button"
                    data-id="${product.id}"
                >
                    View Details
                </button>
            </div>
        `;

        productGrid.appendChild(productCard);
    });
}

function openProductDialog(productId) {
    const product = products.find(
        (item) => item.id === Number(productId)
    );

    if (!product) {
        return;
    }

    const productDialog = document.querySelector("#product-dialog");
    const dialogImage = document.querySelector("#dialog-image");
    const dialogCategory = document.querySelector("#dialog-category");
    const dialogTitle = document.querySelector("#dialog-title");
    const dialogDescription = document.querySelector("#dialog-description");
    const dialogCapacity = document.querySelector("#dialog-capacity");
    const dialogColor = document.querySelector("#dialog-color");
    const dialogPrice = document.querySelector("#dialog-price");

    dialogImage.src = product.image;
    dialogImage.alt = product.name;

    dialogCategory.textContent =
        product.category === "food-flask"
            ? "Food Flask"
            : "Vacuum Bottle";

    dialogTitle.textContent = product.name;

    dialogDescription.textContent =
       ` Explore the ${product.name} from the ELMAVID collection.`;

    dialogCapacity.textContent = product.capacity;
    dialogColor.textContent = product.color;
    dialogMaterial.textContent = product.material;
    dialogRetention.textContent = product.retention;

    dialogPrice.textContent =
        `AOA ${product.price.toLocaleString()}`;

    productDialog.showModal();
}

productGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".product-details-button");

    if (!button) {
        return;
    }

    openProductDialog(button.dataset.id);
});

const productDialog = document.querySelector("#product-dialog");
const closeDialog = document.querySelector("#close-dialog");

closeDialog.addEventListener("click", () => {
    productDialog.close();
});

function filterProducts() {
    const selectedCategory = categoryFilter.value;
    const searchTerm = searchInput.value
        .toLowerCase()
        .trim();

    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(searchTerm) ||
            product.color
                .toLowerCase()
                .includes(searchTerm) ||
            product.capacity
                .toLowerCase()
                .includes(searchTerm);

        return matchesCategory && matchesSearch;
    });

    displayProducts(filteredProducts);
}

categoryFilter.addEventListener(
    "change",
    filterProducts
);

searchInput.addEventListener(
    "input",
    filterProducts
);

getProducts();