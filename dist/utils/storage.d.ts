import type { Product } from "../types/index.js";
/**
 * Save products to LocalStorage
 */
export declare function saveProducts(products: Product[]): void;
/**
 * Load products from LocalStorage
 * Returns empty array if no data exists or on error
 */
export declare function loadProducts(): Product[];
/**
 * Clear all products from LocalStorage
 */
export declare function clearProducts(): void;
//# sourceMappingURL=storage.d.ts.map