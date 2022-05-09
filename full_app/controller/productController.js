"use strict";

const sequelize = require("../config/db");
const { Sequelize } = require("sequelize");
const { check, validationResult } = require("express-validator");

const Product = require("../models/Product")(sequelize, Sequelize);
Product.sync();

// POST methods for oneProduct
exports.createProduct = (req, res) => {
    const product = {
        name: req.body.name,
        category: req.body.category,
        quantity: req.body.quantity,
        unit: req.body.unit,
        warehouse: req.body.warehouse,
        city: req.body.city
      };
      
      Product.create(product)
        .then((data) => {
          let object = { status: "Product created!" };
          res.send(object);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Error creating the product.",
          });
        });
};


// GET methods for allProducts
exports.getAllProducts = (req, res) => {
    Product.findAll().then((products) => {
      res.send(products);
    });
  };

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

// PUT method for oneProduct
// change quantity of the product
exports.updateQuantity = (req, res) => {
    Product.update({
        unit: req.body.quantity
        },
        { where: 
            { id: req.body.id }
        }
    )
    .then(num => {
        if (num == 1) {
            let object = {status:"Product quantity changed!"}
            res.send(object);
        } else {
            let object = {status:"Can't update quantity of the product!"}
            res.send(object);
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating product quantity!"
        });
    });
};