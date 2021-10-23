const Sequelize = require("sequelize");
const config = require("../env");

const sequelizeSetup =
  process.env.NODE_ENV === "test"
    ? {
        dialect: config.sequelizeDialect,
        host: config.sequelizeHost,
        logging: false,
      }
    : {
        dialect: config.sequelizeDialect,
        host: config.sequelizeHost,
      };

const sequelize = new Sequelize(
  config.dbName,
  config.dbRoot,
  config.dbPassword,
  sequelizeSetup
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/User")(sequelize, Sequelize);
db.mails = require("../models/Mail")(sequelize, Sequelize);
db.replies = require("../models/Reply")(sequelize, Sequelize);

// User - Mail association
db.users.hasMany(db.mails, { as: "mails" });
db.mails.belongsTo(db.users, { foreignKey: "userId", as: "user" });

// Mail - Replies association
db.mails.hasMany(db.replies, { as: "replies" });
db.replies.belongsTo(db.mails, { foreignKey: "mailId", as: "mail" });

db.sequelize.sync();

module.exports = db;
