module.exports = (sequelize, Sequelize) => {
  const Reply = sequelize.define("reply", {
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
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
  });

  return Reply;
};
