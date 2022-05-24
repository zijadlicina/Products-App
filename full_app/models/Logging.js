const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Loggings = sequelize.define(
    "loggings",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      akcija: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      opisAkcije: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    },
    { freezeTableName: true }
  );
  return Loggings;
};
