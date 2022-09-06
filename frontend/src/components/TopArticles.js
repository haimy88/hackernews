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
import StarUnfilled from "../images/star_unfilled.svg";

export default function TopArticles() {
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
        <ListItem
          sx={{
            display: "list-item",
            ml: "38px",
            mr: -20,
            fontFamily: "ubuntu Mono",
          }}
        >
          <ListItemText
            sx={{ ml: "-10px" }}
            primary={
              <React.Fragment>
                {"Physicicsts Create A crystal from electrons"}
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
                  (quantummagazine.org)
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
                    284 poitns by john doe one hour ago
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
                    284 poitns by john doe one hour ago
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
                    <img className="star" src={StarUnfilled} />
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
      </List>
    </>
  );
}
