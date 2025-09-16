const express = require('express');
const router = express.Router();
// Import the controller instance from the DI container
const { userStatusController } = require('../app/container');
const { userStatusValidationRules, checkValidationResult } = require('../app/middlewares/userStatusValidator');

/**
 * @route   POST /user-statuses
 * @desc    Create a new user status
 * @access  Public
 */
router.post('/', ...userStatusValidationRules, checkValidationResult, userStatusController.create);

/**
 * @route   GET /user-statuses
 * @desc    Get all user statuses
 * @access  Public
 */
router.get('/', userStatusController.findAll);

/**
 * @route   GET /user-statuses/:id
 * @desc    Get a single user status by ID
 * @access  Public
 */
router.get('/:id', userStatusController.findById);

/**
 * @route   PUT /user-statuses/:id
 * @desc    Update an existing user status
 * @access  Public
 */
router.put('/:id', ...userStatusValidationRules, checkValidationResult, userStatusController.update);

/**
 * @route   DELETE /user-statuses/:id
 * @desc    Delete a user status by ID
 * @access  Public
 */
router.delete('/:id', userStatusController.delete);

module.exports = router;
