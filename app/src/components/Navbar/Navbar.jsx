import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
} from "@material-ui/core";
import {
  EditSharp as EditIcon,
  ExitToAppSharp as ExitIcon,
  MailSharp as MailIcon,
  Search as SearchIcon,
  SendSharp as SendIcon,
} from "@material-ui/icons";
import useNavbarStyles from "./makeNavbarStyles";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const classes = useNavbarStyles();
  const history = useHistory();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" }, flex: 1 }}
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
          <Box>
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
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
