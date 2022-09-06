import React from "react";
import Navigation from "../components/Navigation";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <>
      <Box
        sx={{
          height: "33px",
          mt: "27px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="type1"
          sx={{
            fontWeight: 700,
            fontSize: "16px",
            mb: "12px",
            color: "primary.main",
          }}
        >
          Hacker News
        </Typography>
        <Navigation />
      </Box>
    </>
  );
}
