import axios from "axios";

const sendNewReply = ({ message, to, mailId }) => {
  const result = axios({
    method: "post",
    url: "http://localhost:6969/reply",
    data: {
      message,
      to,
      mailId,
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

export default sendNewReply;
