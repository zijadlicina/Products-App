const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoute = require('./api/routes/userRoute');

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

// /users
app.post('/user', userController.createUser);
app.delete('/', userController.deleteAllUsers);
app.delete('/user',  userController.deleteUser);
app.get('/', userController.getAllUsers);
app.get('/user', userController.getUser)

//const PORT = process.env.PORT || 3000

//const server = app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
app.listen(3000);
module.exports = app;