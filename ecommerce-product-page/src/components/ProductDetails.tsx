import React, { useEffect, useState } from "react";
import Slider from "react-slick";

interface Vendor {
  name: string;
  price: number;
}

interface ProductData {
  id: number;
  name: string;
  description: string;
  images: string[];
  status: "In Stock" | "Low Stock" | "Out of Stock";
  vendors: Vendor[];
}

const Product: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVendor, setSelectedVendor] = useState(0);
  const [product, setProduct] = useState<ProductData | null>(null); // Use null as initial state

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      // Assuming you want the first product for display
      if (data.length > 0) {
        setProduct(data[0]); // Set the first product
      }
    };

    fetchProducts();
  }, []);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value)); // Ensure quantity is at least 1
    setQuantity(value);
  };

  const handleVendorChange = (index: number) => {
    setSelectedVendor(index);
  };

  // Slick carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (!product) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Product Images Carousel */}
      <div className="mb-8">
        <Slider {...settings}>
          {product.images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Product image ${index + 1}`}
                className="w-full h-96 object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Real-Time Inventory Status */}
      <div className="mb-4 text-xl font-semibold">
        Inventory Status:{" "}
        <span
          className={`${
            product.status === "In Stock"
              ? "text-green-500"
              : product.status === "Low Stock"
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          {product.status}
        </span>
      </div>

      {/* Price Comparison */}
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Price Comparison:</h3>
        <ul>
          {product.vendors.map((vendor, index) => (
            <li
              key={index}
              className={`cursor-pointer p-2 rounded-md ${
                selectedVendor === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-black"
              }`}
              onClick={() => handleVendorChange(index)}
            >
              {vendor.name}: ${vendor.price}
            </li>
          ))}
        </ul>
      </div>

      {/* Quantity Selector */}
      <div className="mb-4">
        <label htmlFor="quantity" className="block mb-2">
          Quantity:
        </label>
        <input
          type="number"
          id="quantity"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-20 p-2 border rounded-md"
        />
      </div>

      {/* Real-Time Price Update */}
      <div className="text-lg font-semibold">
        Total Price: ${product.vendors[selectedVendor].price * quantity}
      </div>
    </div>
  );
};

export default Product;