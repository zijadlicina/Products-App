const express = require("express");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator")
const exphbs = require("express-handlebars");
require("dotenv").config();

const { dashboardAuth } = require('./controller/AuthController')

const app = express();

const userController = require("./controller/userController");
const productController = require("./controller/productController");
const sequelize = require("./config/db");
const { Sequelize } = require("sequelize");

// for automatic creating tables
const db = require('./config/db');
const { user } = require("./config/db");
db.user = require("./models/User")(sequelize, Sequelize);
db.sync(() => console.log(`Kreirane tabele i uneseni podaci!`));
//

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
app.use(bodyParser.json());

// Static files
app.use(express.static("public"));

// Template Engine
app.engine("hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.get("", (req, res) => res.render("home"));
app.get("/home", (req, res) => res.render("home"));
//-------------------
app.get("/login", (req, res) => res.render("login"));
app.get("/dashboard", dashboardAuth, (req, res) => res.render("dashboard"));

app.get("/admin", (req, res) => res.render("admin"));
app.get("/admin/createUser", (req, res) => res.render("createUser"));

/* app.get("/admin/createUser", (req, res) => {
    res.render("createUser", {
      style: 'admin.css'
    });
}); */

app.post("/login", urlencodedParser, [ 
  check('username', 'This username must be 4+ characters long')
  .exists()
  .isLength({ min: 4 })
], userController.getUserLogin); // gets user username and password, login


// users routes
app.post("/user", userController.createUser); // creates new user
app.delete("/", userController.deleteAllUsers); // deletes all users
app.delete("/user", userController.deleteUser); // deletes user with specified id; id is sent in req body
app.get("/", userController.getAllUsers); // gets all users
app.get("/user", userController.getUser); // gets user with specified id; id is sent in req body
//app.put('/user/:id', userController.updateUser) // updates user with specified id
app.put("/user/updateName", userController.updateName); // updates user name
app.put("/user/updateSurname", userController.updateSurname); // updates user surname
app.put("/user/updateUsername", userController.updateUsername); // updates user username
app.put("/user/updateAddress", userController.updateAddress); // updates user address
app.put("/user/updateEmail", userController.updateEmail); // updates user email
app.put("/user/updatePhone", userController.updatePhone); // updates user phone
app.put("/user/updatePassword", userController.updatePassword); // updates user password; // should add pass validation
app.put("/user/updateAccess", userController.updateAccess); // updates user access


// products routes
app.post("/products", productController.createProduct); // creates new product
app.delete("/products", productController.deleteAllProducts); // deletes all products
app.delete("/products/:id", productController.deleteProduct); // deletes one product
app.get("/products", productController.getAllProducts); // gets all products
app.get("/products/:id", productController.getProduct); // gets one product
app.put("/products", productController.updateQuantity); // updates quantity of the product

// add initialization of the base

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));