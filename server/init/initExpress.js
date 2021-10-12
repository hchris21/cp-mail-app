const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("express-async-errors");

module.exports = function initExpress(app) {
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
};
