import type { Stock, Review, DiscountRule, StockStatus, Product } from "../types/index.js";
/**
 * Calculate total stock quantity across all warehouses for a product
 */
export declare function calculateTotalStock(productId: string, stocks: Stock[]): number;
/**
 * Calculate average rating for a product
 * Returns null if no reviews exist
 */
export declare function calculateAverageRating(productId: string, reviews: Review[]): number | null;
/**
 * Determine stock status based on total quantity
 * Rules:
 * - 0: OUT
 * - 1-2: LOW
 * - 3+: IN_STOCK
 */
export declare function getStockStatus(totalStock: number): StockStatus;
/**
 * Calculate discounted price if discount rule applies
 * Returns null if no discount applies
 */
export declare function calculateDiscountedPrice(product: Product, averageRating: number | null, discountRules: DiscountRule[]): {
    discountedPrice: number;
    discountPercentage: number;
} | null;
/**
 * Format specifications as "key=value, key=value, ..."
 */
export declare function formatSpecifications(specs?: Record<string, string>): string | null;
//# sourceMappingURL=calculations.d.ts.map