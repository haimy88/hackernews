import React, { useState } from "react";
import {
  Box,
  Typography,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Link,
  Alert,
} from "@mui/material";
import StarUnfilledLight from "../images/star_unfilled_light.svg";
import StarUnfilledDark from "../images/star_unfilled_dark.svg";
import StarFilled from "../images/star_filled.svg";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addArticle, deleteArticle } from "../features/StarredArticlesManager";
import { useThemeContext } from "../contexts/ThemeContext";
import { useArticleContext } from "../contexts/ArticleContext";

export default function ArticleItem({ item }) {
  const list = useSelector((state) => state.list.value);
  const { getBaseURL, checkForStars } = useArticleContext();
  const { currentTheme } = useThemeContext();
  const [requestErrorId, setRequestErrorId] = useState("");
  const [requestErrorMessage, setRequestErrorMessage] = useState("");

  const starredArticles = useSelector((state) => state.starred.value);
  const dispatch = useDispatch();

  const addStar = async (article) => {
    try {
      let res = await axios.post(`http://localhost:8080/add/`, article);
      dispatch(addArticle(article));
    } catch (error) {
      setRequestErrorId(article.id);
      setRequestErrorMessage(error.response.data);
    }
  };

  const deleteStar = async (article) => {
    try {
      await axios.delete(`http://localhost:8080/${article.id}`);
      dispatch(deleteArticle(article));
    } catch (error) {
      setRequestErrorId(article.id);
      setRequestErrorMessage(error.response.data);
    }
  };

  const dividerStyle = {
    height: "10px",
    borderRightWidth: 1,
    borderColor: "primary.light",
    ml: 1,
    mr: 1,
  };

  return (
    <ListItem
      key={item.id}
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
                  {Math.round((Date.now() / 1000 - item.time) / 3600)} hours ago
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
                  <img className="star" src={StarFilled} alt="star (filled)" />
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
                    alt="star (outlined)"
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
                {starredArticles.filter((article) => item.id === article.id)
                  .length
                  ? "saved"
                  : "save"}
              </Typography>
              <Box>
                {requestErrorId === item.id && (
                  <Alert
                    severity="error"
                    sx={{
                      fontSize: "11px",
                      ml: 2,
                      mb: 1,
                      height: "36px",
                      pt: 0,
                      pb: 0,
                    }}
                  >
                    {requestErrorMessage || "unable to process request"}
                  </Alert>
                )}
              </Box>
            </Box>
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
