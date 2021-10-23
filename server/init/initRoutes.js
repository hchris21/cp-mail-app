const userController = require("../controllers/userController");
const mailController = require("../controllers/mailController");
const verifyToken = require("../middlewares/authenticate");

module.exports = function initRoutes(app) {
  // User
  app.post("/register", userController.register);
  app.post("/login", userController.login);

  // Mail
  app.post("/sendmail", [verifyToken], mailController.sendMail);
  app.get("/outbox", [verifyToken], mailController.getSentMails);
  app.get("/inbox", [verifyToken], mailController.getReceivedMails);
  app.delete("/deleteMail", [verifyToken], mailController.deleteMail);

  // Reply
  app.post("/reply", [verifyToken], mailController.sendReply);
  app.get("/replies", [verifyToken], mailController.getRepliesByMailId);

  app.get("/", (req, res) => {
    res.status(200).send({ message: "Hello there!" });
  });

  app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({ message: err.message });
  });
};
