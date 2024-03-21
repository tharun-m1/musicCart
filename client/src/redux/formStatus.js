import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "login",
};

export const formStatusSlice = createSlice({
  name: "formStatus",
  initialState,
  reducers: {
    changeFormStatus: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { changeFormStatus } = formStatusSlice.actions;
export default formStatusSlice.reducer;
