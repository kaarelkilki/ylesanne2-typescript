import type { Product, StockStatus } from "../types/index.js";
/**
 * Create a product card element
 */
export declare function createProductCard(product: Product, stockStatus: StockStatus, totalStock: number, onDelete?: (productId: string) => void): HTMLElement;
/**
 * Render products to container
 */
export declare function renderProducts(container: HTMLElement, products: Product[], getStockStatus: (productId: string) => {
    total: number;
    status: StockStatus;
}, onDelete?: (productId: string) => void): void;
/**
 * Get form data as Product object with quantity and specs
 * Returns null if validation fails
 */
export declare function getFormData(form: HTMLFormElement): {
    product: Product;
    quantity: number;
} | null;
/**
 * Show error message
 */
export declare function showError(message: string, container: HTMLElement): void;
/**
 * Show success message
 */
export declare function showSuccess(message: string, container: HTMLElement): void;
//# sourceMappingURL=dom.d.ts.map