const sequelize = require("../config/db");
const { Sequelize, where, Op } = require("sequelize");
const { check, validationResult } = require("express-validator");
const db = require("../config/db");

const User = require("../models/User")(sequelize, Sequelize);

exports.getUserView = async(req, res) => {
    const userId = req.params.id
  //  console.log(userId)
    User.findOne({where: {id: userId}}).then((user) => {
        if (user){
            user = user.dataValues
            res.render("user", { layout: "dashUser", user });
        }
    })
}

exports.getUserOrdersView = async (req, res) => {
  const userId = req.params.id;
    db.users.findOne({ where: { id: userId } }).then((user) => {
        user.getOrders().then((data) => {
            const orders = []
            data.forEach(element => {
                orders.push(element.dataValues)  
            });
            user = user.dataValues
            res.render("orders", { layout: "dashUser", user, orders });  
        })
    });
};

exports.addOrderForm = async (req, res) => {
  const userId = req.params.id;
  db.users.findOne({ where: { id: userId } }).then((user) => {
      user = user.dataValues;
      res.render("addOrder", { layout: "dashUser", user });
  });
};

exports.createOrder = async (req, res) => {
  const userId = req.params.id;
  db.users.findOne({ where: { id: userId } }).then((user) => {
    let order1 = {
        name: req.body.name,
        userId: userId,
        order_date: req.body.order_date,
    };
    const branchName = req.body.branch;
    console.log(branchName)
    // pronaci rbanch
    db.branches.findOne({ where: { name: branchName } }).then((branch) => {
        db.orders.create(order1).then((data1) => {
          branch.getProducts().then((data) => {
            const products = [];
            let orderId = data1.dataValues.id;
            data.forEach((element) => {
                const elem = { ...element.dataValues, orderId };
              products.push(elem);
            });
            branch = branch.dataValues;
            res.render("addProductsOrder", {
              layout: "dashUser",
              branch,
              products,
            });
          });
        });
        })
  });
};


exports.addProductsToOrder = async (req, res) => {
    const orderId = req.params.orderId;
    const productId = req.params.productId;
    db.orders.findOne({ where: { id: orderId } }).then((order) => {
        
    })
};
/*
branch.getProducts().then((products) => {
*/