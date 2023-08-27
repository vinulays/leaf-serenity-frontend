import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import plantsReducer from "./features/plants/plantsSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    plants: plantsReducer,
  },
});

export default store;
