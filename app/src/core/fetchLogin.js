import axios from "axios";

const fetchLogin = (loginData) => {
  const { email, password } = loginData;

  if (!email || !password) {
    return "Both email and password are needed!";
  }

  const result = axios({
    method: "post",
    url: "http://localhost:5000/login",
    data: {
      email,
      password,
    },
    withCredentials: true,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });

  return result;
};

export default fetchLogin;
