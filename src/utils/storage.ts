import type { Product } from "../types/index.js";

const STORAGE_KEY = "products";

/**
 * Save products to LocalStorage
 */
export function saveProducts(products: Product[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error("Failed to save products to LocalStorage:", error);
  }
}

/**
 * Load products from LocalStorage
 * Returns empty array if no data exists or on error
 */
export function loadProducts(): Product[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return [];
    }
    return JSON.parse(data) as Product[];
  } catch (error) {
    console.error("Failed to load products from LocalStorage:", error);
    return [];
  }
}

/**
 * Clear all products from LocalStorage
 */
export function clearProducts(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear products from LocalStorage:", error);
  }
}
