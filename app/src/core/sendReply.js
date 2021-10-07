import axios from "axios";

const sendNewReply = ({ message, to, mailId }) => {
  const result = axios({
    method: "post",
    url: "http://localhost:5000/reply",
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
      return error;
    });

  return result;
};

export default sendNewReply;