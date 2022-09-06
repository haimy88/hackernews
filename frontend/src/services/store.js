import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "../features/DisplayedArticles";

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
  },
});
