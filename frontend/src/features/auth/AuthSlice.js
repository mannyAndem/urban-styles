import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  currentUser: null,
  loginStatus: "idle",
  signupStatus: "idle",
  logoutStatus: "idle",
  loginError: null,
  signupError: null,
  logoutError: null,
};

export const signup = createAsyncThunk("auth/signup", async (data) => {
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
    console.error(err); //DELETE BEFORE PUSHING TO PROD!!!
    return Promise.reject(err);
  }
});

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.customer;
    } catch (err) {
      if (err?.response?.status) {
        return rejectWithValue("Invalid email or password");
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
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

export const authSlice = createSlice({
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
  },
  extraReducers(builder) {
    builder.addCase(signup.pending, (state) => {
      state.signupStatus = "pending";
    });
    builder.addCase(signup.rejected, (state) => {
      state.signupStatus = "error";
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.signupStatus = "success";
      state.currentUser = action.payload;
    });
    builder.addCase(login.pending, (state) => {
      state.loginStatus = "pending";
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log(action);
      state.loginStatus = "error";
      state.loginError = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginStatus = "success";
      console.log(action.payload);
      state.currentUser = action.payload;
    });
    builder.addCase(logout.pending, (state) => {
      state.logoutStatus = "pending";
    });
    builder.addCase(logout.rejected, (state) => {
      state.logoutStatus = "error";
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.logoutStatus = "success";
      state.currentUser = null;
    });
  },
});

export const { resetLoginStatus, resetSignupStatus, resetLogoutStatus } =
  authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectLoginStatus = (state) => state.auth.loginStatus;
export const selectSignupStatus = (state) => state.auth.signupStatus;
export const selectLogoutStatus = (state) => state.auth.logoutStatus;
export const selectLoginError = (state) => state.auth.loginError;
export const selectSignupError = (state) => state.auth.signupError;
export const selectLogoutError = (state) => state.auth.logoutError;
