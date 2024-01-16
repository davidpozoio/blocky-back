const { body } = require("express-validator");

exports.stringValidator = (fieldName) =>
  body(fieldName)
    .notEmpty()
    .withMessage(`${fieldName} must not to be empty`)
    .isString()
    .withMessage(`${fieldName} must be a string`);
