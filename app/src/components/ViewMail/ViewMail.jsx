import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Navbar } from "../";
import useReplyFetch from "./useReplyFetch";
import sendNewReply from "../../core/sendReply";
import {
  Box,
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
  TextField,
} from "@material-ui/core";
import useViewMailStyles from "./makeViewMailStyles";
import formatDate from "../../helpers/formatDate";
import getCurrentUser from "../../helpers/getCurrentUser";

const ViewMail = ({ isLoggedIn }) => {
  const history = useHistory();
  if (!isLoggedIn) history.push("/");

  const classes = useViewMailStyles();
  const [sendReply, setSendReply] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  const { prevPath, mail } = history.location.state;
  const { id, subject } = mail;
  const { email: currentUserEmail } = getCurrentUser(prevPath, mail);
  const { replies } = useReplyFetch(id);

  const inputs = [];
  inputs.push(mail);
  if (replies) {
    replies.forEach((reply) => {
      inputs.push(reply);
    });
  }
  inputs.reverse();

  const handleMessageChange = (e) => {
    setReplyMessage(e.target.value);
  };

  const handleSubmit =
    ({ to, message }) =>
    async (e) => {
      e.preventDefault();
      const response = await sendNewReply({ to, message, mailId: id });

      if (response.status === 200) {
        history.push(prevPath);
      }
    };

  const mailCard = ({ from, date, to, message, index }) => {
    return (
      <Card className={classes.mailCard} variant="outlined">
        <Box>
          <CardContent>
            <Typography className={classes.boldText}>{from}</Typography>
            <Typography className={classes.normalText}>{date}</Typography>
            <Typography className={classes.boldText}>To: {to}</Typography>
            <Typography className={classes.normalText}>{message}</Typography>
          </CardContent>
          {index === 0 && !sendReply && (
            <CardActions>
              <Button size="medium" onClick={() => setSendReply(true)}>
                Reply
              </Button>
            </CardActions>
          )}
          {index === 0 && sendReply && (
            <Card className={classes.mailCard} variant="outlined">
              <Box>
                <CardContent>
                  <Typography className={classes.boldText}>
                    To: {currentUserEmail === from ? to : from}
                  </Typography>
                  <TextField
                    sx={{ height: "100px" }}
                    id="replyMessage"
                    label="Message"
                    margin="normal"
                    name="replyMessage"
                    multiline
                    minRows={8}
                    maxRows={8}
                    onChange={handleMessageChange}
                    value={replyMessage}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                    fullWidth
                  />
                  <Box className={classes.buttonsWrapper}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={handleSubmit({
                        to: currentUserEmail === from ? to : from,
                        message: replyMessage,
                      })}
                    >
                      Send
                    </Button>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="secondary"
                      className={classes.submit}
                    >
                      Discard
                    </Button>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          )}
        </Box>
      </Card>
    );
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          marginLeft: "10vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
        }}
      >
        <Typography variant="h4">Subject: {subject}</Typography>
      </Box>
      {inputs.map((input, index) => (
        <Box
          key={`${input.id}-${index}`}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "80vw",
          }}
        >
          {mailCard({
            from: input.from,
            date: formatDate(input.createdAt, true),
            to: input.to,
            message: input.message,
            index,
          })}
        </Box>
      ))}
    </>
  );
};

export default ViewMail;
