import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [];

export const topSlice = createSlice({
  name: "top",
  initialState: { value: initialStateValue },
  reducers: {
    addTopArticle: (state, action) => {
      state.value.push(action.payload);
    },
    deleteTopArticles: (state, action) => {
      state.value = initialStateValue;
    },
  },
});

export const { addTopArticle, deleteTopArticles, addBaseUrl } =
  topSlice.actions;

export default topSlice.reducer;
