const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            allowNull:false,
            autoIncrement: true,
            primaryKey: true
        }, 
        Name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Surname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Access: {
            type: Sequelize.STRING,
            allowNull: true,
            default: ""
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    },{freezeTableName: true});
    return Users;
};
