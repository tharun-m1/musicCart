import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { searchProduct } = searchSlice.actions;
export default searchSlice.reducer;
