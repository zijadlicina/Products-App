"use strict";

const Branch = require("../models/Branch")(sequelize, Sequelize);

// GET method for allBranches
exports.getAllBranches = (req, res) => {
    Branch.findAll().
        then((branches) => {
            res.send(branches);
        });
};

// GET method for allBranches
exports.addBranchProduct = (req, res) => {
  Branch.findAll().then((branches) => {
    res.send(branches);
  });
};