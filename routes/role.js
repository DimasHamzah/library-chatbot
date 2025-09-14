const express = require('express');
const router = express.Router();
const roleController = require('../app/controllers/RoleController');
const { validateRole } = require('../app/middlewares/roleValidator');

router.post('/', validateRole, roleController.create);
router.get('/', roleController.findAll);
router.get('/:id', roleController.findById);
router.put('/:id', validateRole, roleController.update);
router.delete('/:id', roleController.delete);

module.exports = router;
