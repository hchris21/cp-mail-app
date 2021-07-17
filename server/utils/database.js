const Sequelize = require("sequelize");

const sequelize = new Sequelize("cp-mail", "root", "costarica2", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
