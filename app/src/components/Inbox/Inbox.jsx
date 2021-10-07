import React from "react";
import { useHistory } from "react-router-dom";
import { MailTable, Navbar } from "../";

const Inbox = ({ isLoggedIn }) => {
  const history = useHistory();
  if (!isLoggedIn) history.push("/");
  return (
    <>
      <Navbar />
      <MailTable isInbox={true} />
    </>
  );
};

export default Inbox;
