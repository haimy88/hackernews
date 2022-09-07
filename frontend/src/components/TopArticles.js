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
import axios from "axios";
import { useThemeContext } from "../contexts/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { getArticleData } from "../features/DisplayedArticles";
// import { Link } from "react-router-dom";

export default function TopArticles() {
  const { currentTheme } = useThemeContext();

  const displayedArticles = useSelector((state) => state.articles.value);
  let allArticlesApis = JSON.parse(localStorage.getItem("articleApis"));
  const [isLoading, setIsLoading] = useState(false);

  // const [displayedArticles, setDisplayedArticles] = useState([]);
  const dispatch = useDispatch();

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

  const sourceRegex = new RegExp("([a-zA-Z]+(.[a-zA-Z]+)+)");

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
                      <Link
                        underline="hover"
                        // href={item.url} TODO Add Href
                        rel="noopener"
                        target="_blank"
                      >
                        {" "}
                        {item.url}
                      </Link>
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
                      {item.score} points by {item.by}{" "}
                      {Math.round((Date.now() / 1000 - item.time) / 3600)} hours
                      ago
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
                      {item.descendants} comments
                    </Typography>
                    <Divider
                      orientation="vertical"
                      flexItem
                      variant="middle"
                      sx={dividerStyle}
                    />
                    <IconButton
                      sx={{
                        p: 0,
                        mr: 0.5,
                      }}
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
                    <Typography
                      component="span"
                      variant="type2"
                      color="primary.light"
                    >
                      save
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
