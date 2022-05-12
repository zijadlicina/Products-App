const sequelize = require("../config/db");
const { Sequelize, where, Op } = require("sequelize");
const { check, validationResult } = require("express-validator");

const Product = require("../models/Product")(sequelize, Sequelize);
const Branch = require("../models/Branch")(sequelize, Sequelize);

// POST methods for oneProduct
exports.createProduct = (req, res) => {
  const product = {
    name: req.body.name,
    category: req.body.category,
    quantity: req.body.quantity,
    unit: req.body.unit,
    warehouse: req.body.warehouse,
    city: req.body.city,
  };

  Product.create(product)
    .then((data) => {
      const alert = "Product successfully added!";
      res.render("addProductWH", { layout: "dashAdminWH", alert });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error creating the product.",
      });
    });
};
// GET methods for allProducts
exports.getAllProducts = (req, res) => {
  Product.findAll().then((rows) => {
    let products = [];
    rows.forEach((element) => {
      products.push(element.dataValues);
    });
    res.render("productsWH", { layout: "dashAdminWH", products });
  });
};
// GET method for rendering "removeProduct" page
exports.removeProduct = (req, res) => {
  let productId = req.params.id;
  Product.findOne({ where: { id: productId } })
    .then((product) => {
      const data = product.dataValues;
      res.render("removeProductWH", { layout: "dashAdminWH", data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error getting product with id: " + productId,
      });
    });
};
// DELETE method for oneProduct
exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  Product.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        const alert = `Product deleted succesfully!`;
        res.render("removeProductWH", { layout: "dashAdmin", alert });
      } else {
        res.send({
          message: "Not possible to delete the product.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting the product with id: " + id,
      });
    });
};

// GET method for rendering "editUser" page
exports.editProduct = (req, res) => {
  let productId = req.params.id;
  Product.findOne({ where: { id: productId } })
    .then((product) => {
      const data = product.dataValues;
      // console.log(data);
      res.render("editProductWH", { layout: "dashAdminWH", data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error getting product with id: " + productId,
      });
    });
};
// PUT method for updating product
exports.updateProduct = (req, res) => {
  let productId = req.params.id;
  const object = { ...req.body, id: productId };
  Product.update(object, { where: { id: productId } })
    .then((num) => {
      const data = object;
      const alert = "Product successfully updated!";
      res.render("editProductWH", { layout: "dashAdminWH", alert, data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error getting product with id: " + productId,
      });
    });
};
// GET method for rendering "editUser" page
exports.editQuantityProduct = (req, res) => {
  let productId = req.params.id;
  Product.findOne({ where: { id: productId } })
    .then((product) => {
      const data = product.dataValues;
      // console.log(data);
      res.render("productQuantityWH", { layout: "dashAdminWH", data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error getting product with id: " + productId,
      });
    });
};
// PUT method for oneProduct
// change quantity of the product
exports.updateQuantityProduct = (req, res) => {
  let productId = req.params.id;
  Product.findOne({ where: { id: productId } })
    .then((product) => {
      product.update({ quantity: req.body.quantity }).then((num) => {
        if (num) {
          const data = num.dataValues;
          //  console.log(data);
          const alert = "Product quantity changed!";
          res.render("productQuantityWH", {
            layout: "dashAdminWH",
            alert,
            data,
          });
        } else {
          let object = { status: "Can't update quantity of the product!" };
          res.send(object);
        }
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating product quantity!",
      });
    });
};

// GET method for allBranches
exports.getAllBranches = (req, res) => {
  console.log("daaa");
  Branch.findAll().then((rows) => {
    let branches = [];
    rows.forEach((element) => {
      branches.push(element.dataValues);
    });
    res.render("branchesWH", { layout: "dashAdminWH", branches });
  });
};
