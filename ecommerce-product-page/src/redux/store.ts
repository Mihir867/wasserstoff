// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import reviewReducer from './slices/reviewSlice';
import relatedProductReducer from './slices/relatedProductSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    review: reviewReducer,
    relatedProduct: relatedProductReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;