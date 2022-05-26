const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Categorys = sequelize.define(
    "categorys",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      PDV: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        defaultValue: 0,

      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    },
    { freezeTableName: true }
  );
  
  return Categorys;
};
