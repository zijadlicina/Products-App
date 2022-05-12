const express = require("express");
const router = express.Router();

const homeController = require("../../controller/homeController");

router.route("/").get((req, res) => res.render("home"));
router
  .route("/login")
  .get((req, res) => res.render("login"))
  .post(homeController.getUserLogin);

module.exports = router;
