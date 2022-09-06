import React from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { Box, Button } from "@mui/material";
import TopArticles from "../components/TopArticles";

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";

export default function Home() {
  return (
    <>
      <Box sx={{ height: "4px", bgcolor: "secondary.main" }}></Box>
      <Box sx={{ ml: "90px", mr: "90px" }}>
        <Banner />
        <TopArticles />
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          sx={{ borderRadius: 0, color: "white", ml: "38px", mb: "60px" }}
        >
          Show More
        </Button>
        <Box sx={{ height: "4px", bgcolor: "secondary.main" }}></Box>
        <Footer />
      </Box>
    </>
  );
}
