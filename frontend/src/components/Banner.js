import React from "react";
import Navigation from "../components/Navigation";
import { Box } from "@mui/material";
import Logo from "../images/logo.svg";
import LogoWordsLight from "../images/logowordslight.svg";
import LogoWordsDark from "../images/logowordsdark.svg";
import Moon from "../images/moon.svg";
import Sun from "../images/sun.svg";
import ReactSwitch from "react-switch";
import { useThemeContext } from "../contexts/ThemeContext";

export default function Banner(props) {
  const { homeActive, starredActive } = props;
  const { currentTheme, setCurrentTheme } = useThemeContext();

  const toggleTheme = () => {
    setCurrentTheme((curr) => (curr === "light" ? "dark" : "light"));
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
        <Navigation homeActive={homeActive} starredActive={starredActive} />
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
