import { makeStyles } from "@material-ui/core";

const useViewMailStyles = makeStyles((theme) => ({
  mailCard: {
    width: "80vw",
  },
  boldText: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  normalText: {
    fontSize: "14px",
  },
  buttonsWrapper: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttons: {
    padding: "10px",
  },
}));

export default useViewMailStyles;
