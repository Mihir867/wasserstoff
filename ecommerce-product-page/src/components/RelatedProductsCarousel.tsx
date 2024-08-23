/* eslint-disable prettier/prettier */

import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  image: string;
}

const RelatedProductsCarousel = () => {
  const [relatedProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Related Product 1",
      image: "https://via.placeholder.com/200",
    },
    {
      id: 2,
      name: "Related Product 2",
      image: "https://via.placeholder.com/200",
    },
    {
      id: 3,
      name: "Related Product 3",
      image: "https://via.placeholder.com/200",
    },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <div className="flex space-x-4 overflow-x-auto">
        {relatedProducts.map((product) => (
          <div key={product.id} className="w-48 flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="rounded-lg shadow-md w-full mb-2"
            />
            <h3 className="text-center font-semibold">{product.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProductsCarousel;
