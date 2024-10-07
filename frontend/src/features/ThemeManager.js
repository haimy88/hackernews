import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = "light";

export const themeSlice = createSlice({
  name: "theme",
  initialState: { value: initialStateValue },
  reducers: {
    changTheme: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
