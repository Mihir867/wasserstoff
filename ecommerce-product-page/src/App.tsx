import React from "react";
import "./App.css";
import ProductDetails from "./components/ProductDetails";
import CustomerReviews from "./components/CustomerReviews";
import RelatedProductsCarousel from "./components/RelatedProductsCarousel";
import ImageGallery from "./components/ImageGallery";

function App() {
  

  const reviews = [
    {
      id: 1,
      rating: 5,
      comment: "Working with Jone was a game-changer for our project! Her keen eye for detail and creative approach to product design elevated our concept beyond our expectations. We look forward to collaborating on future projects.",
      userImage: "path/to/image.jpg",  
      date:"today"
    },
    {
      id: 2,
      rating: 5,
      comment: "Working with Jone was a game-changer for our project! Her keen eye for detail and creative approach to product design elevated our concept beyond our expectations. We look forward to collaborating on future projects.",
      userImage: "path/to/image.jpg",  
      date:"today",
    },{
      id: 3,
      rating: 5,
      comment: "lol",
      userImage: "path/to/image.jpg",  
      date:"today",
    },{
      id: 4,
      rating: 5,
      comment: "here",
      userImage: "path/to/image.jpg",  
      date:"today",
    },{
      id: 5,
      rating: 5,
      comment: "Working with Jone was a game-changer for our project! Her keen eye for detail and creative approach to product design elevated our concept beyond our expectations. We look forward to collaborating on future projects.",
      userImage: "path/to/image.jpg",  
      date:"today",
    },
  ];

  return (
    <>
      <div className="max-w-6xl mx-auto p-4">
        <ProductDetails />
        <CustomerReviews reviews={reviews} />
        <RelatedProductsCarousel />
        <ImageGallery />
      </div>
    </>
  );
}

export default App;
