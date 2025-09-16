const { body, validationResult } = require('express-validator');
const customResponse = require('../utils/customResponse');

/**
 * @const roleValidationRules
 * @description An array of validation rules for creating or updating a role.
 * It checks that the 'name' field is a non-empty string.
 * Includes a custom strict check to prevent type coercion issues.
 */
const roleValidationRules = [
  body('name')
    // Add a custom, strict type check to prevent type coercion issues
    .custom((value) => {
      if (typeof value !== 'string') {
        // Use Promise.reject for custom validators, as it's the most robust way
        return Promise.reject('Role name must be a string');
      }
      return true;
    })
    .trim()
    .notEmpty()
    .withMessage('Role name is required'),
];

/**
 * A middleware function that checks for validation errors.
 * If errors are found, it sends a 400 response. Otherwise, it passes control to the next middleware.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The Express next middleware function.
 */
const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return customResponse.error(res, errors.array()[0].msg, 400);
  }
  next();
};

module.exports = {
  roleValidationRules,
  checkValidationResult,
};
