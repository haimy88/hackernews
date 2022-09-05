import React from "react";
import Banner from "../components/Banner";
import { Box, Button } from "@mui/material";
import TopArticles from "../components/TopArticles";

export default function Home() {
  return (
    <>
      <Banner />
      <TopArticles />
      <Box>
        <Button sx={{ borderRadius: "0" }}>Button</Button>
      </Box>
    </>
  );
}
