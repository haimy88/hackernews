import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [];

export const articlesSlice = createSlice({
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
    resetStarredArticles: (state, action) => {
      state.value = [];
    },
  },
});

export const { addArticle, deleteArticle, getArticleData } =
  articlesSlice.actions;

export default articlesSlice.reducer;
