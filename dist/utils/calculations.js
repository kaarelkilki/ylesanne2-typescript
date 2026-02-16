/**
 * Calculate total stock quantity across all warehouses for a product
 */
export function calculateTotalStock(productId, stocks) {
    return stocks
        .filter((stock) => stock.productId === productId)
        .reduce((total, stock) => total + stock.quantity, 0);
}
/**
 * Calculate average rating for a product
 * Returns null if no reviews exist
 */
export function calculateAverageRating(productId, reviews) {
    const productReviews = reviews.filter((review) => review.productId === productId);
    if (productReviews.length === 0) {
        return null;
    }
    const sum = productReviews.reduce((total, review) => total + review.rating, 0);
    return sum / productReviews.length;
}
/**
 * Determine stock status based on total quantity
 * Rules:
 * - 0: OUT
 * - 1-2: LOW
 * - 3+: IN_STOCK
 */
export function getStockStatus(totalStock) {
    if (totalStock === 0) {
        return "OUT";
    }
    else if (totalStock <= 2) {
        return "LOW";
    }
    else {
        return "IN_STOCK";
    }
}
/**
 * Calculate discounted price if discount rule applies
 * Returns null if no discount applies
 */
export function calculateDiscountedPrice(product, averageRating, discountRules) {
    // Find discount rule for this product's category
    const rule = discountRules.find((r) => r.category === product.category);
    if (!rule) {
        return null;
    }
    // Check if minRating requirement is met
    if (rule.minRating !== undefined) {
        if (averageRating === null || averageRating < rule.minRating) {
            return null;
        }
    }
    // Calculate discounted price
    const discountedPrice = product.price * (1 - rule.discountPercentage / 100);
    return {
        discountedPrice,
        discountPercentage: rule.discountPercentage,
    };
}
/**
 * Format specifications as "key=value, key=value, ..."
 */
export function formatSpecifications(specs) {
    if (!specs || Object.keys(specs).length === 0) {
        return null;
    }
    return Object.entries(specs)
        .map(([key, value]) => `${key}=${value}`)
        .join(", ");
}
//# sourceMappingURL=calculations.js.map