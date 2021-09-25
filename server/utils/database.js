const Sequelize = require("sequelize");
const config = require("../config/config");

const sequelize = new Sequelize(
  config.dbName,
  config.dbRoot,
  config.dbPassword,
  {
    dialect: config.sequelizeDialect,
    host: config.sequelizeHost,
  }
);

sequelize.sync().then(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection established.");
  } catch (err) {
    console.error("Unable to connect to the db.", err);
  }
});

module.exports = sequelize;
