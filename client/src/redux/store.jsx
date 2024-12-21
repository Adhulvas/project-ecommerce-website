import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import sellerReducer from './features/sellerSlice'
import adminReducer from './features/adminSlice'
import dropdownReducer from './features/dropdownSlice'
import wishlistReducer from './features/wishlistSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    admin: adminReducer,
    dropdown: dropdownReducer,
    wishlist: wishlistReducer,
  },
})