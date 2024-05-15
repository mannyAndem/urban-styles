import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  meta: null,
};

// IMPLEMENT FUNCTIONALITY TO SET META TO THIS OBJECT WHEN PRODUCTS IS FETCHED

// state.meta = {
//   count: action.payload.count,
//   offset: action.payload.offset,
//   limit: action.payload.limit,
// };

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setMeta(state, action) {
      state.meta = {
        count: action.payload.count,
        offset: action.payload.offset,
        limit: action.payload.limit,
      };
    },
  },
});

export const { setMeta } = productsSlice.actions;

export const selectMeta = (state) => state.products.meta;

export default productsSlice.reducer;
