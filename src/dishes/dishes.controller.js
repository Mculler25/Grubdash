const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass
const validateDataExists = (req, res, next) => {
    if(req.body.data){
        next()
    } else {
        next({
            status : 400,
            message : 'Request must contain a data object'
        })
    }
}

const validater = (field) => {
    return function (req, res, next) {
        if(req.body.data[field]){
            next();
        } else {
            next({
                status: 400,
                message : `Please provide ${field} field`
            })
        }
    }
}
const list = (req, res, next) => {
    res.json({data : dishes})
}

const create = (req, res, next) => {

}

module.exports = {
    list,
    create : [
        validateDataExists, 
        ['name', 'description', 'price', 'image-url'].map(validater),
        create
    ]
}
