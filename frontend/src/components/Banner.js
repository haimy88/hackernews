import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import Logo from "../images/logo.svg";
import Moon from "../images/moon.svg";
import Sun from "../images/sun.svg";
import ReactSwitch from "react-switch";
import { useThemeContext } from "../contexts/ThemeContext";

export default function Banner() {
  const { currentTheme, setCurrentTheme } = useThemeContext();

  const toggleTheme = () => {
    setCurrentTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

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
      <Box sx={{ height: "4px", bgcolor: "secondary.main" }}></Box>
      <Box sx={{ height: "33px", mt: "49px", ml: "90px", display: "flex" }}>
        <img src={Logo}></img>
        <Typography
          align="left"
          variant="h5"
          sx={{
            ml: "17px",
            fontWeight: "800",
            color: "primary.main",
            width: 161,
            fontFamily: "Open Sans",
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
              light="false"
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
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              p: 1,
              mr: 6,
            }}
          >
            <img
              src={currentTheme === "light" ? Moon : Sun}
              className="light_dark_icon"
            ></img>
            <ReactSwitch
              onChange={toggleTheme}
              checked={currentTheme === "dark"}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
