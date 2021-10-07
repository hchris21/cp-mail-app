import React from "react";
import { MailTable, Navbar } from "../";
import { useHistory } from "react-router-dom";

const Sent = ({ isLoggedIn }) => {
  const history = useHistory();
  if (!isLoggedIn) history.push("/");

  return (
    <>
      <Navbar />
      <MailTable isInbox={false} />;
    </>
  );
};

export default Sent;
