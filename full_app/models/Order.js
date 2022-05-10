const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define(
    "orders",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      order_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      pickup_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    },
    { freezeTableName: true }
  );
  return Orders;
};
