import { configureStore } from '@reduxjs/toolkit';
import { ecomSlice } from './slices/ecomSlice';

export const store = configureStore({
  reducer: {
    ecom: ecomSlice.reducer
  }
});
