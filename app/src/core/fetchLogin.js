import axios from "axios";

const fetchLogin = (loginData) => {
  const { email, password } = loginData;

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
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    });

  return result;
};

export default fetchLogin;
