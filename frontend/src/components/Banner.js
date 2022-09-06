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
import LogoWordsLight from "../images/logowordslight.svg";
import LogoWordsDark from "../images/logowordsdark.svg";
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
      <Box
        sx={{
          height: "33px",
          mt: "49px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src={Logo}></img>
        {currentTheme === "light" && (
          <img src={LogoWordsLight} className="logo_words"></img>
        )}
        {currentTheme === "dark" && (
          <img src={LogoWordsDark} className="logo_words"></img>
        )}
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
