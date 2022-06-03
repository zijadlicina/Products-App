const Sequelize = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    const BranchProduct = sequelize.define(
      "branch_products",
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        branchId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "branches",
            key: "id",
            as: "branchId",
          },
        },
        productId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "products",
            key: "id",
            as: "productId",
          },
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        unit: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM("sent", "delivered"),
          allowNull: true,
          default: "sent"
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      },
      { freezeTableName: true }
    );
    return BranchProduct;
  };
  