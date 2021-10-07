import React, { useState, useRef, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import { DeleteSharp as DeleteIcon } from "@material-ui/icons";
import formatDate from "../../helpers/formatDate";
import deleteMail from "../../core/deleteMail";
import useMailFetch from "./useMailFetch";

const MailTable = ({ isInbox }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [pageNumber, setPageNumber] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const toOrFrom = isInbox ? "from" : "to";

  const { isLoading, error, mails, hasMore } = useMailFetch(
    pageNumber,
    isInbox
  );

  const observer = useRef();
  const lastMailElementRef = useCallback(
    (element) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (element) observer.current.observe(element);
    },
    [isLoading, hasMore]
  );

  const handleDelete = async (mailId) => {
    setIsDeleting(true);

    await deleteMail(mailId);
    mails.length = 0;
    setPageNumber(0);
    setIsDeleting(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">{isInbox ? "From" : "To"}</TableCell>
              <TableCell align="center">Subject</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mails.map((mail, index) => {
              if (mails.length === index + 1) {
                return (
                  <TableRow
                    key={`${mail.id}-${mail.createdAt}`}
                    sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
                    ref={lastMailElementRef}
                  >
                    <TableCell
                      align="center"
                      onClick={() => {
                        history.push("/viewmail", {
                          mail,
                          prevPath: pathname,
                        });
                      }}
                    >
                      {mail[toOrFrom]}
                    </TableCell>
                    <TableCell align="center">{mail.subject}</TableCell>
                    <TableCell align="center">
                      {formatDate(mail.createdAt)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={() => handleDelete(mail.id)}
                      >
                        {isDeleting ? <CircularProgress /> : <DeleteIcon />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              } else {
                return (
                  <TableRow
                    key={`${mail.id}-${mail.createdAt}`}
                    sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
                  >
                    <TableCell
                      align="center"
                      onClick={() => {
                        history.push("/viewmail", { mail });
                      }}
                    >
                      {mail[toOrFrom]}
                    </TableCell>
                    <TableCell align="center">{mail.subject}</TableCell>
                    <TableCell align="center">
                      {formatDate(mail.createdAt)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={() => handleDelete(mail.id)}
                      >
                        {isDeleting ? <CircularProgress /> : <DeleteIcon />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        {isLoading && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </div>
      <div>
        {error && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "50px",
              fontWeight: "bold",
            }}
          >
            {error}
          </Box>
        )}
      </div>
    </>
  );
};

export default MailTable;
