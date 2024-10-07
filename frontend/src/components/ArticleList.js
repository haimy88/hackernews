import React, { useEffect, useState } from "react";
import { Box, List, Button, CircularProgress, Alert } from "@mui/material";
import { useArticleContext } from "../contexts/ArticleContext";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addArticle } from "../features/StarredArticlesManager";
import { addTopArticle } from "../features/TopArticlesManager";
import { addArticleApi } from "../features/ArticleApiManager";
import { changeLoading } from "../features/LoadingManager";
import ArticleItem from "../components/ArticleItem";

export default function TopArticles() {
  const dispatch = useDispatch();
  let progressBarStyle;
  const starredArticles = useSelector((state) => state.starred.value);
  const topArticles = useSelector((state) => state.top.value);
  const list = useSelector((state) => state.list.value);
  const allArticlesApis = useSelector((state) => state.apis.value);
  const loading = useSelector((state) => state.loading.value);

  const [loadError, setLoadError] = useState("");

  const { getBaseURL } = useArticleContext();

  useEffect(() => {
    console.log(loading);
  }, [loading]);
  useEffect(() => {
    console.log(list);
  }, [list]);
  useEffect(() => {
    if (topArticles.length === 0) displayStories();
  }, [allArticlesApis]);
  useEffect(() => {
    console.log(topArticles);
  }, [topArticles]);

  const getStories = async () => {
    console.log("get stories fires");
    try {
      const response = await axios.get(
        "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
      );
      response.data.forEach((id) =>
        dispatch(
          addArticleApi(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
          )
        )
      );
      console.log(allArticlesApis);
    } catch (err) {
      console.log(err);
    }
    console.log("get stories saves data");
  };

  const displayStories = async () => {
    // dispatch(changeLoading(true));
    console.log("display stories fires");
    try {
      const newStoriesApis = allArticlesApis.slice(
        topArticles.length,
        topArticles.length + 12
      );
      const stories = await axios.all(
        newStoriesApis.map((endpoint) =>
          axios.get(endpoint).then(({ data }) => data)
        )
      );
      stories.map((article) => {
        const base_url = getBaseURL(article.url);
        article.base_url = base_url;
        dispatch(addTopArticle(article));
      });
    } catch (err) {
      setLoadError("Unable to load Articles");
    }
    console.log("got here");
  };

  useEffect(() => {
    dispatch(changeLoading(true));
    const getTopArticles = async () => {
      await getStories();
    };
    if (list === "top" && !topArticles.length) {
      getTopArticles();
    }
    const getStarredArticles = async () => {
      const starred = await axios.get("http://localhost:8080");
      starred.data.map((article) => dispatch(addArticle(article.article)));
    };
    if (!starredArticles.length) {
      getStarredArticles();
    }
    dispatch(changeLoading(false));
  }, []);

  const ProgressBarInitialStyle = {
    display: "flex",
    justifyContent: "center",
    mb: "10vh",
  };

  const ProgressBarShowMoreStyle = {
    display: "flex",
    justifyContent: "flex-start",
    ml: "60px",
    mb: "5vh",
  };

  return (
    <>
      <List
        sx={{
          listStyleType: "num",
          color: "primary.light",
          fontSize: "18px",
          mt: "40px",
        }}
      >
        {list === "top" &&
          topArticles.map((item) => <ArticleItem item={item} />)}
        {list === "starred" &&
          starredArticles.map((item) => <ArticleItem item={item} />)}
      </List>
      {loadError && (
        <Alert severity="error" sx={{ mb: 5 }}>
          {loadError}
        </Alert>
      )}
      {!loading && topArticles.length > 0 && list === "top" && (
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          onClick={displayStories}
          sx={{ borderRadius: 0, color: "white", ml: "38px", mb: "60px" }}
        >
          Show More
        </Button>
      )}
      {loading && (
        <Box
          sx={
            topArticles.length
              ? ProgressBarShowMoreStyle
              : ProgressBarInitialStyle
          }
        >
          <CircularProgress size="60px" color="secondary" />
        </Box>
      )}
    </>
  );
}
