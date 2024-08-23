import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample Data
const products = [
  {
    id: 1,
    name: "Product 1",
    description: "Description for Product 1",
    price: 9.99,
    images: [
      "https://cdn.pixabay.com/photo/2019/02/09/18/41/camera-3985711_1280.jpg",
      "https://cdn.pixabay.com/photo/2015/06/24/13/32/camera-820018_1280.jpg",
      "https://cdn.pixabay.com/photo/2021/01/22/16/55/camera-5940588_1280.jpg",
    ],
    status: "In Stock", // Options: 'In Stock', 'Low Stock', 'Out of Stock'
    vendors: [
      { name: "Vendor 1", price: 50 },
      { name: "Vendor 2", price: 55 },
      { name: "Vendor 3", price: 52 },
    ],
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description for Product 2",
    price: 14.99,
    images: [
      "https://cdn.pixabay.com/photo/2019/02/09/18/41/camera-3985711_1280.jpg",
      "https://cdn.pixabay.com/photo/2015/06/24/13/32/camera-820018_1280.jpg",
      "https://cdn.pixabay.com/photo/2021/01/22/16/55/camera-5940588_1280.jpg",
    ],
    status: "Low Stock",
    vendors: [
      { name: "Vendor 1", price: 50 },
      { name: "Vendor 2", price: 55 },
      { name: "Vendor 3", price: 52 },
    ],
  },
];

const reviews = [
  { id: 1, productId: 1, rating: 4, comment: "Great product!", userImage: "https://via.placeholder.com/50", date: "2024-01-01" },
  { id: 2, productId: 1, rating: 3, comment: "Average product.", userImage: "https://via.placeholder.com/50", date: "2024-01-02" },
];

const relatedProducts = [
  {
    id: 1,
    name: "Related Product 1",
    image: "https://images.pexels.com/photos/90950/pexels-photo-90950.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Related Product 2",
    image: "https://images.pexels.com/photos/2350074/pexels-photo-2350074.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Related Product 3",
    image: "https://images.pexels.com/photos/1855349/pexels-photo-1855349.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 1,
    name: "Related Product 4",
    image: "https://images.pexels.com/photos/1855349/pexels-photo-1855349.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 1,
    name: "Related Product 5",
    image: "https://images.pexels.com/photos/2350074/pexels-photo-2350074.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
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
  const related = relatedProducts.filter(rp => rp.id === parseInt(productId));
  res.json(related);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});