import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import customerReducer from "../features/customer/customerSlice";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import { api } from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    customer: customerReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(api.middleware),
});
