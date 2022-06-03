const sequelize = require("../config/db");
const { Sequelize, where, Op } = require("sequelize");
const { check, validationResult } = require("express-validator");

const Product = require("../models/Product")(sequelize, Sequelize);
const Branch = require("../models/Branch")(sequelize, Sequelize);
const Category = require("../models/Category")(sequelize, Sequelize);
const Delivery = require("../models/Delivery")(sequelize, Sequelize);

const db = require("../config/db");
const BranchProduct = require("../models/BranchProduct")(sequelize, Sequelize);

Category.hasMany(Product);

// POST methods for oneCategory
exports.createCategory = (req, res) => {
  const category = {
    name: req.body.name,
    PDV: req.body.PDV,
  };
  Category.create(category)
    .then((data) => {
      Category.findAll().then((rows) => {
        let data = [];
        rows.forEach((element) => {
          data.push(element.dataValues);
        });
        res.render("categories", { layout: "dashAdminWH", data });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error creating the category.",
      });
    });
};

// GET methods for allCategorys
exports.getAllCategorys = (req, res) => {
  Category.findAll()
    .then((rows) => {
      let data = [];
      rows.forEach((element) => {
        data.push(element.dataValues);
      });
      res.render("addProductWH", { layout: "dashAdminWH", data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error getting categorys: ",
      });
    });
};

// GET methods for allCategorys
exports.getListOfCategories = (req, res) => {
  console.log("daa");
  Category.findAll()
    .then((rows) => {
      let data = [];
      rows.forEach((element) => {
        data.push(element.dataValues);
      });
      res.render("categories", { layout: "dashAdminWH", data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error getting categorys: ",
      });
    });
};

exports.addNewCategory = (req, res) => {
  Category.findAll()
    .then((rows) => {
      let data = [];
      rows.forEach((element) => {
        data.push(element.dataValues);
      });
      res.render("categories", { layout: "dashAdminWH", data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error getting categorys: ",
      });
    });
};

// POST methods for oneProduct
exports.createProduct = (req, res) => {
  Category.findOne({ where: { name: req.body.category } }).then((category) => {
    const product = {
      name: req.body.name,
      quantity: req.body.quantity,
      unit: req.body.unit,
      warehouse: req.body.warehouse,
      price: req.body.price,
      city: req.body.city,
    };

    category
      .createProduct(product)
      .then((data) => {
        const alert = "Product successfully added!";
        res.render("addProductWH", { layout: "dashAdminWH", alert });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error creating the product.",
        });
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
      Category.findAll().then((rows) => {
        let data2 = [];
        rows.forEach((element) => {
          data2.push(element.dataValues);
        });
        const data = {
          id: product.id,
          name: product.name,
          quantity: product.quantity,
          unit: product.unit,
          warehouse: product.warehouse,
          price: product.price,
          city: product.city,
          category: product.categoryId,
          categorys: data2,
        };
        res.render("editProductWH", { layout: "dashAdminWH", data });
      });
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
  Branch.findAll().then((rows) => {
    let branches = [];
    rows.forEach((element) => {
      branches.push(element.dataValues);
    });
    res.render("branchesWH", { layout: "dashAdminWH", branches });
  });
};

// GET method for allBranches
exports.getProductsOfBranchView = (req, res) => {
  const branchId = req.params.id;
  console.log(branchId);
  db.branches.findOne({ where: { id: branchId } }).then((branch) => {
    branch.getProducts().then((products) => {
      let productsO = [];
      products.forEach((element) => {
        // let product = { ...element, quantity:  };
        let quo = element.branch_products.quantity;
        let product = { ...element.dataValues, branchId };
        product.quantity = quo;
        productsO.push(product);
      });
      let alert;
      if (productsO.length === 0) alert = "No products in stock";
      branch = branch.dataValues;
      res.render("branchProductsWHView", {
        layout: "dashAdminWH",
        branch,
        productsO,
        alert,
      });
    });
  });
};

// GET method for allBranches
exports.getProductsToAddToBranch = (req, res) => {
  const branchId = req.params.id;
  console.log(branchId);
  db.branches.findOne({ where: { id: branchId } }).then((branch) => {
    branch.getProducts().then((products) => {
      db.products.findAll().then((productsAll) => {
        let array1 = [];
        products.forEach((elem) => {
          array1.push(elem.dataValues);
        });
        let array2 = [];
        productsAll.forEach((elem) => {
          array2.push(elem.dataValues);
        });
        let array3 = [];
        array2.forEach((elem1) => {
          let j = 0;
          for (; j < array1.length; j++) {
            if (array1[j].id === elem1.id) break;
          }
          if (j == array1.length) array3.push(elem1);
        });
        let productsO = [];
        array3.forEach((element) => {
          // let product = { ...element, quantity:  };
          let product = { ...element, branchId };
          productsO.push(product);
        });
        res.render("branchProductsWH", {
          layout: "dashAdminWH",
          branchId,
          productsO,
        });
      });
    });
  });
  /*
  //--------------------
  Product.findAll().then((rows) => {
    let products = [];
    rows.forEach((element) => {
      products.push(element.dataValues);
    });
    let productsO = [];
    products.forEach((element) => {
        // let product = { ...element, quantity:  };
        let product = { ...element, branchId };
            productsO.push(product);
        });
    })
    /*
    res.render("branchProductsWH", {
      layout: "dashAdminWH",
      branchId,
      productsO,
    });
    
   */
};

// GET method for allBranches
exports.addProductToBranch = async (req, res) => {
  console.log(req.body)
  // console.log("addProductToBranch");
  const { quantity, unit } = req.body;
  let productId = req.params.id;
  let branchId = req.params.branchId;

  BranchProduct.count({
    where: {
      productId: productId,
      branchId: branchId,
    },
  }).then((count) => {
    console.log(count);
    if (count == 0) {
      const product = {
        branchId: branchId,
        productId: productId,
        quantity: quantity,
        unit: unit,
      };
      BranchProduct.create(product);
    } else {
        BranchProduct.findOne({
          where: {
            productId: productId,
          },
        }).then((product) => {
          console.log("daa " + product);
          product.update({
            quantity: product.quantity + quantity,
          }); /* 
        }).catch(err => {
          res.status(500).send(err);
      */
        BranchProduct.create(product).
          then(bp => {
            // provjeriti da li kreira delivery za dobar branchProduct
            const delivery = {
              branchProductId: bp.id,
              quantity: quantity,
              unit: unit,
              status: 'sent'
            }
            Delivery.create(delivery);
          });
    //}else{
        BranchProduct.findOne({
          where: {
            productId: productId
          }
        }).then(product => {
          BranchProduct.update({
            quantity: product.quantity + quantity
          });
          // provjeriti da li kreira delivery za dobar branchProduct
          const delivery = {
            branchProductId: product.id,
            quantity: quantity,
            unit: unit,
            status: 'sent'
          };
          Delivery.create(delivery);
        }).catch(err => {
          res.status(500).send(err);
        });
      
    });
  }
    db.products.findByPk(productId).then((product) => {
      oldQuantity = product.quantity;
      product.update({
        quantity: oldQuantity - quantity,
      });
    });

    res.redirect(`/warehouse/branches/brancheproducts/${branchId}`);
  });
  /* db.products.findAll().then((products) => {
    if (products) {
      products.forEach((element) => {
        if (element.id == productId) {
          //console.log(element);
        //  console.log(element);
          db.branches.findOne({ where: { id: branchId } }).then((branch) => {
            branch.addProduct(element, { through: { quantity, unit } });
            db.products.findByPk(productId). then(product => {
              oldQuantity = product.quantity;
              product.update({
                quantity: oldQuantity - quantity
              });/* .then(data => {
                res.send(data);
              }). catch(err => {
                  res.status(500).send(err);
              }); 
            });
            res.redirect(`/warehouse/branches/brancheproducts/${branchId}`)
          });
        }
      });
    }
  }); */
};

/*Branch.findOne({ where: { id: branchId } }).then((branch) => {
    Product.findOne({ where: { id: productId } }).then((product) => {

    });
  });
  /*
  /*
 Product.findAll().then((products) => {
   const newBranc = {name: "posl_c", city: "zen", address: "ulica"}
   db.products.findAll().then((products) => {
     if (products) {
       products.forEach((elem) => {
         db.branches.create(newBranc)
           .then((branch) => {
             branch.addProduct(elem);
           })
           .catch((err) => console.log(err));
       });
     }
   });
 });
 */
