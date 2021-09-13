const Sequelize = require("sequelize");

const sequelize = new Sequelize("cp-mail", "root", "costarica2", {
  dialect: "mysql",
  host: "localhost",
});

sequelize.sync().then(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection established.");
  } catch (err) {
    console.error("Unable to connect to the db.", err);
  }
});

module.exports = sequelize;
