import type { StoreData } from "../types/index.js";
import { storeData } from "../data/mockData.js";
import {
  calculateTotalStock,
  calculateAverageRating,
  getStockStatus,
  calculateDiscountedPrice,
  formatSpecifications,
} from "../utils/calculations.js";

export function printReport(data: StoreData): void {
  console.log("Products:");
  console.log();

  for (const product of data.products) {
    const supplier = data.suppliers.find((s) => s.id === product.supplierId);
    const supplierName = supplier ? supplier.name : "Unknown";

    const totalStock = calculateTotalStock(product.id, data.stocks);
    const stockStatus = getStockStatus(totalStock);
    const averageRating = calculateAverageRating(product.id, data.reviews);
    const discountInfo = calculateDiscountedPrice(product, averageRating, data.discountRules);
    const specsFormatted = formatSpecifications(product.specs);

    const ratingText = averageRating === null ? "no reviews" : averageRating.toFixed(2);

    let priceText: string;
    if (discountInfo) {
      const discountedPrice = discountInfo.discountedPrice.toFixed(2);
      priceText = `${product.price.toFixed(2)} -> ${discountedPrice}`;
    } else {
      priceText = product.price.toFixed(2);
    }

    console.log(
      `  - ${product.name} [${product.id}] | ${product.category} | supplier: ${supplierName} | available: ${totalStock} (${stockStatus}) | rating: ${ratingText} | ${specsFormatted ? `specs: ${specsFormatted} | ` : ""}price: ${priceText}`,
    );
  }
}

const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
const env =
  typeof globalThis !== "undefined"
    ? (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env
    : undefined;
const isTest = env?.NODE_ENV === "test";

if (!isBrowser && !isTest) {
  printReport(storeData);
}
