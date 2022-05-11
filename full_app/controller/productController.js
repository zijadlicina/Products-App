"use strict";

const sequelize = require("../config/db");
const { Sequelize } = require("sequelize");

const Product = require("../models/Product")(sequelize, Sequelize);
Product.sync();

// GET method for oneProduct
exports.getProduct = (req, res) => {
    Product.findOne({
      where: {
        id: req.body.id,
      },
    })
      .then((product) => {
        res.send(product);
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error getting product with id: " + req.params.id,
        });
      });
  };

// DELETE method for allProducts
exports.deleteAllProducts = (req, res) => {
    Product.destroy({
      where: {},
      truncate: false,
    })
      .then((nums) => {
        res.send({ message: "Table products is destroyed!" });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error destroying table products.",
        });
      });
  };

// DELETE method for oneProduct
exports.deleteProduct = (req, res) => {
    const id = req.body.id;
  
    Product.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Product deleted succesfully.",
          });
        } else {
          res.send({
            message: "Not posible to delete the product.",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error deleting the product with id: " + id,
        });
      });
  };
