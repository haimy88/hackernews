import React, { useContext, useState } from "react";
import axios from "axios";

const ArticleContext = React.createContext();

export function useArticleContext() {
  return useContext(ArticleContext);
}

export function ArticleContextProvider({ children }) {
  const getAllStoryIds = async () => {
    const response = await axios
      .get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
      .then(({ data }) => data);
    const story_apis = response.map(
      (id) =>
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    );
    //
    return story_apis;
  };

  return (
    <ArticleContext.Provider value={{ getAllStoryIds, displayStories }}>
      {children}
    </ArticleContext.Provider>
  );
}
