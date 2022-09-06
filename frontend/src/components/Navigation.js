import React from "react";
import { Box, List, ListItem, ListItemText, Divider } from "@mui/material";

export default function Navigation() {
  const listStyle = {
    fontSize: 14,
    color: "primary.main",
    pl: 0.8,
    pr: 0.8,
    fontFamily: "Open Sans",
    fontWeight: "400",
  };

  return (
    <Box>
      <List
        disablePadding={true}
        sx={{ display: "flex", fontSize: 14, fontWeight: "bold" }}
      >
        <ListItem button disablePadding={true}>
          <ListItemText primaryTypographyProps={listStyle} primary="latest" />
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
        <ListItem button disablePadding={true}>
          <ListItemText primary="starred" primaryTypographyProps={listStyle} />
        </ListItem>
      </List>
    </Box>
  );
}
