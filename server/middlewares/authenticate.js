const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = verifyJwt = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "To access this page you need an authentication token!",
    });
  }

  jwt.verify(token, config.jwtSecret, (error, decoded) => {
    if (error) {
      return res
        .status(401)
        .send({ message: "You are not authorized to access this page!" });
    }
    req.userId = decoded.id;
    next();
  });
};