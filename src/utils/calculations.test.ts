import { describe, expect, it } from "vitest";

import {
  calculateAverageRating,
  calculateDiscountedPrice,
  calculateTotalStock,
  getStockStatus,
} from "./calculations.js";

import type { DiscountRule, Product, Review, Stock } from "../types/index.js";

describe("calculateTotalStock", () => {
  it("sums stock quantities for a product", () => {
    const stocks: Stock[] = [
      { productId: "P1", warehouse: "A", quantity: 2 },
      { productId: "P1", warehouse: "B", quantity: 3 },
      { productId: "P2", warehouse: "A", quantity: 10 },
    ];

    expect(calculateTotalStock("P1", stocks)).toBe(5);
  });

  it("returns 0 when product has no stock entries", () => {
    const stocks: Stock[] = [{ productId: "P2", warehouse: "A", quantity: 10 }];

    expect(calculateTotalStock("P1", stocks)).toBe(0);
  });

  it("returns 0 for empty stocks array", () => {
    expect(calculateTotalStock("P1", [])).toBe(0);
  });

  it("includes negative quantities in the sum", () => {
    const stocks: Stock[] = [
      { productId: "P1", warehouse: "A", quantity: 5 },
      { productId: "P1", warehouse: "B", quantity: -2 },
    ];

    expect(calculateTotalStock("P1", stocks)).toBe(3);
  });
});

describe("calculateAverageRating", () => {
  it("returns average rating for a product", () => {
    const reviews: Review[] = [
      { productId: "P1", rating: 5 },
      { productId: "P1", rating: 3 },
      { productId: "P2", rating: 4 },
    ];

    expect(calculateAverageRating("P1", reviews)).toBe(4);
  });

  it("returns null when product has no reviews", () => {
    const reviews: Review[] = [{ productId: "P2", rating: 4 }];

    expect(calculateAverageRating("P1", reviews)).toBeNull();
  });

  it("returns null for empty reviews array", () => {
    expect(calculateAverageRating("P1", [])).toBeNull();
  });

  it("averages negative ratings without validation", () => {
    const reviews: Review[] = [
      { productId: "P1", rating: -1 },
      { productId: "P1", rating: 3 },
    ];

    expect(calculateAverageRating("P1", reviews)).toBe(1);
  });
});

describe("getStockStatus", () => {
  it("returns OUT for zero stock", () => {
    expect(getStockStatus(0)).toBe("OUT");
  });

  it("returns LOW for stock of 1 or 2", () => {
    expect(getStockStatus(1)).toBe("LOW");
    expect(getStockStatus(2)).toBe("LOW");
  });

  it("returns IN_STOCK for stock 3 or higher", () => {
    expect(getStockStatus(3)).toBe("IN_STOCK");
    expect(getStockStatus(10)).toBe("IN_STOCK");
  });

  it("returns LOW for negative stock values", () => {
    expect(getStockStatus(-1)).toBe("LOW");
  });
});

describe("calculateDiscountedPrice", () => {
  const product: Product = {
    id: "P1",
    name: "Phone",
    price: 100,
    category: "Electronics",
    supplierId: "S1",
  };

  const rules: DiscountRule[] = [
    { category: "Electronics", discountPercentage: 10, minRating: 4 },
    { category: "Accessories", discountPercentage: 20, minRating: 4.5 },
  ];

  it("returns discounted price when rule exists and rating meets min", () => {
    const result = calculateDiscountedPrice(product, 4.2, rules);

    expect(result).toEqual({ discountedPrice: 90, discountPercentage: 10 });
  });

  it("returns null when no rule exists for category", () => {
    const otherProduct: Product = { ...product, category: "Books" };

    expect(calculateDiscountedPrice(otherProduct, 5, rules)).toBeNull();
  });

  it("returns null when rating is null and rule requires minRating", () => {
    expect(calculateDiscountedPrice(product, null, rules)).toBeNull();
  });

  it("returns null when rating is below minRating", () => {
    expect(calculateDiscountedPrice(product, 3.5, rules)).toBeNull();
  });

  it("returns discount even when no minRating is set", () => {
    const noMinRule: DiscountRule[] = [{ category: "Electronics", discountPercentage: 5 }];

    const result = calculateDiscountedPrice(product, null, noMinRule);

    expect(result).toEqual({ discountedPrice: 95, discountPercentage: 5 });
  });

  it("returns null when discount rules list is empty", () => {
    expect(calculateDiscountedPrice(product, 5, [])).toBeNull();
  });

  it("supports a 0% discount without changing price", () => {
    const zeroRule: DiscountRule[] = [{ category: "Electronics", discountPercentage: 0 }];

    const result = calculateDiscountedPrice(product, 5, zeroRule);

    expect(result).toEqual({ discountedPrice: 100, discountPercentage: 0 });
  });
});
