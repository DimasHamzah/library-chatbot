const express = require('express');
const router = express.Router();
const userStatusController = require('../app/controllers/UserStatusController');
const { validateUserStatus } = require('../app/middlewares/userStatusValidator');

router.post('/', validateUserStatus, userStatusController.create);
router.get('/', userStatusController.findAll);
router.get('/:id', userStatusController.findById);
router.put('/:id', validateUserStatus, userStatusController.update);
router.delete('/:id', userStatusController.delete);

module.exports = router;
