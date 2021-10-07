const getCurrentUser = (prevPath, mail) => {
  if (prevPath === "/sent") {
    return { email: mail.from };
  } else {
    return { email: mail.to };
  }
};

export default getCurrentUser;
