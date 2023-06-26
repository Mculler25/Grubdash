const methodNotAllowed = require('../utils/methodNotAllowed');
const router = require("express").Router();
const controller = require('./dishes.controller');

// TODO: Implement the /dishes routes needed to make the tests pass
router.route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

module.exports = router;
