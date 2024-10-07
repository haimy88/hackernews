import React, { useEffect } from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { changeList } from "../features/ListManager";
import ArticleList from "../components/ArticleList";

export default function Home() {
  const homeActive = true;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeList("top"));
  });

  return (
    <>
      <Box sx={{ height: "4px", bgcolor: "secondary.main" }}></Box>
      <Box sx={{ ml: "90px", mr: "90px" }}>
        <Banner homeActive={homeActive} />
        <ArticleList />
        <Box sx={{ height: "4px", bgcolor: "secondary.main" }}></Box>
        <Footer />
      </Box>
    </>
  );
}
