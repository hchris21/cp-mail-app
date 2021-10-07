import { useEffect, useState } from "react";
import axios from "axios";

const useReplyFetch = (mailId) => {
  const [error, setError] = useState("");
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:5000/replies",
      params: { mailId },
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.message) {
          throw new Error(response.data.message);
        }
        setReplies((prevReplies) => {
          return [...prevReplies, ...response.data];
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [mailId]);

  return { replies, error };
};

export default useReplyFetch;
