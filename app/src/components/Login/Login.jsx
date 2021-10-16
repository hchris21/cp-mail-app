import React, { useReducer } from "react";
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
import { loginReducer, initialState } from "./loginReducer";
import fetchLogin from "../../core/fetchLogin";

const Login = (props) => {
  const classes = useLoginStyles();
  const history = useHistory();
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { email, password, error } = state;

  const handleChange = (inputName) => (e) => {
    dispatch({ type: inputName, payload: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetchLogin({ email, password });

    if (response.status === 200) {
      props.setLoggedIn(true);
      history.push("/inbox");
    } else {
      dispatch({ type: "error", payload: response.message });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            autoComplete="email"
            data-testid="email-input"
            id="email"
            label="Email"
            margin="normal"
            name="email"
            onChange={handleChange("email")}
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
            data-testid="password-input"
            id="password"
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange("password")}
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
            data-testid="remember-me-checkbox"
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            data-testid="submit-button"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item>
              <Link
                variant="body2"
                data-testid="register-link"
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
