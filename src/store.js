import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import plantsReducer from "./features/plants/plantsSlice";
import cartReducer from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    plants: plantsReducer,
    cart: cartReducer,
  },
});

export default store;
