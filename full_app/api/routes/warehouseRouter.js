const express = require("express");
const router = express.Router();

const warehouseController = require("../../controller/warehouseController");

// create, update, delete, find
router
  .route("/")
  .get((req, res) => res.render("adminWH", { layout: "dashAdminWH" }));
router.route("/products").get(warehouseController.getAllProducts);
router
  .route("/products/add")
  .get((req, res) => res.render("addProductWH", { layout: "dashAdminWH" }))
  .post(warehouseController.createProduct);
router
  .route("/products/edit/:id")
  .get(warehouseController.editProduct) // route for opening handlebars file of this route
  .post(warehouseController.updateProduct);
router
  .route("/products/remove/:id")
  .get(warehouseController.removeProduct) // route for opening handlebars file of this route
  .post(warehouseController.deleteProduct);
router
  .route("/products/quantity/:id")
  .get(warehouseController.editQuantityProduct) // route for opening handlebars file of this route
  .post(warehouseController.updateQuantityProduct);
router.route("/branches")
  .get(warehouseController.getAllBranches); // route for opening handlebars file of this route
//.post(warehouseController.updateQuantityProduct);
module.exports = router;
