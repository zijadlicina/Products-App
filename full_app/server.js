const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')
const { check, validationResult } = require("express-validator")
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser")
require("dotenv").config();
const app = express();

//
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
app.use(bodyParser.json());
app.use(cookieParser())

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


const sequelize = require("./config/db");
const { Sequelize } = require("sequelize");
// for automatic creating tables
const db = require('./config/db');
db.sync(() => console.log(`Kreirane tabele i uneseni podaci!`));

/*
app.post("/login", urlencodedParser, [ 
  check('username', 'This username must be 4+ characters long')
  .exists()
  .isLength({ min: 4 })
], userController.getUserLogin); // gets user username and password, login

*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
