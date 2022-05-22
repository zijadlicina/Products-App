"use strict";

const sequelize = require("../config/db");
const { Sequelize } = require("sequelize");
const Product = require("../models/Product");

const BranchProduct = require("../models/BranchProduct")(sequelize, Sequelize);
BranchProduct.sync();

// POST method for adding product to the branch
exports.addProduct = (req, res) => {
    // branch id
    const branchId = req.body.branchId;
    // name of the product
    // const name = req.body.name;

    Product.findOne({
        where: {
            name: req.body.name
        }
    }).then(product => {
        const productId = product.id;
        const bp = {
            branchId: branchId,
            productId: productId,
            quantity: req.body.quantity,
            unit: req.body.unit
        };
        BranchProduct.create(product).
            then((data) => {
                const alert = "Product added successfully to the branch!";
            })
                .catch((err) => {
                    res.status(500).send({
                        message: err.message || "Error adding the product to the branch.",
                    });
                });
    })

};

// GET method for branch products
exports.getBranchProducts = async (req, res) => {
    const { QueryTypes } = require('sequelize');
    const result = await sequelize.query(
        'SELECT products.name, products.category, branch_products.quantity, branch_products.unit FROM branch_products inner join branches on branch_products.branchId = branches.id inner join products on branch_products.productId = products.id',
        {
          replacements: { status: 'active' },
          type: QueryTypes.SELECT
        }
      );
      res.send(result); 
}; 
