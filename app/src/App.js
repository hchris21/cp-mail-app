import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login, Register, Inbox, Sent, Mail, ViewMail } from "./components";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoggedIn = (isLoggedIn) => {
    setLoggedIn(isLoggedIn);
  };

  return (
    <Router>
      <Switch>
        <Route path="/inbox">
          <Inbox isLoggedIn={loggedIn} />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/sent">
          <Sent isLoggedIn={loggedIn} />
        </Route>
        <Route path="/mail">
          <Mail isLoggedIn={loggedIn} />
        </Route>
        <Route path="/viewmail">
          <ViewMail />
        </Route>
        <Route path="/">
          <Login setLoggedIn={handleLoggedIn} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
