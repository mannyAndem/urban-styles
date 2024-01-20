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
  addShippingAddressStatus: "idle",
  addShippingAddressError: null,
  addShippingMethodStatus: "idle",
  addShippingMethodError: null,
  createPaymentSessionsStatus: "idle",
  createPaymentSessionsError: null,
  completeCartStatus: "idle",
  completeCartError: null,
};

export const fetchCart = createAsyncThunk(
  "cart/get",
  async (data, { getState, rejectWithValue, fulfillWithValue }) => {
    const cartId = getState().cart.cartId;
    const NIGERIA_REGION_ID = "reg_01HKPZPB695H3NX0J6GKTGAAZW";
    try {
      // If the user already has a created cart, fetch the cart
      if (cartId) {
        const response = await axios.get(`/carts/${cartId}`);
        console.log(response.data.cart);
        return response.data.cart;
      }
      // If the user does not have a cart, create and return that
      else {
        const data = {
          region_id: NIGERIA_REGION_ID,
        };
        const response = await axios.post(`/carts`, JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
          },
        });
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

// cart checkout thunks
export const addShippingAddress = createAsyncThunk(
  "cart/addShippingAddress",
  async (shippingAddress, { getState, fulfillWithValue, rejectWithValue }) => {
    console.log(shippingAddress);
    const cartId = getState().cart.cartId;
    console.log(cartId);
    const data = { shipping_address: shippingAddress };
    try {
      const response = await axios.post(
        `/carts/${cartId}`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      return fulfillWithValue(response.data.cart);
    } catch (err) {
      console.error(err);
      if (err.status === "ERR_NETWORK") {
        return rejectWithValue("Can't connect to the internet.");
      }

      return rejectWithValue("Something went wrong");
    }
  }
);

export const addShippingMethod = createAsyncThunk(
  "cart/addShippingMethod",
  async (option_id, { getState, rejectWithValue }) => {
    const data = {
      option_id,
    };

    const cartId = getState().cart.cartId;
    try {
      const response = await axios.post(
        `/carts/${cartId}/shipping-methods`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);

      return response.data.cart;
    } catch (err) {
      console.error(err);
      if (err.status === "ERR_NETWORK") {
        return rejectWithValue("Can't connect to the internet.");
      }

      return rejectWithValue("Something went wrong");
    }
  }
);

export const createPaymentSessions = createAsyncThunk(
  "cart/createPaymentSessions",
  async (data, { getState, rejectWithValue }) => {
    const cartId = getState().cart.cartId;
    try {
      const response = await axios.post(`/carts/${cartId}/payment-sessions`);
      console.log(response.data.cart);
      return response.data.cart;
    } catch (err) {
      console.error(err);
      if (err.code === "ERR_NETWORK") {
        return rejectWithValue("Can't connect to the internet");
      }

      return rejectWithValue("An error occurred");
    }
  }
);

export const completeCart = createAsyncThunk(
  "cart/complete",
  async (data, { getState, rejectWithValue }) => {
    const cartId = getState().cart.cartId;
    try {
      const response = await axios.post(`/carts/${cartId}/complete`);
      console.log(response.data);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error(err);
      if (err.code === "ERR_NETWORK") {
        return rejectWithValue("Could not connect to the internet");
      }

      return rejectWithValue("Something went wrong");
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
      console.log(action);
      state.status = "success";
      state.data = action.payload;
      state.cartId = action.payload.id;
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
    builder.addCase(addShippingAddress.pending, (state) => {
      state.addShippingAddressStatus = "pending";
    });
    builder.addCase(addShippingAddress.fulfilled, (state, action) => {
      state.addShippingAddressStatus = "success";
      state.data = action.payload;
    });
    builder.addCase(addShippingAddress.rejected, (state, action) => {
      state.addShippingAddressStatus = "error";
      state.addShippingAddressError = action.payload;
    });
    builder.addCase(addShippingMethod.pending, (state) => {
      state.addShippingMethodStatus = "pending";
    });
    builder.addCase(addShippingMethod.fulfilled, (state, action) => {
      state.addShippingMethodStatus = "success";
      state.data = action.payload;
    });
    builder.addCase(addShippingMethod.rejected, (state, action) => {
      state.addShippingMethodStatus = "error";
      state.addShippingMethodError = action.payload;
    });
    builder.addCase(createPaymentSessions.pending, (state) => {
      state.createPaymentSessionsStatus = "pending";
    });
    builder.addCase(createPaymentSessions.fulfilled, (state, action) => {
      state.createPaymentSessionsStatus = "success";
      state.data = action.payload;
    });
    builder.addCase(createPaymentSessions.rejected, (state, action) => {
      state.createPaymentSessionsStatus = "error";
      state.createPaymentSessionsError = action.payload;
    });
    builder.addCase(completeCart.fulfilled, (state, action) => {
      state.completeCartStatus = "success";
    });
    builder.addCase(completeCart.rejected, (state, action) => {
      state.completeCartStatus = "error";
      state.completeCartError = action.payload;
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
export const selectAddShippingAddressStatus = (state) =>
  state.cart.addShippingAddressStatus;
export const selectAddShippingAddressError = (state) =>
  state.cart.addShippingAddressError;
export const selectAddShippingMethodStatus = (state) =>
  state.cart.addShippingMethodStatus;
export const selectAddShippingMethodError = (state) =>
  state.cart.addShippingMethodError;
export const selectCreatePaymentSessionsStatus = (state) =>
  state.cart.createPaymentSessionsStatus;
export const selectCreatePaymentSessionsError = (state) =>
  state.cart.createPaymentSessionsError;
export const selectCompleteCartStatus = (state) =>
  state.cart.completeCartStatus;
export const selectCompleteCartError = (state) => state.cart.completeCartError;
