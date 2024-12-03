import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isSellerAuth: false,
  sellerData: {}
}

export const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    saveSellerData: (state, action) => {
      state.isSellerAuth=true,
      state.sellerData=action.payload
    },
    clearSellerData: (state, action) => {
      state.isSellerAuth=false,
      state.sellerData= {}
    }
  },
})


export const { saveSellerData,clearSellerData} = sellerSlice.actions

export default sellerSlice.reducer