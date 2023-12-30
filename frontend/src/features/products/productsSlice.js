import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  data: null,
  meta: null,
  status: "idle", //accepts "idle" || "pending" || "success" || "error"
};

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (page) => {
    const LIMIT = 12;

    try {
      const response = await axios.get("/products", {
        params: {
          order: "created_at",
          offset: LIMIT * (page - 1) || 0,
          limit: LIMIT,
        },
      });
      console.log(response);
      return response.data;
    } catch (err) {
      console.error(err); //DELETE BEFORE PUSHING TO PROD!!!
      return Promise.reject(err);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProductsStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload.products;
      state.meta = {
        count: action.payload.count,
        offset: action.payload.offset,
        limit: action.payload.limit,
      };
    });
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      (state.status = "error"), (state.data = action.payload);
    });
  },
});

export const { resetProductsStatus } = productsSlice.actions;

export const selectProductsStatus = (state) => state.products.status;
export const selectProducts = (state) => state.products.data;
export const selectMeta = (state) => state.products.meta;

export default productsSlice.reducer;
