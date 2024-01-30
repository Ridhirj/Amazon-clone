import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  userInfo: null,
};
export const amazonSlice = createSlice({
  name: "amazon",
  initialState,
  reducers: {
    addTOCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      console.log(item);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },

    increaseItem: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decreaseItem: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    userSignOut: (state) => {
      state.userInfo = null;
    },
  },
});
export const {
  addTOCart,
  deleteItem,
  resetCart,
  increaseItem,
  setUserInfo,
  userSignOut,
  decreaseItem,
} = amazonSlice.actions;
export default amazonSlice.reducer;
