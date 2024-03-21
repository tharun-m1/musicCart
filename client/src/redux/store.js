import { configureStore } from "@reduxjs/toolkit";
import loginStatusReducer from "./loginSlice";
import formStatusReducer from "./formStatus";
export const store = configureStore({
  reducer: {
    loginStatus: loginStatusReducer,
    formStatus: formStatusReducer,
  },
});
