import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Drawer,
} from "@material-ui/core";
import {
  EditSharp as EditIcon,
  ExitToAppSharp as ExitIcon,
  MailSharp as MailIcon,
  Search as SearchIcon,
  SendSharp as SendIcon,
  Menu as MenuIcon,
} from "@material-ui/icons";
import useNavbarStyles from "./makeNavbarStyles";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const classes = useNavbarStyles();
  const history = useHistory();
  const [isAnchorOpen, setIsAnchorOpen] = useState(false);

  const openDrawer = () => {
    setIsAnchorOpen(true);
  };

  const closeDrawer = () => {
    setIsAnchorOpen(false);
  };

  const renderItems = (
    <>
      <IconButton
        size="medium"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={() => history.push("/inbox")}
      >
        <MailIcon />
      </IconButton>
      <IconButton
        size="medium"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={() => history.push("/sent")}
      >
        <SendIcon />
      </IconButton>
      <IconButton
        size="medium"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={() => history.push("/mail")}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        size="medium"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={() => {
          document.cookie = "";
          history.push("/");
        }}
      >
        <ExitIcon />
      </IconButton>
    </>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              className={classes.title}
              variant="h6"
              noWrap
              component="div"
            >
              CP MAIL
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIconWrapper}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                className={classes.searchInputBase}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              {renderItems}
            </Box>
            <Box className={classes.more}>
              <IconButton
                size="medium"
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
                onClick={openDrawer}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        className={classes.drawer}
        anchor="right"
        open={isAnchorOpen}
        onClose={closeDrawer}
      >
        {renderItems}
      </Drawer>
    </>
  );
};

export default Navbar;
