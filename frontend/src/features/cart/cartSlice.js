import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  data: null,
  status: "idle",
  cartId: localStorage.getItem("cartId") || null,
  error: null,
  addProductStatus: "idle",
};

export const fetchCart = createAsyncThunk(
  "cart/get",
  async (data, { getState, rejectWithValue }) => {
    const cartId = getState().cart.cartId;
    try {
      // If the user already has a created cart, fetch the cart
      if (cartId) {
        const response = await axios.get(`/carts/${cartId}`);
        console.log(response.data.cart);
        return response.data.cart;
      }
      // If the user does not have a cart, create and return that
      else {
        const response = await axios.post(`/carts`);
        localStorage.setItem("cartId", response.data.cart.id);
        console.log(response.data);
        return response.data.cart;
      }
    } catch (err) {
      console.error(err);
      return rejectWithValue("An error occured");
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "cart/addItem",
  async (variantId, { getState, rejectWithValue }) => {
    const cartId = getState().cart.cartId;
    console.log(variantId);
    const data = {
      variant_id: variantId,
      quantity: 1,
    };
    console.log(JSON.stringify(data));
    try {
      const response = await axios.post(
        `carts/${cartId}/line-items`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.cart);
      return response.data.cart;
    } catch (err) {
      console.error(err);
      return rejectWithValue("Failed to add product to cart");
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCart.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(addProductToCart.pending, (state) => {
      state.addProductStatus = "pending";
    });
    builder.addCase(addProductToCart.fulfilled, (state) => {
      state.addProductStatus = "success";
      state.status = "idle"; // So that the components rendering the cart rerender.
    });
    builder.addCase(addProductToCart.rejected, (state) => {
      state.status = "error";
    });
  },
});

export default cartSlice.reducer;

// Selectors
export const selectCart = (state) => state.cart.data;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartError = (state) => state.cart.error;
export const selectAddProductStatus = (state) => state.cart.addProductStatus;
