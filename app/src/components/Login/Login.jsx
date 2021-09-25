import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
} from "@material-ui/core";
import useLoginStyles from "./makeLoginStyles";
import fetchLogin from "../../core/fetchLogin";

const Login = () => {
  const classes = useLoginStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("I am clicked", email, password);
    fetchLogin({ email, password });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit}>
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Register here"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
