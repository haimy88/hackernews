import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [];

export const articlesSlice = createSlice({
  name: "articles",
  initialState: { value: initialStateValue },
  reducers: {
    getArticleData: (state, action) => {
      state.value.push(action.payload);
    },
    deleteArticleData: (state) => {
      state.value = [];
    },
  },
});

export const { getArticleData, deleteArticleData } = articlesSlice.actions;

export default articlesSlice.reducer;
