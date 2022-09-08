import { configureStore } from "@reduxjs/toolkit";
import starredReducer from "../features/StarredArticlesManager";

export const store = configureStore({
  reducer: {
    starred: starredReducer,
  },
});
