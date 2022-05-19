const sequelize = require("../config/db");
const { Sequelize, where, Op } = require("sequelize");
const { check, validationResult } = require("express-validator");
const db = require("../config/db");
const Order = require("../models/Order");

const Bill = require("../models/Bill")(sequelize, Sequelize);
/* 
// izdavanje računa tj pregled računa
exports.getBill = (req, res) => {
    const orderId = req.body.id;
    Order.findAll({
        where: {
            id: orderId
        }
    }).then(order => {

    })
}; */