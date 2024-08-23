import React, { useEffect } from "react";
import "./App.css";
import ProductDetails from "./components/ProductDetails";
import CustomerReviews from "./components/CustomerReviews";
import RelatedProductsCarousel from "./components/RelatedProductsCarousel";
import ImageGallery from "./components/ImageGallery";
import { AppDispatch } from '../src/redux/store'; // Import AppDispatch type
import { useDispatch } from "react-redux";
import { fetchProductDetails } from "./redux/slices/productSlice";
import { fetchReviews } from "./redux/slices/reviewSlice";
import { fetchRelatedProducts } from "./redux/slices/relatedProductSlice";

function App() {

  const productId = 1;
  
  const dispatch: AppDispatch = useDispatch(); 
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProductDetails(productId));
      await dispatch(fetchReviews(productId));
      await dispatch(fetchRelatedProducts(productId));
    };

    fetchData();
  }, [dispatch, productId]);
  return (
    <>
    
      <div className="max-w-6xl mx-auto p-4">
        <ProductDetails />
        <CustomerReviews productId={productId} />
        <RelatedProductsCarousel />
        <ImageGallery />
      </div>
    
    </>
  );
}

export default App;
