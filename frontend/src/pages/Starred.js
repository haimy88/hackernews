import React, { useEffect } from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import StarredArticles from "../components/StarredArticles";
import { Box, Button } from "@mui/material";
import axios from "axios";

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
