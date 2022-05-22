const sequelize = require("../config/db");
const { Sequelize, where, Op } = require("sequelize");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt")

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
  try {
    var user = await User.findOne({where: {username: req.body.username}})
    if (!user) return res.render("login", {alert: "Invalid Credentionals", alertExist: true})

    const dbPassword = user.password; 
    bcrypt.compare(req.body.password, dbPassword).then((match) => {
      if (user.access === "admin")
        return res.render("admin", { layout: "dashAdmin" });
      else if (user.access === "admin_warehouse") {
        user = user.dataValues;
        res.render("adminWH", { layout: "dashAdminWH", user });
      } else if (user.access === "user") {
        user = user.dataValues;
        res.redirect(`user/${user.id}`);
      }
    }).catch((err) => console.error(err))

    


  } catch (err) {
    console.error(err)
    console.log("Error kod user modela u bazi ")
  }


};
