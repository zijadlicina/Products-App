const Sequelize = require("sequelize");

// novo ime baze u phpSql
const db = new Sequelize("products2", "root", "", {
  host: "localhost",
  dialect: "mysql",
  //port: 3306
});

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.log("error:" + err);
  });

const User = require("../models/User")(db, Sequelize);
const Product = require("../models/Product")(db, Sequelize);
const Order = require("../models/Order")(db, Sequelize);
const Branch = require("../models/Branch")(db, Sequelize);
const branchProduct = require("../models/BranchProduct")(db, Sequelize);
db.users = User;
db.products = Product;
db.orders = Order;
db.branches = Branch;

// veze
db.branchProduct = db.branches.belongsToMany(db.products, {
  through: branchProduct,
  foreign_key: "branch_id",
});
db.products.belongsToMany(db.branches, {
  through: branchProduct,
  foreign_key: "product_id",
});

db.sync(() => console.log(`Kreirane tabele i uneseni podaci!`));

module.exports = db;
