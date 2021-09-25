import axios from "axios";

const fetchLogin = (loginData) => {
  const { email, password } = loginData;

  if (!email || !password) {
    return "Both email and password are needed!";
  }

  axios({
    method: "post",
    url: "http://localhost:5000/login",
    data: {
      email,
      password,
    },
  }).then((response) => {
    console.log(response);
    return response;
  });
};

export default fetchLogin;
