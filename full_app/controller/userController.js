const sequelize = require("../config/db");
const { Sequelize, where, Op } = require("sequelize");
const { check, validationResult } = require("express-validator");
const db = require("../config/db");
const bcrypt = require("bcrypt");

const Logging = require("../models/Logging")(sequelize, Sequelize);
const User = require("../models/User")(sequelize, Sequelize);
const BranchProduct = require("../models/BranchProduct")(sequelize, Sequelize);
const Category = require("../models/Category")(sequelize, Sequelize);

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
    //  res.send(orders);
      res.render("orders", { layout: "dashUser", user, orders });
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
      let amountPricePDV = amountPrice;
      data.forEach((element) => {
        let op = element.dataValues.order_products.dataValues;
        let amountPriceElem = op.quantity * op.price;
        element.dataValues.quantity = op.quantity
        let amountPriceElemPDV = 0;
        Category.findOne({ where: { id: element.dataValues.categoryId } }).then(
          (cat) => {
            let category = cat.dataValues;
            console.log(category.PDV);
            amountPriceElemPDV =
              amountPriceElem + (category.PDV / 100) * amountPriceElem;
            let elem = {
              ...element.dataValues,
              amountPriceElem,
              amountPriceElemPDV,
            };
            amountPrice += amountPriceElem;
            amountPricePDV += amountPriceElemPDV;
            products.push(elem);
          }
        );
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
          amountPricePDV,
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
    let newOrder = {
      name: req.body.name,
      order_date: req.body.order_date,
    }
    db.orders.create(newOrder).then((order) => {
      order.setUser(user)
      let branchId = user.dataValues.branchId
      db.branches.findOne({ where: { id: branchId } }).then((branch) => {
        branch.getProducts().then((data) => {
            const products = [];
            let orderId = order.dataValues.id;
              data.forEach((element) => {
                  //console.log(element.dataValues.branch_products.dataValues);
                  let {name, price, unit} = element.dataValues
                  const elem = {
                    name, price, unit,  
                    ...element.dataValues.branch_products.dataValues,
                    orderId,
                    branchId,
                  };
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
  const unit = req.body.unit;
  const price = req.body.price;
  //
//  console.log("daaa " + productId)
  db.orders.findOne({ where: { id: orderId } }).then((order) => {
    BranchProduct.findOne({ where: { id: productId } }).then((brancheproduct) => {
     // console.log(brancheproduct);
      let branch_products = brancheproduct.dataValues
      db.products.findOne({where: {id: branch_products.productId}}).then((product) => {
        order
        .addProduct(product, { through: { quantity, price, unit } })
        .then((data) => {
          let oldQuantity = brancheproduct.dataValues.quantity
          console.log(oldQuantity)
           brancheproduct.update({
             quantity:  oldQuantity - quantity
           })
           //------------------------------
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
                for (let j = 0; j < array1.length; j++){
                  if (productId === array1[j].id){
                    let elem = array1[j]
                    elem.quantity = elem.quantity - quantity
                    array1[j] = elem
                  }
                }
                //-------
                // updatePrice of order
                
                order.getProducts().then((data) => {
                    let amount = 0
                  data.forEach((elem) => {
                    let op = elem.dataValues.order_products.dataValues;
                    amount += op.price * op.quantity
                  })
                  console.log(order)
                    db.orders.findOne({ where: { id: orderId } }).then((order) => {
                      order.update({price: amount})
                    })
                })
                
                //----------
                order = order.dataValues;
                branch = branch.dataValues;
                const products = [];
                let orderId = order.id;
                let branchId = branch.id;
                //console.log(array3)
                array3.forEach((element) => {
                  let { name, price, unit } = element;
                  const elem = {
                    name,
                    price,
                    unit,
                    ...element.branch_products.dataValues,
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
              })
            })
          })
        })
      })
      /*
          
                branch.setProducts(products1).then(() => {
                
                });
              });
            });
          });
        });*/
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

      const logg = {
        akcija: "ADD",
        opisAkcije: "User: "+user.username+ " added security questions",
      };
  
      Logging.create(logg)        
      .then((data) => {
        user = user.dataValues;
        let alert =
          "You have successfully added answers to the security questions!";
        res.render("userQuestions", { layout: "dashUser", user, alert });
      });


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

              const logg = {
                akcija: "EDIT",
                opisAkcije: "User: "+user.username+" changed his password"
              };
          
              Logging.create(logg)        
              .then((data) => {

                user = user.dataValues;
                let alert = "You have successfully changed your password!";
                res.render("changePassword", { layout: "dashUser", user, alert });

              });

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
