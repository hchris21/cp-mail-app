import axios from "axios";

const fetchRegister = (registerData) => {
  const { firstName, lastName, email, password } = registerData;

  const result = axios({
    method: "post",
    url: "http://localhost:6969/register",
    data: {
      first_name: firstName,
      last_name: lastName,
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

export default fetchRegister;
