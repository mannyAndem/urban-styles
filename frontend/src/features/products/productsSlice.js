import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  meta: null,
};

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
