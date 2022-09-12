import React from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import StarredArticles from "../components/StarredArticles";
import { Box } from "@mui/material";

export default function Starred() {
  const starredActive = true;

  return (
    <>
      <Box sx={{ height: "4px", bgcolor: "secondary.main" }}></Box>
      <Box sx={{ ml: "90px", mr: "90px" }}>
        <Banner starredActive={starredActive} />
        <StarredArticles />
        <Box
          sx={{ height: "4px", bgcolor: "secondary.main", mt: "50px" }}
        ></Box>
        <Footer />
      </Box>
    </>
  );
}
