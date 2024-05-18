import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  cartId: localStorage.getItem("cartId") || null,
  addedVariants: JSON.parse(localStorage.getItem("added_variants")) ?? [],
  addShippingMethodStatus: "idle",
  addShippingMethodError: null,
  createPaymentSessionsStatus: "idle",
  createPaymentSessionsError: null,
  completeCartStatus: "idle",
  completeCartError: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateAddedVariants: (state, action) => {
      console.log(state.addedVariants);
      state.addedVariants.push(action.payload);
      localStorage.setItem(
        "added_variants",
        JSON.stringify(state.addedVariants)
      );
    },
    deleteVariant: (state, action) => {
      state.addedVariants = state.addedVariants.filter(
        (variant) => variant !== action.payload
      );

      localStorage.setItem(
        "added_variants",
        JSON.stringify(state.addedVariants)
      );
    },
  },
});

export default cartSlice.reducer;

// actions
export const { updateAddedVariants, deleteVariant } = cartSlice.actions;

// Selectors
export const selectCart = (state) => state.cart.data;
export const selectAddedVariants = (state) => state.cart.addedVariants;
