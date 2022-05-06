const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const userRoute = require('./api/routes/userRoute');

const userController = require('./controller/userController');
const sequelize = require('./config/db');
const { Sequelize} =  require('sequelize');

// there are middlewares for our routes
/* app.use(express.json())
app.use("/api/users", userRoute); */

const User = require('./models/User')(sequelize, Sequelize);
User.sync();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// /users rute
app.post('/user', userController.createUser); // creates new user
app.delete('/', userController.deleteAllUsers); // deletes all users
app.delete('/user',  userController.deleteUser); // deletes user with specified id; id is sent in req body
app.get('/', userController.getAllUsers); // gets all users
app.get('/user', userController.getUser); // gets user with specified id; id is sent in req body
//app.put('/user/:id', userController.updateUser) // updates user with specified id

// add which data can be updated

// add initialization of the base

app.listen(3000);
module.exports = app;
