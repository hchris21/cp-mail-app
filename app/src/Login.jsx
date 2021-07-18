import React from "react";
import { TextField } from "@material-ui/core";

const Login = () => {
  return (
    <form class="login-form">
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        margin="normal"
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        margin="normal"
      />
    </form>
  );
};

export default Login;
