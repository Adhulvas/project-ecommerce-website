import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCategoryDropdownOpen: false, 
  isProductDropdownOpen: false,
};

const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState,
  reducers: {    
    toggleCategoryDropdown: (state) => {
      state.isCategoryDropdownOpen = !state.isCategoryDropdownOpen;
    },
    toggleProductDropdown: (state) => {
      state.isProductDropdownOpen = !state.isProductDropdownOpen;
    },
  },
});

export const { toggleCategoryDropdown, toggleProductDropdown } = dropdownSlice.actions;

export default dropdownSlice.reducer;
