const jwt = require("jsonwebtoken");
const config = require("../env");

module.exports = verifyJwt = (req, res, next) => {
  const { cookies } = req;

  if (!cookies.jwt_token) {
    return res.status(403).send({
      message: "To access this page you need an authentication token!",
    });
  }

  jwt.verify(cookies.jwt_token, config.jwtSecret, (error, decoded) => {
    if (error) {
      return res
        .status(401)
        .send({ message: "You are not authorized to access this page!" });
    }
    req.userId = decoded.id;
    req.email = decoded.email;
    next();
  });
};
