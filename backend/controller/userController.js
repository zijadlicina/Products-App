'use strict';

const sequelize = require('../config/db');
const { Sequelize } = require('sequelize');

const User = require('../models/User')(sequelize, Sequelize);
User.sync();

//POST method for oneUser
exports.createUser = (req,res) => {
 
  const user = {
      Name: req.body.name,
      Surname: req.body.surname,
      Username: req.body.username,
      Address: req.body.address,
      Phone: req.body.phone,
      Email: req.body.email,
      Password: req.body.password
  };

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
    res.send(users)
  });
};

// GET method for oneUser
exports.getUser = (req,res) => {
  //console.log(req.params.id);
  User.findOne({
    where: {
      id: req.body.id
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
    const id = req.body.id;

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

// add update 
