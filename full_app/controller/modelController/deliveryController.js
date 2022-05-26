"use strict";

const sequelize = require("../config/db");
const { Sequelize } = require("sequelize");
const Product = require("../models/Product");
const BranchProduct = require("../../models/BranchProduct");

const Delivery = require("../models/BranchProduct")(sequelize, Sequelize);
Delivery.sync();

// GET method for sent products (or delivered)
exports.getSentProducts = (res, res) => {
    Delivery.findAll({
        include: [{
            model: BranchProduct,
            attributes: ['branchId', 'productId']
        }],
        include: [{
            model: Branch,
            attributes: ['name']
        }],
        include: [{
            model: Product,
            attributes: ['name']
        }],
        where: {
            status: req.body.status
        }
    })
        .then(products => {
            // dodati niz proizvoda
            // podaci koje treba uzeti: 
            // poslovnica (ime), ime proizvoda, količina POSLANIH proizvoda(ne proizvoda u branchProduct, znači iz delivery), jedinica
            res.send(products);
        })
            .catch(err => {
                res.status(500).send(err);
            });
};