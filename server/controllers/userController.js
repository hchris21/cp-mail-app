const jwt = require("jsonwebtoken");

const config = require("../config/config");
const db = require("../utils/database");
const User = db.users;

exports.register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  const userAlreadyRegistered = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.error("Error: ", err);
    }
  );

  if (userAlreadyRegistered) {
    return res
      .status(409)
      .send({ message: "User already registered with this email" });
  }

  const newUser = new User({ first_name, last_name, email, password });

  const savedUser = await newUser.save().catch((err) => {
    console.error("Error: ", err);
    return res
      .status(500)
      .send({ message: "Cannot register user with this email" });
  });

  if (savedUser)
    return res.status(200).send({ message: "User registered successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res
      .status(400)
      .send({ message: "Both email and password are required!" });
  }

  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password)
    return res
      .status(400)
      .send({ message: "Provided email and/or password do not match!" });

  const jwtToken = jwt.sign(
    { id: user.id, email: user.email },
    config.jwtSecret
  );

  return res
    .cookie("jwt_token", jwtToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    })
    .status(200)
    .send({ message: "Welcome back!" });
};
