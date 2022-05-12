const express = require("express");
const router = express.Router();

const userController = require("../../controller/userController");
/*
router
  .route("/")
  .get((req, res) => res.render("adminWH", { layout: "dashAdminWH" }));
router.route("/products").get(warehouseController.getAllProducts);
*/
module.exports = router;
