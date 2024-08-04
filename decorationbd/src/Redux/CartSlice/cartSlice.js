import { createSlice } from '@reduxjs/toolkit';
import { cartApi } from './cartApi';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Add your synchronous reducers here
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(cartApi.endpoints.fetchCartItems.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(cartApi.endpoints.fetchCartItems.matchFulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addMatcher(cartApi.endpoints.fetchCartItems.matchRejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addMatcher(cartApi.endpoints.addItemToCart.matchFulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addMatcher(cartApi.endpoints.updateCartItem.matchFulfilled, (state, action) => {
        const updatedItem = action.payload;
        const index = state.items.findIndex(item => item.id === updatedItem.id);
        if (index >= 0) {
          state.items[index] = updatedItem;
        }
      })
      .addMatcher(cartApi.endpoints.deleteCartItem.matchFulfilled, (state, action) => {
        const id = action.meta.arg;
        state.items = state.items.filter(item => item.id !== id);
      })
      .addMatcher(cartApi.endpoints.deleteAllCartItems.matchFulfilled, (state) => {
        state.items = [];
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
