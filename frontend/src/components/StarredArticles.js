import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link,
  IconButton,
  Button,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useArticleContext } from "../contexts/ArticleContext";
import RemoveIcon from "@mui/icons-material/Remove";
import { addArticle, deleteArticle } from "../features/StarredArticlesManager";
import axios from "axios";

export default function StarredArticles() {
  const starredArticles = useSelector((state) => state.starred.value);
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState("");
  const [error, setError] = useState("");
  const email = useRef("");
  const dispatch = useDispatch();

  const { checkForStars } = useArticleContext();

  // const checkForStars = async () => {
  //   setIsLoading(true);
  //   try {
  //     let star_ids = await axios.get(`http://localhost:8080/`);
  //     star_ids.data.length === 0 && setIsLoading(false);
  //     const stars = await axios.all(
  //       star_ids.data.map((id) =>
  //         axios
  //           .get(
  //             `https://hacker-news.firebaseio.com/v0/item/${id.article_id}.json?print=pretty`
  //           )
  //           .then(({ data }) => data)
  //       )
  //     );
  //     stars.map((article) => {
  //       const base_url = getBaseURL(article.url);
  //       article.base_url = base_url;
  //       dispatch(addArticle(article));
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   setIsLoading(false);
  // };

  const deleteStar = async (article) => {
    dispatch(deleteArticle(article));
    try {
      let res = await axios.delete(`http://localhost:8080/${article.id}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const emailTheArticles = async () => {
    setIsLoading(true);
    try {
      const articlesToSend = {
        email: email.current.value,
        articles: starredArticles,
      };
      let res = await axios.post(
        `http://localhost:8080/email/`,
        articlesToSend
      );
      console.log(res);
      setEmailSent(res.data);
    } catch (error) {
      setError(error.response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const getStarredArticles = async () => {
      setIsLoading(true);
      let saved_articles = await checkForStars();
      console.log(saved_articles);
      saved_articles.map((article) => {
        dispatch(addArticle(article));
      });
      setIsLoading(false);
    };
    if (!starredArticles.length) {
      getStarredArticles();
    }
  }, []);

  // useEffect(() => {
  //   {
  //     !starredArticles.length && checkForStars();
  //   }
  // }, []);

  const dividerStyle = {
    height: "10px",
    borderRightWidth: 1,
    borderColor: "primary.light",
    ml: 1,
    mr: 1,
  };

  return (
    <>
      <Box sx={{ ml: "38px", display: "flex", flexDirection: "column" }}>
        {starredArticles.length ? (
          <>
            <List
              sx={{
                color: "primary.light",
                fontSize: "18px",
                mt: "40px",
              }}
            >
              {starredArticles.map((item) => (
                <ListItem
                  sx={{
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
                              {Math.round(
                                (Date.now() / 1000 - item.time) / 3600
                              )}{" "}
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
                          <IconButton
                            sx={{
                              p: 0,
                              mr: 0.2,
                            }}
                            onClick={() => deleteStar(item)}
                            disableRipple
                          >
                            <RemoveIcon
                              sx={{
                                p: 0,
                                width: "70%",
                                color: "primary.light",
                              }}
                            />
                          </IconButton>
                          <Typography
                            component="span"
                            variant="type2"
                            color="primary.light"
                          >
                            remove
                          </Typography>
                        </Box>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
            <Box
              sx={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {!isLoading && !emailSent && (
                <>
                  <Box display="flex" sx={{ alignItems: "center" }}>
                    <TextField
                      inputRef={email}
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      size="small"
                      color="secondary"
                    />
                    {error && (
                      <Alert severity="error" sx={{ ml: 2 }}>
                        {" "}
                        {error}
                      </Alert>
                    )}
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      color="secondary"
                      disableElevation
                      sx={{
                        borderRadius: 0,
                        color: "white",
                        mt: "20px",
                      }}
                      onClick={() => emailTheArticles(email.current)}
                    >
                      Email Yourself The Articles
                    </Button>
                  </Box>
                </>
              )}
              {isLoading && (
                <CircularProgress color="secondary" sx={{ ml: 7, mt: 1 }} />
              )}
              {emailSent && (
                <Alert severity="success" sx={{ width: "280px" }}>
                  {" "}
                  {emailSent}
                </Alert>
              )}
            </Box>
          </>
        ) : isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress
              size="60px"
              color="secondary"
              sx={{ ml: "-35px", mt: 6 }}
            />
          </Box>
        ) : (
          <Box sx={{ dislay: "flex", justifyContent: "center" }}>
            <Typography sx={{ mt: 6 }}>No articles saved</Typography>
          </Box>
        )}
      </Box>
    </>
  );
}
