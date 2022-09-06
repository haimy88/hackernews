import React, { useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import StarUnfilledLight from "../images/star_unfilled_light.svg";
import StarUnfilledDark from "../images/star_unfilled_dark.svg";
import { useThemeContext } from "../contexts/ThemeContext";
import { useSelector } from "react-redux";
import { getArticleData } from "../features/DisplayedArticles";

export default function TopArticles() {
  const { currentTheme } = useThemeContext();

  const displayedArticles = useSelector((state) => state.articles.value);

  const sourceRegex = new RegExp("([a-zA-Z]+(.[a-zA-Z]+)+)");

  const dividerStyle = {
    height: "10px",
    borderRightWidth: 1,
    borderColor: "primary.light",
    ml: 1,
    mr: 1,
  };

  return (
    <>
      <List
        sx={{
          listStyleType: "num",
          fontFamily: "helvetica",
          color: "primary.light",
          fontSize: "18px",
          mt: "40px",
        }}
      >
        {displayedArticles.map((item) => (
          <ListItem
            sx={{
              display: "list-item",
              ml: "38px",
              mr: -20,
              fontFamily: "ubuntu Mono",
            }}
          >
            <ListItemText
              sx={{ ml: "-15px" }}
              primary={
                <React.Fragment>
                  {item.title}
                  <Typography
                    sx={{
                      display: "inline",
                      pl: 1,
                      fontWeight: 400,
                    }}
                    component="span"
                    variant="type2"
                    color="primary.light"
                  >
                    {item.url}
                  </Typography>
                </React.Fragment>
              }
              primaryTypographyProps={{
                fontWeight: 700,
                color: "primary.main",
              }}
              secondary={
                <React.Fragment>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      component="span"
                      variant="type2"
                      color="primary.light"
                    >
                      {item.score} points by {item.by}{" "}
                      {Math.round((Date.now() / 1000 - item.time) / 3600)} hours
                      ago
                    </Typography>
                    <Divider
                      orientation="vertical"
                      flexItem
                      variant="middle"
                      sx={dividerStyle}
                    />
                    <Typography
                      component="span"
                      variant="type2"
                      color="primary.light"
                    >
                      {item.descendants} comments
                    </Typography>
                    <Divider
                      orientation="vertical"
                      flexItem
                      variant="middle"
                      sx={dividerStyle}
                    />
                    <IconButton
                      sx={{
                        p: 0,
                        mr: 0.5,
                      }}
                    >
                      <img
                        className="star"
                        src={
                          currentTheme === "light"
                            ? StarUnfilledLight
                            : StarUnfilledDark
                        }
                      />
                    </IconButton>
                    <Typography
                      component="span"
                      variant="type2"
                      color="primary.light"
                    >
                      save
                    </Typography>
                  </Box>
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
