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
import ArticleItem from "../components/ArticleItem";

export default function StarredArticles() {
  const starredArticles = useSelector((state) => state.starred.value);
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState("");
  const [error, setError] = useState("");
  const [requestErrorId, setRequestErrorId] = useState("");
  const [requestErrorMessage, setRequestErrorMessage] = useState("");
  const [loadError, setLoadError] = useState("");
  const email = useRef("");
  const dispatch = useDispatch();

  const { checkForStars } = useArticleContext();

  const deleteStar = async (article) => {
    try {
      await axios.delete(`http://localhost:8080/${article.id}`);
      dispatch(deleteArticle(article));
    } catch (error) {
      setRequestErrorId(article.id);
      setRequestErrorMessage(error.response.data);
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
      setEmailSent(res.data);
    } catch (error) {
      setError(error.response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const getStarredArticles = async () => {
      setIsLoading(true);
      let saved_articles;
      try {
        saved_articles = await checkForStars();
        saved_articles.map((article) => {
          dispatch(addArticle(article));
        });
      } catch (error) {
        setLoadError(saved_articles);
      }
      setIsLoading(false);
    };
    if (!starredArticles.length) {
      getStarredArticles();
    }
  }, []);

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
        {loadError && (
          <Alert severity="error" sx={{ mt: 10 }}>
            {loadError}
          </Alert>
        )}
        {starredArticles.length > 0 && (
          <>
            <List
              sx={{
                color: "primary.light",
                fontSize: "18px",
                mt: "40px",
                ml: -5,
              }}
            >
              {starredArticles.map((item) => (
                <ArticleItem item={item} />
                // <ListItem
                //   key={item.id}
                //   sx={{
                //     mr: -20,
                //   }}
                // >
                //   <ListItemText
                //     sx={{ ml: "-15px" }}
                //     primary={
                //       <React.Fragment>
                //         <Box sx={{ dislay: "flex" }}>
                //           <Link
                //             underline="hover"
                //             href={item.url}
                //             rel="noopener"
                //             target="_blank"
                //           >
                //             {item.title}
                //           </Link>
                //           <Typography
                //             sx={{
                //               display: "inline",
                //               pl: 1,
                //               fontWeight: 400,
                //             }}
                //             component="span"
                //             variant="type2"
                //             color="primary.light"
                //           >
                //             <Link
                //               underline="hover"
                //               href={`https://news.ycombinator.com/from?site=${item.base_url}`}
                //               rel="noopener"
                //               target="_blank"
                //               color="inherit"
                //             >
                //               {" "}
                //               {"("}
                //               {item.base_url}
                //               {")"}
                //             </Link>
                //           </Typography>
                //         </Box>
                //       </React.Fragment>
                //     }
                //     primaryTypographyProps={{
                //       fontWeight: 700,
                //       color: "primary.main",
                //     }}
                //     secondary={
                //       <React.Fragment>
                //         <Box sx={{ display: "flex", alignItems: "center" }}>
                //           <Typography
                //             component="span"
                //             variant="type2"
                //             color="primary.light"
                //           >
                //             {item.score} points by{" "}
                //             <Link
                //               underline="hover"
                //               href={`https://news.ycombinator.com/user?id=${item.by}`}
                //               rel="noopener"
                //               target="_blank"
                //               color="inherit"
                //             >
                //               {item.by}
                //             </Link>{" "}
                //             <Link
                //               underline="hover"
                //               href={`https://news.ycombinator.com/item?id=${item.id}`}
                //               rel="noopener"
                //               target="_blank"
                //               color="inherit"
                //             >
                //               {Math.round(
                //                 (Date.now() / 1000 - item.time) / 3600
                //               )}{" "}
                //               hours ago
                //             </Link>
                //           </Typography>
                //           <Divider
                //             orientation="vertical"
                //             flexItem
                //             variant="middle"
                //             sx={dividerStyle}
                //           />
                //           <Typography
                //             component="span"
                //             variant="type2"
                //             color="primary.light"
                //           >
                //             <Link
                //               underline="hover"
                //               href={`https://news.ycombinator.com/item?id=${item.id}`}
                //               rel="noopener"
                //               target="_blank"
                //               color="inherit"
                //             >
                //               {item.descendants} comments
                //             </Link>
                //           </Typography>
                //           <Divider
                //             orientation="vertical"
                //             flexItem
                //             variant="middle"
                //             sx={dividerStyle}
                //           />
                //           <IconButton
                //             sx={{
                //               p: 0,
                //               mr: 0.2,
                //             }}
                //             onClick={() => deleteStar(item)}
                //             disableRipple
                //           >
                //             <RemoveIcon
                //               sx={{
                //                 p: 0,
                //                 width: "70%",
                //                 color: "primary.light",
                //               }}
                //             />
                //           </IconButton>
                //           <Typography
                //             component="span"
                //             variant="type2"
                //             color="primary.light"
                //           >
                //             remove
                //           </Typography>
                //           {requestErrorId === item.id && (
                //             <Alert
                //               severity="error"
                //               sx={{
                //                 fontSize: "11px",
                //                 ml: 2,
                //                 mb: 1,
                //                 height: "36px",
                //                 pt: 0,
                //                 pb: 0,
                //               }}
                //             >
                //               {requestErrorMessage ||
                //                 "unable to process request"}
                //             </Alert>
                //           )}
                //         </Box>
                //       </React.Fragment>
                //     }
                //   />
                // </ListItem>
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
        )}
        {isLoading && (
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
        )}
        {!loadError && !isLoading && !starredArticles.length && (
          <Box sx={{ dislay: "flex", justifyContent: "center" }}>
            <Typography sx={{ mt: 6 }}>No articles saved</Typography>
          </Box>
        )}
      </Box>
    </>
  );
}
