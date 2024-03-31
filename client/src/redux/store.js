import { configureStore } from "@reduxjs/toolkit";
import loginStatusReducer from "./loginSlice";
import formStatusReducer from "./formStatus";
import cartReducer from "./cartSlice";
import searchReducer from "./search";
export const store = configureStore({
  reducer: {
    loginStatus: loginStatusReducer,
    formStatus: formStatusReducer,
    cart: cartReducer,
    search: searchReducer,
  },
});
