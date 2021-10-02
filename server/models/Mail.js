module.exports = (sequelize, Sequelize) => {
  const Mail = sequelize.define("mail", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    from: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    to: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    subject: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Mail;
};
