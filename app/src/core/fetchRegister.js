import axios from "axios";

const fetchRegister = (registerData) => {
  const { firstName, lastName, email, password } = registerData;

  if (!email || !password) {
    return "Both email and password are needed!";
  }

  if (!firstName || !lastName) {
    return "Both first and last name are needed!";
  }

  const result = axios({
    method: "post",
    url: "http://localhost:5000/register",
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
      return error;
    });

  return result;
};

export default fetchRegister;
