// src/redux/slices/reviewSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Review } from '../types/types'; // Assuming you have a types.ts file with the Product interface
import { RootState } from '../store';

export const fetchReviews = createAsyncThunk(
  'review/fetchReviews',
  async (productId: number) => {
    const response = await fetch(`http://localhost:5000/api/reviews/${productId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    return await response.json();
  }
);

interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch reviews';
      });
  },
});

export const selectReviews = (state: RootState) => state.review.reviews;
export const selectReviewLoading = (state: RootState) => state.review.loading;
export const selectReviewError = (state: RootState) => state.review.error;

export default reviewSlice.reducer;