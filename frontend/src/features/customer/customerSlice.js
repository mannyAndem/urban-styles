import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  data: null,
  status: "idle",
  loginStatus: "idle",
  signupStatus: "idle",
  logoutStatus: "idle",
  loginError: null,
  signupError: null,
  logoutError: null,
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

export const signup = createAsyncThunk("customer/signup", async (data) => {
  const details = {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    password: data.password,
  };
  try {
    const response = await axios.post("/customers", JSON.stringify(details), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.customer;
  } catch (err) {
    return Promise.reject(err);
  }
});

export const login = createAsyncThunk(
  "customer/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.customer);
      return response.data.customer;
    } catch (err) {
      console.error(err);
      if (err.code === "ERR_NETWROK") {
        return rejectWithValue("Can't connect to the internet");
      }
      if (err.response?.status === 401) {
        return rejectWithValue("Invalid email or password");
      }

      return rejectWithValue("Something went wrong.");
    }
  }
);

export const logout = createAsyncThunk("customer/logout", async () => {
  try {
    const response = await axios.delete("/auth", {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
});

export const customerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetLoginStatus(state) {
      state.loginStatus = "idle";
      state.loginError = null;
    },
    resetSignupStatus(state) {
      state.signupStatus = "idle";
      state.signupError = null;
    },
    resetLogoutStatus(state) {
      state.logoutStatus = "idle";
      state.logoutError = null;
    },
    resetAddAddressStatus(state) {
      state.addAddressStatus = "idle";
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
    builder.addCase(signup.pending, (state) => {
      state.signupStatus = "pending";
    });
    builder.addCase(signup.rejected, (state) => {
      state.signupStatus = "error";
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.signupStatus = "success";
      state.data = action.payload;
    });
    builder.addCase(login.pending, (state) => {
      state.loginStatus = "pending";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginStatus = "error";
      state.loginError = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginStatus = "success";
      state.data = action.payload;
    });
    builder.addCase(logout.pending, (state) => {
      state.logoutStatus = "pending";
    });
    builder.addCase(logout.rejected, (state) => {
      state.logoutStatus = "error";
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.logoutStatus = "success";
      state.data = null;
    });
  },
});

export const {
  resetLoginStatus,
  resetSignupStatus,
  resetLogoutStatus,
  resetAddAddressStatus,
} = customerSlice.actions;

export default customerSlice.reducer;

export const selectCustomer = (state) => state.customer.data;
export const selectCustomerStatus = (state) => state.customer.status;
export const selectLoginStatus = (state) => state.customer.loginStatus;
export const selectSignupStatus = (state) => state.customer.signupStatus;
export const selectLogoutStatus = (state) => state.customer.logoutStatus;
export const selectLoginError = (state) => state.customer.loginError;
export const selectSignupError = (state) => state.customer.signupError;
export const selectLogoutError = (state) => state.customer.logoutError;
