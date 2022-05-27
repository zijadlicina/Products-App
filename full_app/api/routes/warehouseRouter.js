const express = require("express");
const router = express.Router();

const warehouseController = require("../../controller/warehouseController");
const { authAdminWarehouse } = require("../../middlewares/authentification");

// create, update, delete, find
router
  .route("/")
  .get((req, res) => res.render("adminWH", { layout: "dashAdminWH" }));
router
  .route("/products")
  .get(authAdminWarehouse, warehouseController.getAllProducts);

router.route("/category/add").post(warehouseController.createCategory);

router
  .route("/products/add")
  .get(authAdminWarehouse, warehouseController.getAllCategorys) // route for opening handlebars file of this route
  .post(authAdminWarehouse, warehouseController.createProduct);
router
  .route("/products/edit/:id")
  .get(authAdminWarehouse, warehouseController.editProduct) // route for opening handlebars file of this route
  .post(authAdminWarehouse, warehouseController.updateProduct);
router
  .route("/products/remove/:id")
  .get(authAdminWarehouse, warehouseController.removeProduct) // route for opening handlebars file of this route
  .post(authAdminWarehouse, warehouseController.deleteProduct);
router
  .route("/products/quantity/:id")
  .get(authAdminWarehouse, warehouseController.editQuantityProduct) // route for opening handlebars file of this route
  .post(authAdminWarehouse, warehouseController.updateQuantityProduct);
router
  .route("/branches")
  .get(authAdminWarehouse, warehouseController.getAllBranches); // route for opening handlebars file of this route

router
  .route("/branches/viewproducts/:id")
  .get(authAdminWarehouse, warehouseController.getProductsOfBranchView);
router
  .route("/branches/brancheproducts/:id")
  .get(authAdminWarehouse, warehouseController.getProductsToAddToBranch); // route for opening handlebars file of this route
router
  .route("/branches/addProduct/:branchId/:id")
  .post(authAdminWarehouse, warehouseController.addProductToBranch);
router
  .route("/category")
  .get(authAdminWarehouse, warehouseController.getListOfCategories);
router
  .route("/category/add")
  .get((req, res) => res.render("formCategory", { layout: "dashAdminWH" }));
router
  .route("/category/create")
  .post(authAdminWarehouse, warehouseController.createCategory);
module.exports = router;
