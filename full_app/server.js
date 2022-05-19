const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')
const { check, validationResult } = require("express-validator")
const exphbs = require("express-handlebars");
require("dotenv").config();
const app = express();

//
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
app.use(bodyParser.json());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Template Engine
app.engine("hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
// creating one handlebars-helper command for fronted - "select"
var hbs = exphbs.create({})
hbs.handlebars.registerHelper("select", function (selected, options) {
  return options
    .fn(this)
    .replace(new RegExp(' value="' + selected + '"'), '$& selected="selected"');
});

// routes
const homeRouter = require("./api/routes/homeRouter");
app.use("/", homeRouter);
const adminRouter = require("./api/routes/adminRouter");
app.use("/admin", adminRouter);
const userRouter = require("./api/routes/userRouter");
app.use("/user", userRouter);
const warehouseRouter = require("./api/routes/warehouseRouter");
app.use("/warehouse", warehouseRouter);

/*
const productController = require("./controller/productController");
const orderController = require("./controller/orderController");
const branchController = require("./controller/branchController");
*/
const sequelize = require("./config/db");
const { Sequelize } = require("sequelize");
// for automatic creating tables
const db = require('./config/db');
db.sync(() => console.log(`Kreirane tabele i uneseni podaci!`));
//


///------------------ovo se postepeno odkomentarise----------------
//-------------jer sada je jedino dostupna ruta: localhost:5000/admin/*

/*
const { dashboardAuth } = require('./controller/AuthController')

app.get("", (req, res) => res.render("home"));
app.get("/home", (req, res) => res.render("home"));

//-------------------
app.get("/login", (req, res) => res.render("login"));
app.get("/users", (req, res) => res.render("users", { layout: "dashAdmin" }));

app.get("/dashboard", dashboardAuth, (req, res) => res.render("dashboard"));

app.get("/admin", (req, res) => res.render("admin"));
app.get("/admin/createUser", (req, res) => res.render("createUser"));

/* app.get("/admin/createUser", (req, res) => {
    res.render("createUser", {
      style: 'admin.css'
    });
}); 

*---


app.post("/login", urlencodedParser, [ 
  check('username', 'This username must be 4+ characters long')
  .exists()
  .isLength({ min: 4 })
], userController.getUserLogin); // gets user username and password, login



// products routes
app.post("/products", productController.createProduct); // creates new product
app.delete("/products", productController.deleteAllProducts); // deletes all products
app.delete("/products/", productController.deleteProduct); // deletes one product
app.get("/products", productController.getAllProducts); // gets all products
app.get("/products/", productController.getProduct); // gets one product
app.put("/products/updateQuantity", productController.updateQuantity); // updates quantity of the product

// orders routes
app.post("/orders", orderController.createOrder); // creates order
app.delete("/orders", orderController.deleteAllOrders); // deletes all orders
app.get("/orders", orderController.getAllOrders); // gets all orders


// branch routes
app.get("/branches", branchController.getAllBranches); // gets all branches
*/

// add initialization of the base

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
