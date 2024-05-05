import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  data: null,
  status: "idle",
};

export const getCustomer = createAsyncThunk(
  "customer/get",
  async (data, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await axios.get("/auth");
      console.log(response.data);
      return response.data.customer;
    } catch (err) {
      console.error(err);
      return fulfillWithValue(null);
    }
  }
);

export const customerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCustomer(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getCustomer.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getCustomer.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(getCustomer.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
  },
});

export const { setCustomer } = customerSlice.actions;

export default customerSlice.reducer;

export const selectCustomer = (state) => state.customer.data;
export const selectCustomerStatus = (state) => state.customer.status;
export const selectLoginStatus = (state) => state.customer.loginStatus;
export const selectSignupStatus = (state) => state.customer.signupStatus;
export const selectLogoutStatus = (state) => state.customer.logoutStatus;
export const selectLoginError = (state) => state.customer.loginError;
export const selectSignupError = (state) => state.customer.signupError;
export const selectLogoutError = (state) => state.customer.logoutError;
