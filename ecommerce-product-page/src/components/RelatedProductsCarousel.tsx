import React, { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  image: string;
}

const RelatedProductsCarousel: React.FC = () => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/related-products/1'); // Replace with the current product ID
        const data = await response.json();
        setRelatedProducts(data);
      } catch (error) {
        console.error('Error fetching related products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    // Implement add to cart functionality here
    console.log(`Added ${product.name} to cart`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {relatedProducts.map((product) => (
          <div key={product.id} className="w-48 flex-shrink-0 transition-transform transform">
            <div className="h-48">
              <img
                src={product.image}
                alt={product.name}
                className="rounded-lg object-cover shadow-md w-full h-full transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/200?text=Image+Not+Available';
                }}
              />
            </div>
            <h3 className="text-center font-semibold">{product.name}</h3>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-2 w-full bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600 transition duration-200"
              aria-label={`Add ${product.name} to cart`}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProductsCarousel;