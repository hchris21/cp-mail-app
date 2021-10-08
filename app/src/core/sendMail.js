import axios from "axios";

const sendMail = ({ to, subject, message }) => {
  const result = axios({
    method: "post",
    url: "http://localhost:5000/sendmail",
    data: {
      to,
      subject,
      message,
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

export default sendMail;
