const sequelize = require("../config/db");
const { Sequelize, where, Op } = require("sequelize");
const { check, validationResult } = require("express-validator");

const User = require("../models/User")(sequelize, Sequelize);

// POST method for oneUser - LOGIN
exports.getUserLogin = async (req, res) => {
  /*const errorsOfValidation = validationResult(req);
  if (!errorsOfValidation.isEmpty()) {
    const alert = errorsOfValidation;
    return res.render("login", {
      alert: alert.errors[0].msg,
      alertExist: true,
    });
  }
  */
  let username = req.body.username;
  let password = req.body.password;
  User.findOne({
    where: {
      username: username,
      password: password,
    },
  })
    .then((user) => {
      if (user == null) {
        const alert = "Invalid Credentionals";
        return res.render("login", { alert: alert, alertExist: true });
      }
      console.log(user.access);
      if (user.access === "admin")
        return res.render("admin", { layout: "dashAdmin" });
      else if (user.access === "admin_warehouse") {
        user = user.dataValues;
        res.render("adminWH", { layout: "dashAdminWH", user });
      } else if (user.access === "user") {
        user = user.dataValues;
        res.render("user", { layout: "dashUser", user });
      }
      //  return res.redirect("/admin").render("admin", { user });
      //     else return res.redirect('/dashboard').render("dashboard", { user });
      // res.redirect(`/dashboard`);
      //    res.render("admin", { layout: "dashAdmin" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error getting user with username: " + username,
      });
    });
};
