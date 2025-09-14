const { body, validationResult } = require('express-validator');
const customResponse = require('../utils/customResponse');
const { UserStatus } = require('../db/models');
const { Op } = require('sequelize');

const validateUserStatus = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('User status name is required')
    .isString()
    .withMessage('User status name must be a string')
    .custom(async (value, { req }) => {
      const where = { name: value };
      if (req.params.id) {
        where.id = { [Op.ne]: req.params.id };
      }
      const userStatus = await UserStatus.findOne({ where });
      if (userStatus) {
        return Promise.reject('User status name already in use');
      }
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return customResponse.error(res, errors.array()[0].msg, 400);
    }
    next();
  },
];

module.exports = { validateUserStatus };
