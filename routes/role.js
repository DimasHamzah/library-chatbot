const express = require('express');
const router = express.Router();
const roleController = require('../app/controllers/RoleController');

router.post('/', roleController.create);
router.get('/', roleController.findAll);
router.get('/:id', roleController.findById);
router.put('/:id', roleController.update);
router.delete('/:id', roleController.delete);

module.exports = router;
