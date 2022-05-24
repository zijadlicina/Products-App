require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const authAdmin = async (req, res, next) => {
  const token = req.cookies.jwt;
  const error = verifiyUserLogin(token, process.env.ADMIN_SECRET)
  if (error.message !== "") {
    res.render("errorMsg", { layout: "main", error })
    return;
  }

  next();
}

const authAdminWarehouse = (req, res, next) => {
  const token = req.cookies.jwt;
  const error = verifiyUserLogin(token, process.env.ADMIN_WAREHOUSE_SECRET)

  if (error.message !== "") {
    res.render("errorMsg", { layout: "main", error })
    return;
  }

  next()
}

const authUser = (req, res, next) => {
  const token = req.cookies.jwt;
  const error = verifiyUserLogin(token, process.env.USER_SECRET)

  if (error.message !== "") {
    res.render("errorMsg", { layout: "main", error })
    return;
  }

  next()
}

const verifiyUserLogin = (token, secretHash) => {
  var error = {};
  jwt.verify(token, secretHash, (err, decodedToken) => {
    err ? error.message = "You don't have permission to access this page" : error.message = ""
  })
  return error;
}

module.exports = { authAdmin, authAdminWarehouse, authUser }