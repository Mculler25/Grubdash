const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /orders handlers needed to make the tests pass
const validateDataExists = (req, res, next) => {
  if (req.body.data) {
    next();
  } else {
    next({
      status: 400,
      message: "Request must contain a data object",
    });
  }
};

const validater = (field) => {
  return function (req, res, next) {
    if (req.body.data[field]) {
      next();
    } else {
      next({
        status: 400,
        message: `Please provide ${field} field`,
      });
    }
  };
};

const validateOrderExists = (req, res, next) => {
    const { orderId } = req.params;
    const index = orders.findIndex((order) => order.id === orderId);
  
    if (index < 0) {
      next({
        status: 404,
        message: `No Order with ${orderId} as an id`,
      });
    } else {
      res.locals.index = index;
      res.locals.order = orders[index];
      next();
    }
  };

const list = (req, res, next) => {
  res.json({ data: orders });
};

const isOrderPending = (req, res, next) => {
  const { order } = res.locals;
  if (order.status === 'pending'){
    next();
  } else {
    next({
      status : 400,
      message : 'order must be pending'
    })
  }
}

const create = (req, res, next) => {
  const { deliverTo, mobileNumber, status, dishes } = req.body.data;

    const newOrder = {
      id: nextId(),
      deliverTo: deliverTo,
      mobileNumber: mobileNumber,
      status: status,
      dishes: [...dishes],
    };
    //add new dish to dishes array
    orders.push(newOrder);
    res.status(201).json({ data: newOrder });
};

const read = (req, res, next) => {
  const { order } = res.locals;
  res.json({ data: order });
};

const update = (req, res, next) => {
    const { deliverTo, mobileNumber, status, dishes } = req.body.data;
    const { index , order } = res.locals;

    const updateOrder = {
        ...order,
        deliverTo,
        mobileNumber,
        status,
        dishes
    }

    orders[index] = updateOrder;

    res.json({data : updateOrder})
}

function destroy(req, res, next) {
    const { index } = res.locals;
    orders.splice(index, 1);
    res.status(204).end();
  }

module.exports = {
  list,
  create: [
    validateDataExists,
    ["deliverTo", "mobileNumber"].map(validater),
    create
  ],
  read : [validateOrderExists, read],
  update : [
    validateDataExists,
    validateOrderExists,
    ['deliverTo', 'mobileNumber', 'status'].map(validater),
    update
  ],
  destroy : [validateOrderExists, isOrderPending, destroy]
};
