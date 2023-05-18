const { validationResult } = require("express-validator");

const validator = function (req, res, next) {
  let errors = validationResult(req);
  if (errors.isEmpty()) return next(); // If there are no input validation erros move to the next middleware

  const extractedErrors = [];
  errors
    .array({ onlyFirstError: true })
    .map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(400).json({ errors: extractedErrors });
};

module.exports.validator = validator;
