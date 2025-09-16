const express = require('express');
const router = express.Router();
const userStatusController = require('../app/controllers/UserStatusController');
// Import the new, separated middleware functions
const { userStatusValidationRules, checkValidationResult } = require('../app/middlewares/userStatusValidator');

// Apply the rules and the result checker as a proper middleware chain
router.post('/', ...userStatusValidationRules, checkValidationResult, userStatusController.create);
router.get('/', userStatusController.findAll);
router.get('/:id', userStatusController.findById);
router.put('/:id', ...userStatusValidationRules, checkValidationResult, userStatusController.update);
router.delete('/:id', userStatusController.delete);

module.exports = router;
