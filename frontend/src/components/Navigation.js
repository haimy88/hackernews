import React from "react";
import { Box, List, ListItem, ListItemText, Divider } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navigation(props) {
  const { homeActive, starredActive } = props;

  const listStyle = {
    fontSize: 14,
    color: "primary.main",
    pl: 0.8,
    pr: 0.8,
    fontFamily: "Open Sans",
    fontWeight: "400",
  };

  const activeStyle = {
    ...listStyle,
    fontWeight: "800",
    color: "secondary.main",
  };

  return (
    <Box>
      <List
        disablePadding
        sx={{ display: "flex", fontSize: 14, fontWeight: "bold" }}
      >
        <ListItem component={Link} to="/" disablePadding={true}>
          <ListItemText
            primaryTypographyProps={homeActive ? activeStyle : listStyle}
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
        <ListItem component={Link} to="/starred" disablePadding={true}>
          <ListItemText
            primary="starred"
            primaryTypographyProps={starredActive ? activeStyle : listStyle}
          />
        </ListItem>
      </List>
    </Box>
  );
}
