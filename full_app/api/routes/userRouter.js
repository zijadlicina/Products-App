const express = require("express");
const router = express.Router();

const userController = require("../../controller/userController");

router.route("/:id").get(userController.getUserView);

router.route("/orders/:id").get(userController.getUserOrdersView);

router.route("/orders/addorder/:id").get(userController.addOrderForm);

router.route("/orders/createOrder/:id").post(userController.createOrder);

router
  .route("/orders/:orderId/addProduct/:branchId/:productId")
  .post(userController.addProductsToOrder);

router
  .route("/orders/:orderId/report").get(userController.reportOrder)
module.exports = router;
