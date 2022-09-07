import { configureStore } from "@reduxjs/toolkit";
// import articlesReducer from "../features/DisplayedArticles";
import starredReducer from "../features/StarredArticlesManager";

export const store = configureStore({
  reducer: {
    // articles: articlesReducer,
    starred: starredReducer,
  },
});
