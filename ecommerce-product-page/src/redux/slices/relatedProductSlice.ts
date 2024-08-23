// src/redux/slices/relatedProductSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/types'; // Assuming you have a types.ts file with the Product interface
import { RootState } from '../store';

export const fetchRelatedProducts = createAsyncThunk(
  'relatedProduct/fetchRelatedProducts',
  async (productId: number) => {
    const response = await fetch(`http://localhost:5000/api/related-products/${productId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch related products');
    }
    return await response.json();
  }
);

interface RelatedProductState {
  relatedProducts: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: RelatedProductState = {
  relatedProducts: [],
  loading: false,
  error: null,
};

const relatedProductSlice = createSlice({
  name: 'relatedProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelatedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedProducts = action.payload;
      })
      .addCase(fetchRelatedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch related products';
      });
  },
});

export const selectRelatedProducts = (state: RootState) => state.relatedProduct.relatedProducts;
export const selectRelatedProductLoading = (state: RootState) => state.relatedProduct.loading;
export const selectRelatedProductError = (state: RootState) => state.relatedProduct.error;

export default relatedProductSlice.reducer;