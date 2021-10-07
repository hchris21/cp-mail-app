import axios from "axios";

const deleteMail = (mailId) => {
  const result = axios({
    method: "delete",
    url: "http://localhost:5000/deleteMail",
    data: {
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

export default deleteMail;
