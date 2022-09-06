import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";

export default function Footer() {
  const listStyle = {
    fontSize: 14,
    color: "primary.main",
    pl: 0.8,
    pr: 0.8,
    fontFamily: "Open Sans",
    fontWeight: "400",
  };

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
        <Box>
          <List
            disablePadding={true}
            sx={{ display: "flex", fontSize: 14, fontWeight: "bold" }}
          >
            <ListItem button disablePadding={true}>
              <ListItemText
                primaryTypographyProps={listStyle}
                primary="latest"
              />
            </ListItem>
            <Divider
              orientation="vertical"
              flexItem
              variant="middle"
              sx={{
                height: "15px",
                borderRightWidth: 1.4,
                borderColor: "primary.main",
              }}
            />
            <ListItem disablePadding={true}>
              <ListItemText
                primary="starred"
                primaryTypographyProps={listStyle}
              />
            </ListItem>
          </List>
        </Box>
      </Box>
    </>
  );
}
