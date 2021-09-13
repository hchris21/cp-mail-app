const bodyParser = require("body-parser");
const userController = require("../controllers/userController");

module.exports = function initRoutes(app) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.post("/register", userController.register);
  app.post("/login", userController.login);

  app.get("/", (req, res) => {
    res.status(200).send({ message: "Hello there!" });
  });
};
