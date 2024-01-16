const { body } = require("express-validator");
const { stringValidator } = require("./string-validator");

exports.noteValidator = [stringValidator("title"), stringValidator("content")];

exports.notePatchValidator = [
  body("title").isString().withMessage("title must be a string").optional(),
  body("content").isString().withMessage("content must be a string").optional(),
  body("noteId").notEmpty().isNumeric().withMessage("noteId must be a number"),
];
