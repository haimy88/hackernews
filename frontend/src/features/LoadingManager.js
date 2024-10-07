import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = true;

export const loadingSlice = createSlice({
  name: "loading",
  initialState: { value: initialStateValue },
  reducers: {
    changeLoading: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
