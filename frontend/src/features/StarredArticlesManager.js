import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [];

export const starredSlice = createSlice({
  name: "starred",
  initialState: { value: initialStateValue },
  reducers: {
    addArticle: (state, action) => {
      state.value.push(action.payload);
    },
    deleteArticle: (state, action) => {
      state.value = state.value.filter(
        (article) => article.id !== action.payload.id
      );
    },
  },
});

export const { addArticle, deleteArticle, getArticleData } =
  starredSlice.actions;

export default starredSlice.reducer;
