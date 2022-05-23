const express = require("express");
const router = express.Router();

const userController = require("../../controller/userController");
const { authUser } = require("../../middlewares/authentification")

router.route("/:id").get(authUser, userController.getUserView);

router.route("/orders/:id").get(authUser, userController.getUserOrdersView);

router.route("/orders/addorder/:id").get(authUser, userController.addOrderForm);

router.route("/orders/createOrder/:id").post(authUser, userController.createOrder);

router
  .route("/orders/:orderId/addProduct/:branchId/:productId")
  .post(authUser, userController.addProductsToOrder);

router
  .route("/orders/:orderId/report").get(authUser, userController.reportOrder)
module.exports = router;
