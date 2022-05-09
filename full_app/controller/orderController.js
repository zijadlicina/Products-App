"use strict";

const sequelize = require("../config/db");
const { Sequelize } = require("sequelize");

const Order = require("../models/Order")(sequelize, Sequelize);
Order.sync();