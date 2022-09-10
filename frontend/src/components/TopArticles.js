import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Button,
  CircularProgress,
  Link,
} from "@mui/material";
import StarUnfilledLight from "../images/star_unfilled_light.svg";
import StarUnfilledDark from "../images/star_unfilled_dark.svg";
import StarFilled from "../images/star_filled.svg";
import axios from "axios";
import { useThemeContext } from "../contexts/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { addArticle, deleteArticle } from "../features/StarredArticlesManager";

export default function TopArticles() {
  const { currentTheme } = useThemeContext();
  let allArticlesApis = JSON.parse(localStorage.getItem("articleApis"));
  const [isLoading, setIsLoading] = useState(false);
  const [displayedArticles, setDisplayedArticles] = useState([]);

  const starredArticles = useSelector((state) => state.starred.value);
  const dispatch = useDispatch();

  const getBaseURL = (url) => {
    if (!url) {
      return;
    }
    const path_array = url.split("/");
    let base_url = path_array[2];
    {
      (base_url === "github.com" || base_url === "twitter.com") &&
        (base_url = base_url.concat("/", path_array[3]));
    }
    const base_url_array = base_url.split(".");
    {
      (base_url_array[0] === "www" ||
        base_url_array[0] === "courses" ||
        base_url_array[0] === "en") &&
        base_url_array.shift();
    }
    base_url = base_url_array.join(".");
    return base_url;
  };

  const getStories = async () => {
    setIsLoading(true);
    const response = await axios
      .get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
      .then(({ data }) => data);
    allArticlesApis = response.map(
      (id) =>
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    );
    localStorage.setItem("articleApis", JSON.stringify(allArticlesApis));
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
      const base_url = getBaseURL(article.url);
      article.base_url = base_url;
      setDisplayedArticles((current) => [...current, article]);
    });
    setIsLoading(false);
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
      stars.map((article) => {
        getBaseURL(article.url);
        dispatch(addArticle(article));
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addStar = async (article) => {
    dispatch(addArticle(article));
    try {
      let res = await axios.post(`http://localhost:8080/add/${article.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStar = async (article) => {
    dispatch(deleteArticle(article));
    try {
      let res = await axios.delete(`http://localhost:8080/${article.id}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.clear();
    getStories();
    displayStories();
    {
      !starredArticles.length && checkForStars();
    }
  }, []);

  useEffect(() => {
    console.log(starredArticles);
  }, []);

  useEffect(() => {
    console.log("top articles rerendered");
  });

  const dividerStyle = {
    height: "10px",
    borderRightWidth: 1,
    borderColor: "primary.light",
    ml: 1,
    mr: 1,
  };

  const ProgressBarInitialStyle = {
    display: "flex",
    justifyContent: "center",
    mb: "10vh",
  };

  const ProgressBarShowMoreStyle = {
    display: "flex",
    justifyContent: "flex-start",
    ml: "60px",
    mb: "10vh",
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
        {displayedArticles.map((item) => (
          <ListItem
            sx={{
              display: "list-item",
              ml: "38px",
              mr: -20,
            }}
          >
            <ListItemText
              sx={{ ml: "-15px" }}
              primary={
                <React.Fragment>
                  <Box sx={{ dislay: "flex" }}>
                    <Link
                      underline="hover"
                      href={item.url}
                      rel="noopener"
                      target="_blank"
                    >
                      {item.title}
                    </Link>
                    <Typography
                      sx={{
                        display: "inline",
                        pl: 1,
                        fontWeight: 400,
                      }}
                      component="span"
                      variant="type2"
                      color="primary.light"
                    >
                      {item.base_url && (
                        <Link
                          underline="hover"
                          href={`https://news.ycombinator.com/from?site=${item.base_url}`}
                          rel="noopener"
                          target="_blank"
                          color="inherit"
                        >
                          {" "}
                          {"("}
                          {item.base_url}
                          {")"}
                        </Link>
                      )}
                    </Typography>
                  </Box>
                </React.Fragment>
              }
              primaryTypographyProps={{
                fontWeight: 700,
                color: "primary.main",
              }}
              secondary={
                <React.Fragment>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      component="span"
                      variant="type2"
                      color="primary.light"
                    >
                      {item.score} points by{" "}
                      <Link
                        underline="hover"
                        href={`https://news.ycombinator.com/user?id=${item.by}`}
                        rel="noopener"
                        target="_blank"
                        color="inherit"
                      >
                        {item.by}
                      </Link>{" "}
                      <Link
                        underline="hover"
                        href={`https://news.ycombinator.com/item?id=${item.id}`}
                        rel="noopener"
                        target="_blank"
                        color="inherit"
                      >
                        {Math.round((Date.now() / 1000 - item.time) / 3600)}{" "}
                        hours ago
                      </Link>
                    </Typography>
                    <Divider
                      orientation="vertical"
                      flexItem
                      variant="middle"
                      sx={dividerStyle}
                    />
                    <Typography
                      component="span"
                      variant="type2"
                      color="primary.light"
                    >
                      <Link
                        underline="hover"
                        href={`https://news.ycombinator.com/item?id=${item.id}`}
                        rel="noopener"
                        target="_blank"
                        color="inherit"
                      >
                        {item.descendants} comments
                      </Link>
                    </Typography>
                    <Divider
                      orientation="vertical"
                      flexItem
                      variant="middle"
                      sx={dividerStyle}
                    />
                    {starredArticles.filter((article) => item.id === article.id)
                      .length ? (
                      <IconButton
                        sx={{
                          p: 0,
                          mr: 0.5,
                        }}
                        onClick={() => deleteStar(item)}
                      >
                        <img className="star" src={StarFilled} />
                      </IconButton>
                    ) : (
                      <IconButton
                        sx={{
                          p: 0,
                          mr: 0.5,
                        }}
                        onClick={() => addStar(item)}
                      >
                        <img
                          className="star"
                          src={
                            currentTheme === "light"
                              ? StarUnfilledLight
                              : StarUnfilledDark
                          }
                        />
                      </IconButton>
                    )}
                    <Typography
                      component="span"
                      variant="type2"
                      color="primary.light"
                    >
                      {starredArticles.filter(
                        (article) => item.id === article.id
                      ).length
                        ? "saved"
                        : "save"}
                    </Typography>
                  </Box>
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
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
        <Box
          sx={
            displayedArticles.length
              ? ProgressBarShowMoreStyle
              : ProgressBarInitialStyle
          }
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
    </>
  );
}
