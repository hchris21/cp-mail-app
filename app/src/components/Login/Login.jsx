import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Box,
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

const Login = (props) => {
  const classes = useLoginStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetchLogin({ email, password });

    if (response.status === 200) {
      props.setLoggedIn(true);
      history.push("/inbox");
    } else {
      setError("Provided email and/or password do not match!");
    }
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
              <Link
                variant="body2"
                onClick={() => {
                  history.push("/register");
                }}
              >
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
