import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import authReducer from "../features/auth/AuthSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});
