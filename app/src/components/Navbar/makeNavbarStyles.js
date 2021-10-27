import { makeStyles } from "@material-ui/core";
import { alpha } from "@material-ui/core/styles";

const useNavbarStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIconWrapper: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchInputBase: {
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 5),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  more: {
    [theme.breakpoints.between("xs", "sm")]: {
      display: "flex",
    },
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  drawer: {
    "& .MuiDrawer-paper": {
      width: "15vw",
    },
  },
}));

export default useNavbarStyles;
