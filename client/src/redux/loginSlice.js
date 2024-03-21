import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const loginSlice = createSlice({
  name: "loginStatus",
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeStatus } = loginSlice.actions;
export default loginSlice.reducer;
