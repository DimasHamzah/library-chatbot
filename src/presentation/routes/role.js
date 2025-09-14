const express = require('express');
const RoleController = require('../controllers/RoleController');
const { validateRole } = require('../middlewares/roleValidator');

module.exports = (roleUseCase) => {
  const router = express.Router();
  const roleController = new RoleController(roleUseCase);

  router.post('/', validateRole, (req, res) => roleController.create(req, res));
  router.get('/', (req, res) => roleController.findAll(req, res));
  router.get('/:id', (req, res) => roleController.findById(req, res));
  router.put('/:id', validateRole, (req, res) => roleController.update(req, res));
  router.delete('/:id', (req, res) => roleController.delete(req, res));

  return router;
};
