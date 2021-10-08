import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Navbar } from "../";
import useMailStyles from "./makeMailStyles";
import sendMail from "../../core/sendMail";

export const Mail = ({ isLoggedIn }) => {
  const classes = useMailStyles();
  const history = useHistory();
  if (!isLoggedIn) history.push("/");

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleToChange = (e) => {
    setTo(e.target.value);
  };
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await sendMail({ to, subject, message });

    if (response.status === 200) {
      history.push("/sent");
    } else {
      setError(response.message);
    }
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              id="to"
              label="To"
              margin="normal"
              name="to"
              onChange={handleToChange}
              value={to}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              autoFocus
              fullWidth
              required
            />
            <TextField
              id="subject"
              label="Subject"
              margin="normal"
              name="subject"
              onChange={handleSubjectChange}
              value={subject}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              required
              fullWidth
            />
            <TextField
              sx={{ height: "100px" }}
              id="message"
              label="Message"
              margin="normal"
              name="message"
              multiline
              minRows={10}
              maxRows={25}
              onChange={handleMessageChange}
              value={message}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              required
              fullWidth
            />
            {error && (
              <Box
                sx={{
                  color: "red",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {error}
              </Box>
            )}
            <Box className={classes.buttonsWrapper}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Send
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={() => history.push("/inbox")}
              >
                Discard
              </Button>
            </Box>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Mail;
