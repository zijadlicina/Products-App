const express = require("express");
const router = express.Router();
const sequelize = require("../../config/db");
const { Sequelize, where, Op } = require("sequelize");

const homeController = require("../../controller/homeController");
const Logging = require("../../models/Logging")(sequelize, Sequelize);

router.route("/").get((req, res) => res.render("home"));
router
  .route("/login")
  .get((req, res) => res.render("login"))
  .post(homeController.getUserLogin);

router.route("/logout").get((req, res) => {
  res.cookie("jwt", "");
  const logg = {
    akcija: "LOGOUT",
    opisAkcije: "User logged out",
  };

  Logging.create(logg)        
  .then((data) => {
});
  res.redirect("/login");
})

module.exports = router;
