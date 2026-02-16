import { storeData } from "../data/mockData.js";
import {
  calculateTotalStock,
  calculateAverageRating,
  getStockStatus,
  calculateDiscountedPrice,
  formatSpecifications,
} from "../utils/calculations.js";

function generateReport() {
  console.log("Products:");
  console.log();

  for (const product of storeData.products) {
    // Find supplier
    const supplier = storeData.suppliers.find(
      (s) => s.id === product.supplierId,
    );
    if (!supplier) continue;

    // Calculate values
    const totalStock = calculateTotalStock(product.id, storeData.stocks);
    const stockStatus = getStockStatus(totalStock);
    const averageRating = calculateAverageRating(product.id, storeData.reviews);
    const discountInfo = calculateDiscountedPrice(
      product,
      averageRating,
      storeData.discountRules,
    );
    const specsFormatted = formatSpecifications(product.specs);

    // Format rating
    const ratingText =
      averageRating === null ? "no reviews" : averageRating.toFixed(2);

    // Format price
    let priceText: string;
    if (discountInfo) {
      const discountedPrice = discountInfo.discountedPrice.toFixed(2);
      priceText = `${product.price.toFixed(2)} -> ${discountedPrice}`;
    } else {
      priceText = product.price.toFixed(2);
    }

    // Build the output
    console.log(
      `  - ${product.name} [${product.id}] | ${product.category} | supplier: ${supplier.name} | available: ${totalStock} (${stockStatus}) | rating: ${ratingText} | ${specsFormatted ? `specs: ${specsFormatted} | ` : ""}price: ${priceText}`,
    );
  }
}

generateReport();
