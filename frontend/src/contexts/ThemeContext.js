import React, { useContext, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material/";

const ThemeContext = React.createContext();

export function useThemeContext() {
  return useContext(ThemeContext);
}

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#000000",
      light: "rgba(0, 0, 0, 0.5)",
    },
    secondary: {
      main: "#FE7139",
    },
    background: {
      default: "#FFFFFF",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
      light: "rgba(255, 255, 255, 0.5)",
    },
    secondary: {
      main: "#FE7139",
    },
    background: {
      default: "#1E2025",
    },
  },
});

export function ThemeContextProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      <ThemeProvider theme={currentTheme === "light" ? lightTheme : darkTheme}>
        <CssBaseline /> {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
