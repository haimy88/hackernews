import { configureStore } from "@reduxjs/toolkit";
import starredReducer from "../features/StarredArticlesManager";
import topReducer from "../features/TopArticlesManager";
import themeReducer from "../features/ThemeManager";
import listReducer from "../features/ListManager";
import articleApiReducer from "../features/ArticleApiManager";
import loadingReducer from "../features/LoadingManager";

export const store = configureStore({
  reducer: {
    starred: starredReducer,
    top: topReducer,
    theme: themeReducer,
    list: listReducer,
    apis: articleApiReducer,
    loading: loadingReducer,
  },
});
