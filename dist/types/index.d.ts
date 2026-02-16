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
    specs?: Record<string, string>;
}
export interface Stock {
    productId: string;
    warehouse: string;
    quantity: number;
}
export interface Review {
    productId: string;
    rating: number;
    comment?: string;
}
export interface DiscountRule {
    category: string;
    discountPercentage: number;
    minRating?: number;
}
export type StockStatus = "OUT" | "LOW" | "IN_STOCK";
export interface ProductReport {
    product: Product;
    supplier: Supplier;
    totalStock: number;
    stockStatus: StockStatus;
    averageRating: number | null;
    originalPrice: number;
    discountedPrice: number | null;
    discountPercentage: number | null;
}
export interface StoreData {
    products: Product[];
    suppliers: Supplier[];
    stocks: Stock[];
    reviews: Review[];
    discountRules: DiscountRule[];
}
//# sourceMappingURL=index.d.ts.map