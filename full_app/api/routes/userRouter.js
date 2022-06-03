const express = require("express");
const router = express.Router();

const userController = require("../../controller/userController");
const { authUser } = require("../../middlewares/authentification");

router.route("/:id").get(authUser, userController.getUserView);

router.route("/orders/:id").get(authUser, userController.getUserOrdersView);

router.route("/orders/addorder/:id").get(authUser, userController.addOrderForm);

router
  .route("/orders/createOrder/:id")
  .post(authUser, userController.createOrder);

// route za promjenu password
router
  .route("/changepassword/:id")
  .get(userController.getNextFormChangePassword);
router.route("/password/:id").get(userController.getUserPassword);
router
  .route("/updateUserPitanjeOdgovor/:id")
  .post(userController.updateUserPitanjeOdgovor);
router.route("/editPassword/:id").post(userController.editUserPassword);

router
  .route("/orders/:orderId/addProduct/:branchId/:productId")
  .post(authUser, userController.addProductsToOrder);

router
  .route("/orders/:orderId/edit/:userId")
  .get(authUser, userController.editOrderView);
router
  .route("/orders/:orderId/editProduct/:branchProductId/:orderProductId/:userId")
  .post(authUser, userController.editOrder);
router
  .route("/orders/:orderId/report")
  .get(authUser, userController.reportOrder);

router.route("/orders/:orderId/finish").get(authUser, userController.sendBill);

router
  .route("/orders/:orderId/writeBill")
  .get(authUser, userController.takeBill);

router
  .route("/orders/:orderId/writeBill2")
  .get(authUser, userController.writeBill);

module.exports = router;
