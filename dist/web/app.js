import { storeData } from "../data/mockData.js";
import { calculateTotalStock, getStockStatus as calcStockStatus, } from "../utils/calculations.js";
import { saveProducts, loadProducts } from "../utils/storage.js";
import { renderProducts, getFormData, showError, showSuccess } from "./dom.js";
// Application state
let products = [];
let stocks = [];
let currentFilter = "all";
let currentSort = "name";
/**
 * Initialize the application
 */
function init() {
    // Load products from LocalStorage or use mock data
    const savedProducts = loadProducts();
    if (savedProducts.length > 0) {
        products = savedProducts;
    }
    else {
        products = [...storeData.products];
        saveProducts(products);
    }
    // Always use mock stocks for simplicity
    stocks = [...storeData.stocks];
    // Setup event listeners
    setupEventListeners();
    // Initial render
    updateDisplay();
    updateCategoryList();
}
/**
 * Setup event listeners
 */
function setupEventListeners() {
    const form = document.getElementById("add-product-form");
    const filterSelect = document.getElementById("filter");
    const sortSelect = document.getElementById("sort");
    const resetBtn = document.getElementById("reset-btn");
    if (form) {
        form.addEventListener("submit", handleAddProduct);
    }
    if (filterSelect) {
        filterSelect.addEventListener("change", handleFilterChange);
    }
    if (sortSelect) {
        sortSelect.addEventListener("change", handleSortChange);
    }
    if (resetBtn) {
        resetBtn.addEventListener("click", handleReset);
    }
}
/**
 * Handle adding a new product
 */
function handleAddProduct(event) {
    event.preventDefault();
    const form = event.target;
    const messageContainer = document.getElementById("messages");
    if (!messageContainer)
        return;
    const formData = getFormData(form);
    if (!formData) {
        showError("Palun täitke kõik väljad korrektselt", messageContainer);
        return;
    }
    const { product, quantity } = formData;
    // Add to products list
    products.push(product);
    // Add stock entry with specified quantity
    stocks.push({
        productId: product.id,
        warehouse: "Tallinn",
        quantity: quantity,
    });
    // Save to LocalStorage
    saveProducts(products);
    // Update display
    updateDisplay();
    updateCategoryList();
    // Show success message
    showSuccess("Toode lisatud!", messageContainer);
    // Reset form
    form.reset();
}
/**
 * Handle filter change
 */
function handleFilterChange(event) {
    const select = event.target;
    currentFilter = select.value;
    updateDisplay();
}
/**
 * Handle sort change
 */
function handleSortChange(event) {
    const select = event.target;
    currentSort = select.value;
    updateDisplay();
}
/**
 * Handle delete product
 */
function handleDeleteProduct(productId) {
    const messageContainer = document.getElementById("messages");
    if (!messageContainer)
        return;
    // Remove from products
    products = products.filter((p) => p.id !== productId);
    // Save to LocalStorage
    saveProducts(products);
    // Update display
    updateDisplay();
    // Show success message
    showSuccess("Toode kustutatud!", messageContainer);
}
/**
 * Handle reset to mock data
 */
function handleReset() {
    const messageContainer = document.getElementById("messages");
    if (!messageContainer)
        return;
    if (confirm("Kas olete kindel, et soovite taastada algandmed?")) {
        products = [...storeData.products];
        stocks = [...storeData.stocks];
        saveProducts(products);
        updateDisplay();
        updateCategoryList();
        showSuccess("Andmed taastatud!", messageContainer);
    }
}
/**
 * Get stock status for a product
 */
function getProductStockStatus(productId) {
    const total = calculateTotalStock(productId, stocks);
    const status = calcStockStatus(total);
    return { total, status };
}
/**
 * Filter products based on current filter
 */
function filterProducts(products) {
    if (currentFilter === "all") {
        return products;
    }
    if (currentFilter === "in-stock") {
        return products.filter((p) => {
            const { status } = getProductStockStatus(p.id);
            return status === "IN_STOCK";
        });
    }
    if (currentFilter === "low-stock") {
        return products.filter((p) => {
            const { status } = getProductStockStatus(p.id);
            return status === "LOW";
        });
    }
    if (currentFilter === "out-of-stock") {
        return products.filter((p) => {
            const { status } = getProductStockStatus(p.id);
            return status === "OUT";
        });
    }
    // Filter by category
    return products.filter((p) => p.category === currentFilter);
}
/**
 * Sort products based on current sort option
 */
function sortProducts(products) {
    const sorted = [...products];
    switch (currentSort) {
        case "name":
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "price-asc":
            sorted.sort((a, b) => a.price - b.price);
            break;
        case "price-desc":
            sorted.sort((a, b) => b.price - a.price);
            break;
        case "category":
            sorted.sort((a, b) => a.category.localeCompare(b.category));
            break;
        case "stock":
            sorted.sort((a, b) => {
                const stockA = getProductStockStatus(a.id).total;
                const stockB = getProductStockStatus(b.id).total;
                return stockB - stockA;
            });
            break;
    }
    return sorted;
}
/**
 * Update the display with current products, filter and sort
 */
function updateDisplay() {
    const container = document.getElementById("products-container");
    if (!container)
        return;
    // Apply filter and sort
    let displayProducts = filterProducts(products);
    displayProducts = sortProducts(displayProducts);
    // Render products
    renderProducts(container, displayProducts, getProductStockStatus, handleDeleteProduct);
    // Update product count
    const countElement = document.getElementById("product-count");
    if (countElement) {
        countElement.textContent = `Tooteid kokku: ${displayProducts.length}`;
    }
}
/**
 * Update category datalist with unique categories from products
 */
function updateCategoryList() {
    const datalist = document.getElementById("category-list");
    if (!datalist)
        return;
    // Get unique categories
    const categories = new Set();
    products.forEach((product) => {
        if (product.category) {
            categories.add(product.category);
        }
    });
    // Clear and repopulate datalist
    datalist.innerHTML = "";
    categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        datalist.appendChild(option);
    });
}
// Initialize app when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
}
else {
    init();
}
//# sourceMappingURL=app.js.map