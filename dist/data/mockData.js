export const storeData = {
    suppliers: [
        { id: "S1", name: "Nordic Devices", country: "Estonia" },
        { id: "S2", name: "Euro Accessories", country: "Germany" },
        { id: "S3", name: "Baltic Books", country: "Latvia" },
    ],
    products: [
        {
            id: "LAP-DEL-XPS15",
            name: "Dell XPS 15",
            price: 1299.99,
            category: "Electronics",
            supplierId: "S1",
            specs: {
                cpu: "Intel i7",
                ram: "16",
                storage: "512",
                weight: "1.8",
            },
        },
        {
            id: "ACC-LOG-MX3",
            name: "Logitech MX Master 3S",
            price: 99.5,
            category: "Accessories",
            supplierId: "S2",
        },
        {
            id: "BOOK-TS-BASICS",
            name: "TypeScript for Beginners",
            price: 39.9,
            category: "Books",
            supplierId: "S3",
            specs: {
                pages: "320",
                language: "EN",
            },
        },
        {
            id: "ACC-USB-C-HUB",
            name: "USB-C Hub 8-in-1",
            price: 59.0,
            category: "Accessories",
            supplierId: "S2",
            specs: {
                ports: "8",
                usbVersion: "USB 3.2",
            },
        },
    ],
    stocks: [
        // Dell XPS 15 - total: 3 (IN_STOCK)
        { productId: "LAP-DEL-XPS15", warehouse: "Tallinn", quantity: 2 },
        { productId: "LAP-DEL-XPS15", warehouse: "Tartu", quantity: 1 },
        // Logitech MX Master 3S - total: 9 (IN_STOCK)
        { productId: "ACC-LOG-MX3", warehouse: "Tallinn", quantity: 5 },
        { productId: "ACC-LOG-MX3", warehouse: "Tartu", quantity: 4 },
        // TypeScript for Beginners - total: 1 (LOW)
        { productId: "BOOK-TS-BASICS", warehouse: "Tallinn", quantity: 1 },
        // USB-C Hub 8-in-1 - total: 0 (OUT)
        { productId: "ACC-USB-C-HUB", warehouse: "Tallinn", quantity: 0 },
        { productId: "ACC-USB-C-HUB", warehouse: "Tartu", quantity: 0 },
    ],
    reviews: [
        // Dell XPS 15 - avg: 4.50
        { productId: "LAP-DEL-XPS15", rating: 5 },
        { productId: "LAP-DEL-XPS15", rating: 4 },
        // Logitech MX Master 3S - avg: 4.67
        { productId: "ACC-LOG-MX3", rating: 5 },
        { productId: "ACC-LOG-MX3", rating: 5 },
        { productId: "ACC-LOG-MX3", rating: 4 },
        // TypeScript for Beginners - avg: 3.00
        { productId: "BOOK-TS-BASICS", rating: 3 },
        { productId: "BOOK-TS-BASICS", rating: 3 },
        // USB-C Hub 8-in-1 - no reviews
    ],
    discountRules: [
        {
            category: "Electronics",
            discountPercentage: 10,
            minRating: 4.0,
        },
        {
            category: "Accessories",
            discountPercentage: 15,
            minRating: 4.5,
        },
        // No discount for Books
    ],
};
//# sourceMappingURL=mockData.js.map