"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Sample data
const products = [
    { id: 1, name: "Product 1", description: "Description for Product 1", price: 9.99 },
    { id: 2, name: "Product 2", description: "Description for Product 2", price: 14.99 },
];
const reviews = [
    { id: 1, productId: 1, rating: 4, comment: "Great product!" },
    { id: 2, productId: 1, rating: 3, comment: "Average product." },
];
const relatedProducts = [
    { id: 1, productId: 1, relatedProductId: 2 },
];
// Routes
app.get('/api/products', (req, res) => {
    res.json(products);
});
app.get('/api/reviews/:productId', (req, res) => {
    const { productId } = req.params;
    const productReviews = reviews.filter(review => review.productId === parseInt(productId));
    res.json(productReviews);
});
app.get('/api/related-products/:productId', (req, res) => {
    const { productId } = req.params;
    const related = relatedProducts.filter(rp => rp.productId === parseInt(productId));
    res.json(related);
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
