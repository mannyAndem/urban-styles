import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: JSON.parse(localStorage.getItem("wishlist")) ?? [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      state.data = [...state.data, { ...action.payload }];
      localStorage.setItem("wishlist", JSON.stringify(state.data));
    },
    deleteFromWishlist: (state, action) => {
      state.data = state.data.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem("wishlist", JSON.stringify(state.data));
    },
  },
});

export const { addToWishlist, deleteFromWishlist } = wishlistSlice.actions;

export const selectWishlist = (state) => state.wishlist.data;

export default wishlistSlice.reducer;
