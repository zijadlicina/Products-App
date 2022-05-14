const Sequelize = require("sequelize");

const db = new Sequelize("products", "root", "", {
   host: "localhost",
   dialect: "mysql"
   //port: 3306
});

db.authenticate().then(()=> {
   console.log('Connection has been established successfully.');
}).catch(err => {
   console.log('error:' + err);
})


const User = require('../models/User')(db, Sequelize);
const Product = require('../models/Product')(db, Sequelize);
const Order = require('../models/Order')(db, Sequelize);
const Branch = require('../models/Branch')(db, Sequelize);
db.users = User;
db.products = Product; 
db.orders = Order;
db.branches = Branch;

db.sync( () => console.log(`Kreirane tabele i uneseni podaci!`));

module.exports = db;