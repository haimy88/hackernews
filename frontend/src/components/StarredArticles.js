import React, { useRef } from "react";
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
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import RemoveIcon from "@mui/icons-material/Remove";
import { deleteArticle } from "../features/StarredArticlesManager";
import axios from "axios";

export default function StarredArticles() {
  const starredArticles = useSelector((state) => state.starred.value);
  const email = useRef("");
  const dispatch = useDispatch();

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
    } catch (error) {
      console.log(error);
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
                    // ml: "38px",
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
                              color="inherit"
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
            <Box>
              <TextField
                inputRef={email}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                sx={{ mb: 0.5, mt: 4 }}
                size="small"
                color="secondary"
              />
            </Box>
            <Box>
              <Button
                variant="contained"
                color="secondary"
                disableElevation
                sx={{
                  borderRadius: 0,
                  color: "white",
                  mb: "50px",
                  mt: "18px",
                }}
                onClick={() => emailTheArticles(email.current)}
              >
                Email Yourself The Articles
              </Button>
            </Box>
          </>
        ) : (
          <Box sx={{ dislay: "flex", justifyContent: "center" }}>
            <Typography sx={{ mt: 4, mb: 4 }}>No articles saved</Typography>
          </Box>
        )}
      </Box>
    </>
  );
}
