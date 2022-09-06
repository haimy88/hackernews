import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import axios from "axios";
import { Box, Button, CircularProgress } from "@mui/material";
import TopArticles from "../components/TopArticles";
// import { displayStories, getStories } from "../services/api";
import { useSelector, useDispatch } from "react-redux";
import { getArticleData } from "../features/DisplayedArticles";

export default function Home() {
  const homeActive = true;
  let allArticlesApis = JSON.parse(localStorage.getItem("articleApis"));
  const displayedArticles = useSelector((state) => state.articles.value);
  const [isLoading, setIsLoading] = useState(false);

  // const [displayedArticles, setDisplayedArticles] = useState([]);

  const dispatch = useDispatch();

  const getStories = async () => {
    setIsLoading(true);
    const response = await axios
      .get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
      .then(({ data }) => data);
    const story_apis = response.map(
      (id) =>
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    );
    allArticlesApis = story_apis;
    localStorage.setItem("articleApis", JSON.stringify(allArticlesApis));
    displayStories();
  };

  const displayStories = async () => {
    setIsLoading(true);
    const newStoriesApis = allArticlesApis.slice(
      displayedArticles.length,
      displayedArticles.length + 12
    );
    const stories = await axios.all(
      newStoriesApis.map((endpoint) =>
        axios.get(endpoint).then(({ data }) => data)
      )
    );
    stories.map((article) => {
      dispatch(getArticleData(article));
    });
    setIsLoading(false);
  };

  useEffect(() => {
    localStorage.clear();
    getStories();
  }, []);

  useEffect(() => {
    console.log(displayedArticles);
  });

  return (
    <>
      <Box sx={{ height: "4px", bgcolor: "secondary.main" }}></Box>
      <Box sx={{ ml: "90px", mr: "90px" }}>
        <Banner homeActive={homeActive} />
        <TopArticles />
        {!isLoading && (
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
        {isLoading && (
          <CircularProgress color="secondary" sx={{ ml: "42vw", mb: "10vh" }} />
        )}
        <Box sx={{ height: "4px", bgcolor: "secondary.main" }}></Box>
        <Footer />
      </Box>
    </>
  );
}
