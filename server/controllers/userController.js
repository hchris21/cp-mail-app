const jwt = require("jsonwebtoken");

const User = require("../models/User");
const config = require("../config/config");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const userAlreadyRegistered = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.error("Error: ", err);
    }
  );

  if (userAlreadyRegistered)
    res
      .status(409)
      .send({ message: "User already registered with this email" });

  const newUser = new User({ name, email, password });

  const savedUser = await newUser.save().catch((err) => {
    console.error("Error: ", err);
    res.status(500).send({ message: "Cannot register user with this email" });
  });

  if (savedUser)
    res.status(200).send({ message: "User registered successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    res.status(400).send({ message: "Both email and password are required!" });
  }

  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password)
    res
      .status(400)
      .send({ message: "Provided email and/or password do not match!" });

  const jwToken = jwt.sign(
    { id: user.id, email: user.email },
    config.jwtSecret
  );

  res.status(200).send({ message: "Welcome back!", token: jwToken });
};
