const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const db = new Sequelize("nova_baza", "root", "", {
  host: "localhost",
  dialect: "mysql",
  //port: 3306
});
const Branch = require("../models/Branch")(db, Sequelize);

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      surname: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
        require: true,
        len: [4, 10],
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pitanje_1: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "-",
      },
      odgovor_1: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "-",
      },
      pitanje_2: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "-",
      },
      odgovor_2: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "-",
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      access: {
        type: Sequelize.STRING,
        allowNull: true,
        default: "",
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    },
    { freezeTableName: true }
  );

  Branch.hasMany(Users) 


/*
  // password encryption
  Users.beforeCreate((user, options) => {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
  });

  // password validation
  Users.prototype.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
  };
*/
  return Users;
};
