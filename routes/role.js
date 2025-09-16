const express = require('express');
const router = express.Router();
// Import the controller instance from the DI container
const { roleController } = require('../app/container');
const { roleValidationRules, checkValidationResult } = require('../app/middlewares/roleValidator');

/**
 * @route   POST /roles
 * @desc    Create a new role
 * @access  Public
 */
router.post('/', ...roleValidationRules, checkValidationResult, roleController.create);

/**
 * @route   GET /roles
 * @desc    Get all roles
 * @access  Public
 */
router.get('/', roleController.findAll);

/**
 * @route   GET /roles/:id
 * @desc    Get a single role by ID
 * @access  Public
 */
router.get('/:id', roleController.findById);

/**
 * @route   PUT /roles/:id
 * @desc    Update an existing role
 * @access  Public
 */
router.put('/:id', ...roleValidationRules, checkValidationResult, roleController.update);

/**
 * @route   DELETE /roles/:id
 * @desc    Delete a role by ID
 * @access  Public
 */
router.delete('/:id', roleController.delete);

module.exports = router;
