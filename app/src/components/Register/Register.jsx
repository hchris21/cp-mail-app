import React, { useReducer } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Box,
  Container,
  CssBaseline,
  TextField,
} from "@material-ui/core";
import useRegisterStyles from "./makeRegisterStyles";
import fetchRegister from "../../core/fetchRegister";
import { initialState, registerReducer } from "./registerReducer";

const Login = () => {
  const classes = useRegisterStyles();
  const history = useHistory();

  const [state, dispatch] = useReducer(registerReducer, initialState);
  const { firstName, lastName, email, password, error } = state;

  const handleChange = (inputName) => (e) => {
    dispatch({ type: inputName, payload: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetchRegister({
      firstName,
      lastName,
      email,
      password,
    });

    if (response.status === 200) {
      history.push("/");
    } else {
      dispatch({ type: "error", payload: response.message });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleOnSubmit}>
          <TextField
            autoComplete="first-name"
            data-testid="first-name-input"
            id="first-name"
            label="First name"
            margin="normal"
            name="first-name"
            onChange={handleChange("firstname")}
            value={firstName}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            autoFocus
            fullWidth
            required
          />
          <TextField
            autoComplete="last-name"
            data-testid="last-name-input"
            id="last-name"
            label="Last name"
            margin="normal"
            name="last-name"
            onChange={handleChange("lastname")}
            value={lastName}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            autoFocus
            fullWidth
            required
          />
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
          <Button
            type="submit"
            data-testid="submit-button"
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
