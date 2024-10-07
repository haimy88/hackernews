import React, { useEffect } from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import StarredArticles from "../components/StarredArticles";
import ArticleList from "../components/ArticleList";
import { useDispatch } from "react-redux";
import { changeList } from "../features/ListManager";
import { Box } from "@mui/material";

export default function Starred() {
  const starredActive = true;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeList("starred"));
  });

  return (
    <>
      <Box sx={{ height: "4px", bgcolor: "secondary.main" }}></Box>
      <Box sx={{ ml: "90px", mr: "90px" }}>
        <Banner starredActive={starredActive} />
        {/* <StarredArticles /> */}
        <ArticleList />
        <Box
          sx={{ height: "4px", bgcolor: "secondary.main", mt: "50px" }}
        ></Box>
        <Footer />
      </Box>
    </>
  );
}
