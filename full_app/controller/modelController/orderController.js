"use strict";

const sequelize = require("../../config/db");
const { Sequelize } = require("sequelize");

const Order = require("../../models/Order")(sequelize, Sequelize);
Order.sync();

// POST method for creating order
exports.createOrder = (req, res) => {
    const order = {
        name: req.body.name,
        productId: req.body.productId,
        userId: req.body.userId,
        order_date: req.body.order_date,
        pickup_date: req.body.pickup_date
    };

    Order.create(order).
        then((data) => {
            let object = { status: "Order created!"};
            res.send(object);
        }).
        catch((err) => {
            res.status(500).send({
                message: err.message || "Error creating the order!"
            });
        });
};

// DELETE method for allOrders
exports.deleteAllOrders = (req, res) => {
    Order.destroy({
        where: {},
        truncate: false
    }).
        then((nums) => {
            res.send({ message: "Table orders is destroyed!"});
        }).
            catch((err) => {
                res.status(500).send({
                    message: err.message || "Error destroying table orders!"
                });
            });
};

// DELETE method for oneOrder
exports.deleteOrder = (req, res) => {
    const id = req.body.id;
    Order.destroy({
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Order deleted succesfully.",
            });
          } else {
            res.send({
              message: "Not posible to delete the order.",
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error deleting the order with id: " + id,
          });
        });
};

// GET method for allOrders
exports.getAllOrders = (req, res) => {
    Order.findAll().then((orders) => {
        res.send(orders);
    });
};

// GET method for oneOrder
exports.getOrder = (req, res) => {
    Order.findOne({
        where: {
            id: req.body.id
        },
    }).
        then((order) => {
            res.send(order);
        }).
            catch((err) => {
                res.status(500).send({
                    message: "Error getting order " + order.name
                })
            })
};

// add updating orders

// PUT method for updating pickup-date
exports.updatePickupDate = (req, res) => {
    Order.update({
        pickup_date: req.body.pickup_date
    },
    {
        where:
         { id: req.body.id }
    }).
        then(num => {
            if(num == 1) {
                let object = { status: "Order pickup date updated successfully!"};
                res.send(object);
            } else {
                let object = { status: "Can't update order's pickup date!"};
                res.send(object);
            }
        }).
            catch(err => {
                res.status(500).send({
                    message: "Error updating order's pickup date!"
                });
            });
};

// PUT method for updating order
exports.updateOrder = (req, res) => {
    const order = {
        name: req.body.name,
        productId: req.body.productId,
        userId: req.body.userId,
        order_date: req.body.order_date,
        pickup_date: req.body.pickup_date
    };
 
    Order.update(order, {
        where: {
            id: req.body.id
        }
    }).
        then(num => {
            if(num == 1) {
                let object = { status: "Order updated successfully!"};
                res.send(object);
            } else {
                let object = { status: "Can't update order!"};
                res.send(object);
            }
        }).
            catch(err => {
                res.status(500).send({
                    message: "Error updating order!"
                });
            });
};