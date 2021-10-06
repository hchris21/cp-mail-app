const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userController = require("../controllers/userController");
const mailController = require("../controllers/mailController");
const verifyToken = require("../middlewares/authenticate");

module.exports = function initRoutes(app) {
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  // User
  app.post("/register", userController.register);
  app.post("/login", userController.login);

  // Mail
  app.post("/sendmail", [verifyToken], mailController.sendMail);
  app.get("/outbox", [verifyToken], mailController.getSentMails);
  app.get("/inbox", [verifyToken], mailController.getReceivedMails);

  // Reply
  app.post("/reply", [verifyToken], mailController.sendReply);
  app.get("/replies", [verifyToken], mailController.getRepliesByMailId);

  app.get("/", (req, res) => {
    res.status(200).send({ message: "Hello there!" });
  });
};
