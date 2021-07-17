const express = require("express");
const app = express();
const port = 3000;

const sequelize = require("./utils/database");

const User = require("./models/User");
const Mail = require("./models/Mail");

User.hasMany(Mail);

let userId = null;

app.get("/", (req, res) => {
  sequelize
    .sync({ force: true })
    .then((result) => {
      return User.create({
        name: "Chris Horn",
        email: "hornchris21@yahoo.com",
      });
    })
    .then((user) => {
      userId = user.id;
      console.log("Customer created", user);
      return user.createMail({
        from: `${user.email}`,
        to: "testto@ymail.com",
        message: "Hello",
      });
    })
    .then((mail) => {
      console.log("Mail created", mail);
      return Mail.findAll({ where: { userId: userId } });
    })
    .then((mails) => {
      console.log(mails);
    })
    .catch((err) => console.log(err));

  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
