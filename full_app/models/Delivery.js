const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Delivery = sequelize.define(
      "delivery",
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        branchProductId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'branch_products',
              key: 'id',
              as: 'branchProductId'
            }
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        unit: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('sent', 'delivered'),
            allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      },
      { freezeTableName: true }
    );
    return Delivery;
  };
  