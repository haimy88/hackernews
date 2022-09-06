import React from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { Box, Button } from "@mui/material";

export default function Starred() {
  const starredActive = true;

  return (
    <>
      <Box sx={{ height: "4px", bgcolor: "secondary.main" }}></Box>
      <Box sx={{ ml: "90px", mr: "90px" }}>
        <Banner starredActive={starredActive} />
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          sx={{ borderRadius: 0, color: "white", ml: "38px", mb: "60px" }}
        >
          Email Yourself The Articles
        </Button>
        <Box sx={{ height: "4px", bgcolor: "secondary.main" }}></Box>
        <Footer />
      </Box>
    </>
  );
}
