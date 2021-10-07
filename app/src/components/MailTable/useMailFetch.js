import { useEffect, useState } from "react";
import axios from "axios";

const useMailFetch = (pageNumber, isInbox) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [mails, setMails] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    axios({
      method: "GET",
      url: `http://localhost:5000/${isInbox ? "inbox" : "outbox"}`,
      params: { page: pageNumber, limit: 15 },
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.message) {
          throw new Error(response.data.message);
        }
        setMails((prevMails) => {
          return [...prevMails, ...response.data.rows];
        });
        setHasMore(response.data.rows.length > 0);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, [isInbox, pageNumber]);

  return { isLoading, error, mails, hasMore };
};

export default useMailFetch;
