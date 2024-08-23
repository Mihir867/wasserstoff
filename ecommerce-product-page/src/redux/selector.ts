import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

const selectProductState = (state: RootState) => state.product;

export const selectProductDetails = createSelector(
  [selectProductState],
  (productState) => productState.details
);