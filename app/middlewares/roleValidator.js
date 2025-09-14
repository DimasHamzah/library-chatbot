const { body, validationResult } = require('express-validator');
const customResponse = require('../utils/customResponse');

const validateRole = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Role name is required')
    .isString()
    .withMessage('Role name must be a string'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return customResponse.error(res, errors.array()[0].msg, 400);
    }
    next();
  },
];

module.exports = { validateRole };
