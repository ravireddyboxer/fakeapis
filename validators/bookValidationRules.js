const { body } = require("express-validator");

const createBookValidationRules = [
  body("title").notEmpty().withMessage("Title of the book is needed").escape(),
  body("author")
    .notEmpty()
    .withMessage("Author of the book is needed")
    .escape(),
  body("genre").notEmpty().withMessage("Genre of the book is needed").escape(),
  body("publicationYear")
    .notEmpty()
    .withMessage("Pulication year of the book needed")
    .custom((value) => typeof value === "number")
    .withMessage("Publication year should be a number")
    .isInt()
    .withMessage("Publication year should be an integer")
    .isInt({ min: 1800 })
    .withMessage("Publication year can not be less than 1800"),
  body("rating")
    .notEmpty()
    .withMessage("Rating of the book is needed")
    .custom((value) => typeof value === "number")
    .withMessage("Value of rating property should be number")
    .isInt({ min: 0, max: 5 })
    .withMessage("Rating field should be an integer between 0 and 5"),
];

module.exports.createBookValidationRules = createBookValidationRules;
