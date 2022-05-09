"use strict";

const sequelize = require("../config/db");
const { Sequelize } = require("sequelize");

const Branch = require("../models/Branch")(sequelize, Sequelize);
Branch.sync();

// GET method for allBranches
exports.getAllBranches = (req, res) => {
    Branch.findAll().
        then((branches) => {
            res.send(branches);
        });
};