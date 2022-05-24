const express = require("express");
const router = express.Router();

const userController = require("../../controller/userController");
const { authUser } = require("../../middlewares/authentification")

router.route("/:id").get(authUser, userController.getUserView);

router.route("/orders/:id").get(authUser, userController.getUserOrdersView);

router.route("/orders/addorder/:id").get(authUser, userController.addOrderForm);

router.route("/orders/createOrder/:id").post(authUser, userController.createOrder);

// route za promjenu password
router.route("/changepassword/:id").get(userController.getNextFormChangePassword);
router.route("/password/:id").get(userController.getUserPassword);
router.route("/updateUserPitanjeOdgovor/:id").post(userController.updateUserPitanjeOdgovor);
router.route("/editPassword/:id").post(userController.editUserPassword);


router
  .route("/orders/:orderId/addProduct/:branchId/:productId")
  .post(authUser, userController.addProductsToOrder);

router
  .route("/orders/:orderId/report").get(authUser, userController.reportOrder)
module.exports = router;
