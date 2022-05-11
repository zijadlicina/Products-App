"use strict";

const sequelize = require("../config/db");
const { Sequelize } = require("sequelize");
const Product = require("../models/Product");

const OrderProduct = require("../models/OrderProduct")(sequelize, Sequelize);
OrderProduct.sync();

// POST method for adding product to the order
exports.addProduct = (req, res) => {
    // order id
    const orderId = req.body.orderId;
    // name of the product
    // const name = req.body.name;

    Product.findOne({
        where: {
            name: req.body.name
        }
    }).then(product => {
        const productId = product.id;
        const op = {
            orderId: branchId,
            productId: productId,
            quantity: req.body.quantity,
            unit: req.body.unit,
            price: req.body.price
        };
        OrderProduct.create(product).
            then((data) => {
                const alert = "Product added successfully to the order!";
            })
                .catch((err) => {
                    res.status(500).send({
                        message: err.message || "Error adding the product to the order.",
                    });
                });
    })

};
