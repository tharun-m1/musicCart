import { configureStore } from "@reduxjs/toolkit";
import loginStatusReducer from "./loginSlice";
import formStatusReducer from "./formStatus";
import cartReducer from "./cartSlice";
export const store = configureStore({
  reducer: {
    loginStatus: loginStatusReducer,
    formStatus: formStatusReducer,
    cart: cartReducer,
  },
});
