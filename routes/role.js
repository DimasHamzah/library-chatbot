const express = require('express');
const router = express.Router();
const roleController = require('../app/controllers/RoleController');
// Import the new, separated middleware functions
const { roleValidationRules, checkValidationResult } = require('../app/middlewares/roleValidator');

// Apply the rules and the result checker as a proper middleware chain
router.post('/', ...roleValidationRules, checkValidationResult, roleController.create);
router.get('/', roleController.findAll);
router.get('/:id', roleController.findById);
router.put('/:id', ...roleValidationRules, checkValidationResult, roleController.update);
router.delete('/:id', roleController.delete);

module.exports = router;
