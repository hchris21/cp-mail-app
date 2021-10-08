import React, { useState } from "react";
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

const Login = () => {
  const classes = useRegisterStyles();
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
      setError(response.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleOnSubmit}>
          <TextField
            autoComplete="first-name"
            id="first-name"
            label="First name"
            margin="normal"
            name="first-name"
            onChange={handleFirstNameChange}
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
            id="last-name"
            label="Last name"
            margin="normal"
            name="last-name"
            onChange={handleLastNameChange}
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
