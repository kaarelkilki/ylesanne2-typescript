// Core entity types

export interface Supplier {
  id: string;
  name: string;
  country: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  supplierId: string;
  specs?: Record<string, string>; // Optional key-value pairs
}

export interface Stock {
  productId: string;
  warehouse: string;
  quantity: number;
}

export interface Review {
  productId: string;
  rating: number; // Assuming 1-5 scale
  comment?: string;
}

export interface DiscountRule {
  category: string;
  discountPercentage: number;
  minRating?: number; // Optional: discount applies only if avg rating >= this value
}

// Enum for stock status
export type StockStatus = "OUT" | "LOW" | "IN_STOCK";

// Computed/derived types for reports

export interface ProductReport {
  product: Product;
  supplier: Supplier;
  totalStock: number;
  stockStatus: StockStatus;
  averageRating: number | null; // null if no reviews
  originalPrice: number;
  discountedPrice: number | null; // null if no discount applies
  discountPercentage: number | null;
}

// Store data structure
export interface StoreData {
  products: Product[];
  suppliers: Supplier[];
  stocks: Stock[];
  reviews: Review[];
  discountRules: DiscountRule[];
}
