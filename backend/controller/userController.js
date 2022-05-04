'use strict';

const sequelize = require('../config/db');
const { Sequelize } = require('sequelize');
const db = require("../config/db");

const User = require('../models/User')(sequelize, Sequelize);
User.sync();

exports.CreateUser = (req, res) => {

}

//POST method for oneUser
exports.createUser = (req,res) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const username = req.body.username;
  const email = req.body.email;
  const phone = req.body.phone;
   
  const user = {
      name: req.body.name,
      surname: req.body.surname,
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone
  };

  console.log(name + surname + username + email + phone);
  User.create(user).then(
    data => {
        let object = {status:"User created!"};
        res.send(object);
      }
  ).catch(err => {
    res.status(500).send({
      message:
        err.message || "Error creating the user."
    });
  });
};

//GET method for allUsers
exports.getAllUsers = (req,res) => {
  User.findAll().then(users => {
    res.json(users)
  });
};

// GET method for oneUser
exports.getUser = (req,res) => {
  console.log(req.params.id);
  User.findOne({
    where: {
      id: req.params.id
    }
  }).then(user => {
    res.send(user)
  }).catch(err => {
    res.status(500).send({
      message: "Error getting user with id: " + req.params.id
    });
  });
};

//DELETE method for allUsers
exports.deleteAllUsers = (req,res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: "Table user is destroyed!" });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error destroying table user."
      });
    });
};

//DELETE method for oneUser
exports.deleteUser = (req,res) => {
    const id = req.params.id;

    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User deleted succesfully."
          });
        } else {
          res.send({
            message: "Not posible to delete the user."
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting the user with id: " + id
        });
      });
};
