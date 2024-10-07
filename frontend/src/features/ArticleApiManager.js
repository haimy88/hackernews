import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [];

export const articleApiSlice = createSlice({
  name: "articleApi",
  initialState: { value: initialStateValue },
  reducers: {
    addArticleApi: (state, action) => {
      state.value.push(action.payload);
    },
    deleteArticleApis: (state, action) => {
      state.value = initialStateValue;
    },
  },
});

export const { addArticleApi, deleteArticleApis } = articleApiSlice.actions;

export default articleApiSlice.reducer;
