"use strict";

const sequelize = require("../config/db");
const { Sequelize } = require("sequelize");
const { check, validationResult } = require("express-validator");

const User = require("../models/User")(sequelize, Sequelize);
User.sync();

//POST method for oneUser
exports.createUser = (req, res) => {
  const user = {
    name: req.body.name,
    surname: req.body.surname,
    username: req.body.username,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
  };
  console.log(user);
  User.create(user)
    .then((data) => {
      let object = { status: "User created!" };
      res.send(object);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error creating the user.",
      });
    });
};

//GET method for allUsers
exports.getAllUsers = (req, res) => {
  User.findAll().then((users) => {
    res.send(users);
  });
};

// GET method for oneUser
exports.getUser = (req, res) => {
  //console.log(req.params.id);
  User.findOne({
    where: {
      id: req.body.id,
    },
  })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error getting user with id: " + req.params.id,
      });
    });
};

// POST method for oneUser - LOGIN
exports.getUserLogin = async (req, res) => {
  const errorsOfValidation = validationResult(req);
  if (!errorsOfValidation.isEmpty()) {
    const alert = errorsOfValidation;
    return res.render("login", {
      alert: alert.errors[0].msg,
      alertExist: true,
    });
  }
  let username = req.body.username;
  let password = req.body.password;
  User.findOne({
    where: {
      username: username,
      password: password,
    },
  })
    .then((user) => {
      if (user == null) {
        const alert = "Invalid Credentionals";
        return res.render("login", { alert: alert, alertExist: true });
      }
      if (user.access === "admin") return res.redirect('/admin').render('admin', {user})
      else return res.redirect('/dashboard').render("dashboard", { user });
      // res.redirect(`/dashboard`);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error getting user username: " + username,
      });
    });
};

//DELETE method for allUsers
exports.deleteAllUsers = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: "Table users is destroyed!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error destroying table users.",
      });
    });
};

//DELETE method for oneUser
exports.deleteUser = (req, res) => {
  const id = req.body.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User deleted succesfully.",
        });
      } else {
        res.send({
          message: "Not posible to delete the user.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting the user with id: " + id,
      });
    });
};

// add update

// PUT method for updating name
exports.updateName = (req, res) => {
  User.update({
    name: req.body.name
  },
  {
    where: {
      id: req.body.id
    }
  }).then(num => {
    if(num==1){
      let object = { status: "User name changed successfully!"};
      res.send(object);
    }else{
      let object = { status: "Can't update user's name!"};
      res.send(object);
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating user's name!"
    });
  });
};

// PUT method for updating surname
exports.updateSurname = (req, res) => {
  User.update({
    surname: req.body.surname
  },
  {
    where: {
      id: req.body.id
    }
  }).then(num => {
    if(num==1){
      let object = { status: "User surname changed successfully!"};
      res.send(object);
    }else{
      let object = { status: "Can't update user's surname!"};
      res.send(object);
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating user's surname!"
    });
  });
};

// PUT method for updating username
exports.updateUsername = (req, res) => {
  User.update({
    username: req.body.username
  },
  {
    where: {
      id: req.body.id
    }
  }).then(num => {
    if(num==1){
      let object = { status: "User username changed successfully!"};
      res.send(object);
    }else{
      let object = { status: "Can't update user's username!"};
      res.send(object);
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating user's username!"
    });
  });
};

// PUT method for updating address
exports.updateAddress = (req, res) => {
  User.update({
    address: req.body.address
  },
  {
    where: {
      id: req.body.id
    }
  }).then(num => {
    if(num==1){
      let object = { status: "User address changed successfully!"};
      res.send(object);
    }else{
      let object = { status: "Can't update user's address!"};
      res.send(object);
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating user's address!"
    });
  });
};

// PUT method for updating email
exports.updateEmail = (req, res) => {
  User.update({
    email: req.body.email
  },
  {
    where: {
      id: req.body.id
    }
  }).then(num => {
    if(num==1){
      let object = { status: "User email changed successfully!"};
      res.send(object);
    }else{
      let object = { status: "Can't update user's email!"};
      res.send(object);
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating user's email!"
    });
  });
};

// PUT method for updating phone
exports.updatePhone = (req, res) => {
  User.update({
    phone: req.body.phone
  },
  {
    where: {
      id: req.body.id
    }
  }).then(num => {
    if(num==1){
      let object = { status: "User phone changed successfully!"};
      res.send(object);
    }else{
      let object = { status: "Can't update user's phone!"};
      res.send(object);
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating user's phone"
    });
  });
};

// PUT method for updating password
exports.updatePassword = (req, res) => {
  User.update({
    password: req.body.password
  },
  {
    where: {
      id: req.body.id
    }
  }).then(num => {
    if(num==1){
      let object = { status: "User password changed successfully!"};
      res.send(object);
    }else{
      let object = { status: "Can't update user's password!"};
      res.send(object);
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating user's password"
    });
  });
};

// PUT method for updating access
exports.updateAccess = (req, res) => {
  User.update({
    access: req.body.access
  },
  {
    where: {
      id: req.body.id
    }
  }).then(num => {
    if(num==1){
      let object = { status: "User access changed successfully!"};
      res.send(object);
    }else{
      let object = { status: "Can't update user's access!"};
      res.send(object);
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating user's access!"
    });
  });
};