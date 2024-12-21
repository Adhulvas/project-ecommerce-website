import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    fetchWishlistRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchWishlistSuccess(state, action) {
      state.loading = false;
      state.items = action.payload;
    },
    fetchWishlistFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    removeFromWishlist(state, action) {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
  },
});

export const {
  fetchWishlistRequest,
  fetchWishlistSuccess,
  fetchWishlistFailure,
  removeFromWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
