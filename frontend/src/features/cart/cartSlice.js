import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  data: null,
  status: "idle",
  cartId: localStorage.getItem("cartId") || null,
  error: null,
  addProductStatus: { id: null, info: "idle" },
  quantity: 0,
  addedVariants: [],
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
  async (variantId, { getState, rejectWithValue, fulfillWithValue }) => {
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
      return fulfillWithValue({ id: variantId });
    } catch (err) {
      console.error(err);
      return rejectWithValue({ id: variantId });
    }
  }
);

export const updateItem = createAsyncThunk(
  "cart/updateItem",
  async ({ id, quantity }, { getState, fulfillWithValue }) => {
    const cartId = getState().cart.cartId;
    const data = {
      quantity,
    };
    try {
      const response = await axios.post(
        `carts/${cartId}/line-items/${id}`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return fulfillWithValue(response.data.cart);
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  }
);

export const deleteItem = createAsyncThunk(
  "cart/deleteItem",
  async ({ lineItemId, variantId }, { getState, fulfillWithValue }) => {
    const cartId = getState().cart.cartId;
    try {
      const response = await axios.delete(
        `/carts/${cartId}/line-items/${lineItemId}`
      );
      console.log(response);
      return fulfillWithValue({ variantId, response: response.data.cart });
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetAddProductStatus(state) {
      state.addProductStatus = "idle";
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCart.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
      state.quantity = action.payload.items.reduce(
        (acc, curr) => acc + curr.quantity,
        0
      );
      action.payload.items.forEach((item) =>
        state.addedVariants.push(item.variant_id)
      );
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(addProductToCart.pending, (state, action) => {
      state.addProductStatus = { id: action.meta.arg, info: "pending" };
    });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.addProductStatus = { id: action.payload.id, info: "success" };
      state.status = "idle"; // So that the components rendering the cart rerender.
    });
    builder.addCase(addProductToCart.rejected, (state, action) => {
      state.addProductStatus = { id: action.payload.id, info: "error" };
    });
    builder.addCase(updateItem.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateItem.fulfilled, (state, action) => {
      state.status = "idle";
      state.data = action.payload;
    });
    builder.addCase(deleteItem.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(deleteItem.fulfilled, (state, action) => {
      state.data = action.payload.response;
      console.log(state.data);
      state.addedVariants = state.addedVariants.filter(
        (id) => id !== action.payload.variantId
      );
      state.status = "success";
    });
    builder.addCase(deleteItem.rejected, (state, action) => {
      state.status = "error";
    });
  },
});

export default cartSlice.reducer;

// actions
export const { resetAddProductStatus } = cartSlice.actions;

// Selectors
export const selectCart = (state) => state.cart.data;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartError = (state) => state.cart.error;
export const selectAddProductStatus = (state) => state.cart.addProductStatus;
export const selectCartQuantity = (state) => state.cart.quantity;
export const selectAddedVariants = (state) => state.cart.addedVariants;
