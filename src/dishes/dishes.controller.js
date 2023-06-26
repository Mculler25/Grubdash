const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass
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

const validatePriceIsNumeric = (req, res, next) => {
  const { price } = req.body.data;
  if (typeof price === "number" && price > 0) {
    next();
  } else {
    next({
      status: 400,
      message: "price must be a number greater than zero",
    });
  }
};

const validateDishExists = (req, res, next) => {
  const { dishId } = req.params;
  const index = dishes.findIndex((dish) => dish.id === dishId);

  if (index < 0) {
    next({
      status: 404,
      message: `No dish with ${id} as an id`,
    });
  } else {
    res.locals.index = index;
    res.locals.dish = dishes[index];
    next();
  }
};
const list = (req, res, next) => {
  res.json({ data: dishes });
};

const create = (req, res, next) => {
  const { name, description, price, image_url } = req.body.data;

  const newDish = {
    id: nextId(),
    name: name,
    description: description,
    price: price,
    image_url: image_url,
  };

  //add new dish to dishes array
  dishes.push(newDish);

  res.status(201).json({ data: newDish });
};

const read = (req, res, next) => {
  const { dish } = res.locals;
  res.json({ data: dish });
};

const update = (req, res, next) => {
    const { name, description, price, image_url } = req.body.data;
    const { index , dish } = res.locals;

    const updateDish = {
        ...dish,
        name,
        description,
        price,
        image_url
    }

    dishes[index] = updateDish;

    res.json({data : updateDish})
}

module.exports = {
  list,
  create: [
    validateDataExists,
    ["name", "description", "price", "image_url"].map(validater),
    validatePriceIsNumeric,
    create,
  ],
  read : [validateDishExists, read],
  update : [
    validateDishExists,
    validateDataExists,
    ["name", "description", "price", "image_url"].map(validater),
    validatePriceIsNumeric,
    update
  ]
};
