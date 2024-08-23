// src/redux/slices/productSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/types'; // Assuming you have a types.ts file with the Product interface
import { RootState } from '../store';

export const fetchProductDetails = createAsyncThunk(
  'product/fetchProductDetails',
  async (productId: number) => {
    const response = await fetch(`http://localhost:5000/api/products/${productId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product details');
    }
    return await response.json();
  }
);

interface ProductState {
  details: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  details: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch product details';
      });
  },
});

export const selectProductDetails = (state: RootState) => state.product.details;
export const selectProductLoading = (state: RootState) => state.product.loading;
export const selectProductError = (state: RootState) => state.product.error;

export default productSlice.reducer;