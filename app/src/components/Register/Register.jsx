import React, { useState } from "react";
import { Button, Container, CssBaseline, TextField } from "@material-ui/core";
import useRegisterStyles from "./makeRegisterStyles";

const Login = () => {
  const classes = useRegisterStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleOnSubmit} noValidate>
          <TextField
            autoComplete="email"
            id="email"
            label="Email"
            margin="normal"
            name="email"
            onChange={handleEmailChange}
            value={email}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            autoFocus
            fullWidth
            required
          />
          <TextField
            autoComplete="current-password"
            id="password"
            label="Password"
            margin="normal"
            name="password"
            onChange={handlePasswordChange}
            type="password"
            value={password}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            required
            fullWidth
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
