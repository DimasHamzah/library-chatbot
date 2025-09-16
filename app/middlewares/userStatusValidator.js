const { body, validationResult } = require('express-validator');
const customResponse = require('../utils/customResponse');

const userStatusValidationRules = [
  body('name')
    .custom((value) => {
      if (typeof value !== 'string') {
        // Use Promise.reject for custom validators, as it's the most robust way
        return Promise.reject('User status name must be a string');
      }
      return true;
    })
    .trim()
    .notEmpty()
    .withMessage('User status name is required'),
];

const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return customResponse.error(res, errors.array()[0].msg, 400);
  }
  next();
};

module.exports = {
  userStatusValidationRules,
  checkValidationResult,
};
