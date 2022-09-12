import React, { useContext } from "react";
import axios from "axios";

const ArticleContext = React.createContext();

export function useArticleContext() {
  return useContext(ArticleContext);
}

export function ArticleContextProvider({ children }) {
  const getBaseURL = (url) => {
    if (!url) {
      return;
    }
    const path_array = url.split("/");
    let base_url = path_array[2];

    (base_url === "github.com" || base_url === "twitter.com") &&
      (base_url = base_url.concat("/", path_array[3]));
    const base_url_array = base_url.split(".");

    (base_url_array[0] === "www" ||
      base_url_array[0] === "courses" ||
      base_url_array[0] === "en") &&
      base_url_array.shift();

    base_url = base_url_array.join(".");
    return base_url;
  };

  const checkForStars = async () => {
    try {
      let star_ids = await axios.get(`http://localhost:8080/`);
      const stars = await axios.all(
        star_ids.data.map((id) =>
          axios
            .get(
              `https://hacker-news.firebaseio.com/v0/item/${id.article_id}.json?print=pretty`
            )
            .then(({ data }) => data)
        )
      );
      let saved_articles = [];
      stars.map((article) => {
        const base_url = getBaseURL(article.url);
        article.base_url = base_url;
        saved_articles.push(article);
      });
      return saved_articles;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ArticleContext.Provider value={{ getBaseURL, checkForStars }}>
      {children}
    </ArticleContext.Provider>
  );
}
