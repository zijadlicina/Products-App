const express = require("express");
const router = express.Router();

const userController = require("../../controller/userController");

router.route("/:id").get(userController.getUserView);

router.route("/orders/:id").get(userController.getUserOrdersView);

router.route("/orders/addorder/:id").get(userController.addOrderForm);

router.route("/orders/createOrder/:id").post(userController.createOrder);

router
  .route("/orders/addProduct/:orderId/:productId")
  .post(userController.addProductsToOrder);

module.exports = router;
