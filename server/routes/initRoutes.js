const bodyParser = require("body-parser");
const cors = require("cors");
const userController = require("../controllers/userController");
const mailController = require("../controllers/mailController");
const verifyToken = require("../middlewares/authenticate");

module.exports = function initRoutes(app) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.post("/register", userController.register);
  app.post("/login", userController.login);
  app.get("/tokentest", [verifyToken], mailController.get);

  app.get("/", (req, res) => {
    res.status(200).send({ message: "Hello there!" });
  });
};
