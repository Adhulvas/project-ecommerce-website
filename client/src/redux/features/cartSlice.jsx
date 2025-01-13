import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalPrice: 0,
    totalCount: 0
  },
  reducers: {
    addToCart(state, action) {
      state.cartItems = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
      state.totalCount = state.cartItems.length;
    },
    removeItem(state, action) {
      const { productId, size } = action.payload;
    
      state.cartItems = state.cartItems.filter((item) => {
        const itemProductId = typeof item.productId === "string" ? item.productId : item.productId._id;
        return itemProductId !== productId || item.size !== size;
      });
    
      state.totalCount = state.cartItems.length;
    } 
  },
});

export const { addToCart,removeItem } = cartSlice.actions;

export default cartSlice.reducer;
