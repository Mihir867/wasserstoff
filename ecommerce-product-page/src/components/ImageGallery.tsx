import React, { useState } from 'react';
import { BentoGrid, BentoGridItem } from "./bentogrid";

const ImageGallery = () => {
  const [zoomed, setZoomed] = useState<number | null>(null);
  const items = [
    {
      image: "https://images.pexels.com/photos/1141853/pexels-photo-1141853.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      image: "https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      image: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      image: "https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      image: "https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      image: "https://images.pexels.com/photos/1609440/pexels-photo-1609440.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      image: "https://images.pexels.com/photos/242261/pexels-photo-242261.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];
  return (
    <>
    
    <h2 className="text-3xl font-bold mb-4 p-8">Image Gallery</h2>
<BentoGrid className="max-w-4xl mx-auto">
{items.map((item, i) => (
  <BentoGridItem
    key={i}
    image={item.image}
    
    className={i === 3 || i === 6 ? "md:col-span-2" : ""}
    onMouseEnter={() => setZoomed(i)}
            onMouseLeave={() => setZoomed(null)}
  />
))}
</BentoGrid>
</>
  );
};

export default ImageGallery;
