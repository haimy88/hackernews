import React, { useEffect } from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { Box } from "@mui/material";
import TopArticles from "../components/TopArticles";

export default function Home() {
  const homeActive = true;

  useEffect(() => {
    console.log("home rerendered");
  });

  return (
    <>
      <Box sx={{ height: "4px", bgcolor: "secondary.main" }}></Box>
      <Box sx={{ ml: "90px", mr: "90px" }}>
        <Banner homeActive={homeActive} />
        <TopArticles />
        <Box sx={{ height: "4px", bgcolor: "secondary.main" }}></Box>
        <Footer />
      </Box>
    </>
  );
}
