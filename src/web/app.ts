import type { Product, Stock, StockStatus, StoreData } from "../types/index.js";
import { storeData } from "../data/mockData.js";
import {
  calculateTotalStock,
  getStockStatus as calcStockStatus,
} from "../utils/calculations.js";
import { saveProducts, loadProducts } from "../utils/storage.js";
import { renderProducts, getFormData, showError, showSuccess } from "./dom.js";
import { printReport } from "../console/report.js";

// Application state
let products: Product[] = [];
let stocks: Stock[] = [];
let currentFilter: string = "all";
let currentSort: string = "name";

/**
 * Initialize the application
 */
function init(): void {
  // Load products from LocalStorage or use mock data
  const savedProducts = loadProducts();
  if (savedProducts.length > 0) {
    products = savedProducts;
  } else {
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

  // Initial report from current state
  printReport(getReportData());
}

/**
 * Setup event listeners
 */
function setupEventListeners(): void {
  const form = document.getElementById("add-product-form") as HTMLFormElement;
  const filterSelect = document.getElementById("filter") as HTMLSelectElement;
  const sortSelect = document.getElementById("sort") as HTMLSelectElement;
  const resetBtn = document.getElementById("reset-btn") as HTMLButtonElement;

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
function handleAddProduct(event: Event): void {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const messageContainer = document.getElementById("messages");

  if (!messageContainer) return;

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

  // Refresh console report
  printReport(getReportData());

  // Show success message
  showSuccess("Toode lisatud!", messageContainer);

  // Reset form
  form.reset();
}

/**
 * Handle filter change
 */
function handleFilterChange(event: Event): void {
  const select = event.target as HTMLSelectElement;
  currentFilter = select.value;
  updateDisplay();
}

/**
 * Handle sort change
 */
function handleSortChange(event: Event): void {
  const select = event.target as HTMLSelectElement;
  currentSort = select.value;
  updateDisplay();
}

/**
 * Handle delete product
 */
function handleDeleteProduct(productId: string): void {
  const messageContainer = document.getElementById("messages");

  if (!messageContainer) return;

  // Remove from products
  products = products.filter((p) => p.id !== productId);

  // Save to LocalStorage
  saveProducts(products);

  // Update display
  updateDisplay();

  // Refresh console report
  printReport(getReportData());

  // Show success message
  showSuccess("Toode kustutatud!", messageContainer);
}

/**
 * Handle reset to mock data
 */
function handleReset(): void {
  const messageContainer = document.getElementById("messages");

  if (!messageContainer) return;

  if (confirm("Kas olete kindel, et soovite taastada algandmed?")) {
    products = [...storeData.products];
    stocks = [...storeData.stocks];
    saveProducts(products);
    updateDisplay();
    updateCategoryList();
    showSuccess("Andmed taastatud!", messageContainer);
    printReport(getReportData());
  }
}

function getReportData(): StoreData {
  return {
    ...storeData,
    products: [...products],
    stocks: [...stocks],
  };
}

/**
 * Get stock status for a product
 */
function getProductStockStatus(productId: string): {
  total: number;
  status: StockStatus;
} {
  const total = calculateTotalStock(productId, stocks);
  const status = calcStockStatus(total);
  return { total, status };
}

/**
 * Filter products based on current filter
 */
function filterProducts(products: Product[]): Product[] {
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
function sortProducts(products: Product[]): Product[] {
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
function updateDisplay(): void {
  const container = document.getElementById("products-container");
  if (!container) return;

  // Apply filter and sort
  let displayProducts = filterProducts(products);
  displayProducts = sortProducts(displayProducts);

  // Render products
  renderProducts(
    container,
    displayProducts,
    getProductStockStatus,
    handleDeleteProduct,
  );

  // Update product count
  const countElement = document.getElementById("product-count");
  if (countElement) {
    countElement.textContent = `Tooteid kokku: ${displayProducts.length}`;
  }
}

/**
 * Update category datalist with unique categories from products
 */
function updateCategoryList(): void {
  const datalist = document.getElementById("category-list");
  if (!datalist) return;

  // Get unique categories
  const categories = new Set<string>();
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
} else {
  init();
}
