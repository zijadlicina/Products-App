const sequelize = require("../config/db");
const { Sequelize, where, Op } = require("sequelize");
const { check, validationResult } = require("express-validator");
const db = require("../config/db");
const bcrypt = require("bcrypt");

const User = require("../models/User")(sequelize, Sequelize);

exports.getUserView = async (req, res) => {
  const userId = req.params.id;
  //  console.log(userId)
  User.findOne({ where: { id: userId } }).then((user) => {
    if (user) {
      user = user.dataValues;
      res.render("user", { layout: "dashUser", user });
    }
  });
};

exports.getUserOrdersView = async (req, res) => {
  const userId = req.params.id;
  db.users.findOne({ where: { id: userId } }).then((user) => {
    user.getOrders().then((data) => {
      const orders = [];
      data.forEach((element) => {
        orders.push(element.dataValues);
      });
      user = user.dataValues;
      res.send(orders);
      //res.render("orders", { layout: "dashUser", user, orders });
    });
  });
};

exports.reportOrder = async (req, res) => {
  const orderId = req.params.orderId;
  db.orders.findOne({ where: { id: orderId } }).then((order) => {
    console.log(order);
    order.getProducts().then((data) => {
      const products = [];
      let amountPrice = 0;
      data.forEach((element) => {
        let amountPriceElem =
          element.dataValues.quantity * element.dataValues.price;
        amountPrice += amountPriceElem;
        let elem = { ...element.dataValues, amountPriceElem };
        products.push(elem);
      });
      order = order.dataValues;
      db.users.findOne({ where: { id: order.userId } }).then((user) => {
        user = user.dataValues;
        res.render("reportOrder", {
          layout: "dashUser",
          order,
          products,
          user,
          amountPrice,
        });
      });
    });
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
    console.log(branchName);
    // pronaci rbanch
    db.branches.findOne({ where: { name: branchName } }).then((branch) => {
      db.orders.create(order1).then((data1) => {
        branch.getProducts().then((data) => {
          const branchId = branch.dataValues.id;
          const products = [];
          let orderId = data1.dataValues.id;
          data.forEach((element) => {
            const elem = { ...element.dataValues, orderId, branchId };
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
    });
  });
};

exports.addProductsToOrder = async (req, res) => {
  const orderId = req.params.orderId;
  const branchId = req.params.branchId;
  const productId = req.params.productId;
  const quantity = req.body.quantity;
  const unit = req.body.quantity;
  const price = req.body.price;
  //
  db.orders.findOne({ where: { id: orderId } }).then((order) => {
    db.products.findOne({ where: { id: productId } }).then((product) => {
      order
        .addProduct(product, { through: { quantity, price, unit } })
        .then((data) => {
          //
          db.branches.findOne({ where: { id: branchId } }).then((branch) => {
            branch.getProducts().then((products1) => {
              order.getProducts().then((productsOrder) => {
                let array1 = [];
                products1.forEach((elem) => {
                  array1.push(elem.dataValues);
                });
                //      console.log(array1)
                let array2 = [];
                productsOrder.forEach((elem) => {
                  array2.push(elem.dataValues);
                });
                //       console.log(array2);
                let array3 = [];
                array1.forEach((elem1) => {
                  let j = 0;
                  for (; j < array2.length; j++) {
                    if (array2[j].id === elem1.id) {
                      break;
                    }
                  }
                  if (j == array2.length) array3.push(elem1);
                });
                //    console.log(array3)
                //     console.log(products)
                order = order.dataValues;
                branch = branch.dataValues;
                const products = [];
                let orderId = order.id;
                let branchId = branch.id;
                array3.forEach((element) => {
                  const elem = {
                    ...element,
                    orderId,
                    branchId,
                  };
                  products.push(elem);
                });
                res.render("addProductsOrder", {
                  layout: "dashUser",
                  branch,
                  products,
                  order,
                });
              });
            });
          });
        });
    });
  });
};


// routes for changing password of user
exports.getNextFormChangePassword = async(req, res) => {
  const userId = req.params.id;
  User.findOne({ where: { id: userId } }).then((user) => {
    if (user) {
      if (user.odgovor_1 === '-'){
        user = user.dataValues;
        res.render("userQuestions", { layout: "dashUser", user });
      }
      else {
        user = user.dataValues;
        res.render("changePassword", {layout: "dashUser", user})
      }
    }
  })
}
exports.getUserPassword = async (req, res) => {
  const userId = req.params.id;

  db.users.findOne({ where: { id: userId } }).then((user) => {
    let temp = {
      podaci: {
        pitanje: user.pitanje,
        odgovor: user.odgovor,
      },
    };

    res.send(temp);
  });
};

exports.updateUserPitanjeOdgovor = async (req, res) => {
  const userId = req.params.id;
  const Pit1 = req.body.pitanje_1;
  const Odg1 = req.body.odgovor_1;
  const Pit2 = req.body.pitanje_2;
  const Odg2 = req.body.odgovor_2;

  db.users.findOne({ where: { id: userId } }).then((user) => {
    user.pitanje_1 = Pit1;
    user.odgovor_1 = Odg1;
    user.pitanje_2 = Pit2;
    user.odgovor_2 = Odg2;

    user.save().then((users) => {
      user = user.dataValues;
      let alert =
        "You have successfully added answers to the security questions!";
      res.render("userQuestions", { layout: "dashUser", user, alert });
    });
  });
};

exports.editUserPassword = async (req, res) => {
  const userId = req.params.id;
  const Odg1 = req.body.answer_1;
  const Odg2 = req.body.answer_2;
  const stariPass = req.body.oldPassword;
  const noviPass1 = req.body.newPassword1;
  const noviPass2 = req.body.newPassword2;

  db.users.findOne({ where: { id: userId } }).then((user) => {
    bcrypt.compare(stariPass, user.password).then((match) => {
      if (match &&
          user.odgovor_1 == Odg1 &&
          user.odgovor_2 === Odg2 &&
          noviPass1 === noviPass2
        ) {
          bcrypt.hash(noviPass1, 10).then((hashedPassword) => {
            user.password = hashedPassword;

            user.save().then((users) => {
              user = user.dataValues;
              let alert = "You have successfully changed your password!";
              res.render("changePassword", { layout: "dashUser", user, alert });
            });
          });
      } else {
        user = user.dataValues;
        let alertInvalid = "Invalid credentials!";
        res.render("changePassword", {
          layout: "dashUser",
          user,
          alertInvalid,
        });
      }
  })
  });
};
/*
branch.getProducts().then((products) => {
*/
