import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
      </div>

      <Switch>
        <Route path="/login">
          <ErrorBoundary>
            <Login />
          </ErrorBoundary>
        </Route>
        <Route path="/register">
          <ErrorBoundary>
            <Register />
          </ErrorBoundary>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
