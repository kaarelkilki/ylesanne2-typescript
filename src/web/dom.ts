import type { Product, StockStatus } from "../types/index.js";

/**
 * Create a product card element
 */
export function createProductCard(
  product: Product,
  stockStatus: StockStatus,
  totalStock: number,
  onDelete?: (productId: string) => void,
): HTMLElement {
  const card = document.createElement("div");
  card.className = "product-card";
  card.dataset.productId = product.id;

  // Stock status class for styling
  card.classList.add(`stock-${stockStatus.toLowerCase()}`);

  const name = document.createElement("h3");
  name.textContent = product.name;

  const category = document.createElement("p");
  category.className = "category";
  category.textContent = `Kategooria: ${product.category}`;

  const price = document.createElement("p");
  price.className = "price";
  price.textContent = `Hind: €${product.price.toFixed(2)}`;

  const stock = document.createElement("p");
  stock.className = "stock";
  stock.textContent = `Laoseis: ${totalStock} tk (${stockStatus})`;

  card.appendChild(name);
  card.appendChild(category);
  card.appendChild(price);
  card.appendChild(stock);

  // Add specs if available
  if (product.specs && Object.keys(product.specs).length > 0) {
    const specs = document.createElement("p");
    specs.className = "specs";
    const specsText = Object.entries(product.specs)
      .map(([key, value]) => `${key}=${value}`)
      .join(", ");
    specs.textContent = `Specs: ${specsText}`;
    card.appendChild(specs);
  }

  // Add delete button if handler provided
  if (onDelete) {
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Kustuta";
    deleteBtn.onclick = () => onDelete(product.id);
    card.appendChild(deleteBtn);
  }

  return card;
}

/**
 * Render products to container
 */
export function renderProducts(
  container: HTMLElement,
  products: Product[],
  getStockStatus: (productId: string) => {
    total: number;
    status: StockStatus;
  },
  onDelete?: (productId: string) => void,
): void {
  container.innerHTML = "";

  if (products.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-message";
    empty.textContent = "Tooteid ei leitud";
    container.appendChild(empty);
    return;
  }

  products.forEach((product) => {
    const { total, status } = getStockStatus(product.id);
    const card = createProductCard(product, status, total, onDelete);
    container.appendChild(card);
  });
}

/**
 * Get form data as Product object with quantity and specs
 * Returns null if validation fails
 */
export function getFormData(form: HTMLFormElement): {
  product: Product;
  quantity: number;
} | null {
  const formData = new FormData(form);

  const name = formData.get("name") as string;
  const priceStr = formData.get("price") as string;
  const category = formData.get("category") as string;
  const supplierId = formData.get("supplierId") as string;
  const quantityStr = formData.get("quantity") as string;

  // Validation
  if (!name || !category || !supplierId || !priceStr || !quantityStr) {
    return null;
  }

  const price = parseFloat(priceStr);
  if (isNaN(price) || price < 0) {
    return null;
  }

  const quantity = parseInt(quantityStr, 10);
  if (isNaN(quantity) || quantity < 0) {
    return null;
  }

  // Generate unique ID
  const id = `PROD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Build specs object from form inputs
  const specs: Record<string, string> = {};
  for (let i = 1; i <= 3; i++) {
    const key = (formData.get(`specKey${i}`) as string)?.trim();
    const value = (formData.get(`specValue${i}`) as string)?.trim();
    if (key && value) {
      specs[key] = value;
    }
  }

  const product: Product = {
    id,
    name: name.trim(),
    price,
    category: category.trim(),
    supplierId: supplierId.trim(),
  };

  // Only add specs if there are any
  if (Object.keys(specs).length > 0) {
    product.specs = specs;
  }

  return { product, quantity };
}

/**
 * Show error message
 */
export function showError(message: string, container: HTMLElement): void {
  const error = document.createElement("div");
  error.className = "error-message";
  error.textContent = message;
  container.appendChild(error);

  setTimeout(() => {
    error.remove();
  }, 3000);
}

/**
 * Show success message
 */
export function showSuccess(message: string, container: HTMLElement): void {
  const success = document.createElement("div");
  success.className = "success-message";
  success.textContent = message;
  container.appendChild(success);

  setTimeout(() => {
    success.remove();
  }, 3000);
}
