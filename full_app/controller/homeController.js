const sequelize = require("../config/db");
const { Sequelize, where, Op } = require("sequelize");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/User")(sequelize, Sequelize);

const TOKEN_AGE = 24 * 60 * 60 //one day in seconds

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
    var user = await User.findOne({ where: { username: req.body.username } })
    if (!user) return res.render("login", { alert: "Invalid Credentionals", alertExist: true })

    const dbPassword = user.password;
    const userId = user.id
    bcrypt.compare(req.body.password, dbPassword).then((match) => {
      if (match) {
        if (user.access === "admin") {
          const token = signToken(user.id, process.env.ADMIN_SECRET);
          res.cookie("jwt", token, { httpOnly: true, maxAge: TOKEN_AGE * 1000 })
          return res.render("admin", { layout: "dashAdmin" });
        }
        else if (user.access === "admin_warehouse") {
          const token = signToken(user.id, process.env.ADMIN_WAREHOUSE_SECRET);
          res.cookie("jwt", token, { httpOnly: true, maxAge: TOKEN_AGE * 1000 })
          user = user.dataValues;
          res.render("adminWH", { layout: "dashAdminWH", user });
        } else if (user.access === "user") {
          const token = signToken(user.id, process.env.USER_SECRET);
          res.cookie("jwt", token, { httpOnly: true, maxAge: TOKEN_AGE * 1000 })
          user = user.dataValues;
          res.redirect(`user/${user.id}`);
        }
      } else {
        return res.render("login", { alert: "Invalid Credentionals", alertExist: true });
      }
    }).catch((err) => console.error(err))




  } catch (err) {
    console.error(err)
    console.log("Error kod user modela u bazi ")
  }


};

function signToken(id, secretHash) {
  const token = jwt.sign({ id }, secretHash, {
    expiresIn: TOKEN_AGE
  })
  return token
} 
