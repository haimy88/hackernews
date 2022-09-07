import React, { useContext, useState } from "react";
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
  typography: {
    fontFamily: "ubuntu Mono",
    fontSize: "18px",
    type1: {
      fontFamily: "Open Sans",
    },
    type2: {
      fontFamily: "Open Sans",
      fontSize: "10px",
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
  typography: {
    fontFamily: "Ubuntu Mono",
    fontSize: "18px",
    type1: {
      fontFamily: "Open Sans",
    },
    type2: {
      fontFamily: "Open Sans",
      fontSize: "10px",
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
