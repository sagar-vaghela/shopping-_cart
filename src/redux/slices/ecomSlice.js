import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../lib/api/api';

const initialState = {
  products: [],
  cart: [],
  loading: false,
  error: null,
  product: null,
  search: ''
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const ecomSlice = createSlice({
  name: 'ecom',
  initialState,
  reducers: {
    AddToCart: (state, action) => {
      const item = state.cart.some((item) => item.id === action.payload.id);
      if (!item) {
        state.cart.push(action.payload);
      }
    },
    RemoveFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    resetSearch: (state) => {
      state.search = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        const products = action.payload;
        state.products = products.products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        const product = action.payload;
        state.product = product;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  }
});

export const { AddToCart, RemoveFromCart, setSearch, resetSearch } = ecomSlice.actions;
