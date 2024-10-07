import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = "top";

export const listSlice = createSlice({
  name: "list",
  initialState: { value: initialStateValue },
  reducers: {
    changeList: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeList } = listSlice.actions;

export default listSlice.reducer;
