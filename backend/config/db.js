const Sequelize = require("sequelize");

const db = new Sequelize("userms", "root", "", {
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
User.sync();

module.exports = db;