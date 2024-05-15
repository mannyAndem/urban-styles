import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  region: JSON.parse(localStorage.getItem("region")),
};

export const customerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCustomer(state, action) {
      state.data = action.payload;
    },
    setRegion(state, action) {
      localStorage.setItem("region", JSON.stringify(action.payload));
      localStorage.setItem("region_id", action.payload.id);
      state.region = action.payload;
    },
  },
});

// slice actions
export const { setCustomer, setRegion } = customerSlice.actions;

// slice selectors
export const selectCustomer = (state) => state.customer.data;
export const selectRegion = (state) => state.customer.region;

export default customerSlice.reducer;
