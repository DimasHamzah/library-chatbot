const roleService = require('../services/RoleService');
const logger = require('../utils/logger');

class RoleController {
  async create(req, res) {
    logger.info('POST /roles - creating a new role', { body: req.body });
    try {
      const role = await roleService.create(req.body);
      logger.info('Successfully created a new role', { role });
      res.status(201).json(role);
    } catch (error) {
      logger.error('Error creating a new role', { error: error.message });
      res.status(500).json({ message: error.message });
    }
  }

  async findAll(req, res) {
    logger.info('GET /roles - fetching all roles');
    try {
      const roles = await roleService.findAll();
      logger.info('Successfully fetched all roles');
      res.status(200).json(roles);
    } catch (error) {
      logger.error('Error fetching all roles', { error: error.message });
      res.status(500).json({ message: error.message });
    }
  }

  async findById(req, res) {
    logger.info(`GET /roles/${req.params.id} - fetching role by id`);
    try {
      const role = await roleService.findById(req.params.id);
      if (role) {
        logger.info(`Successfully fetched role with id: ${req.params.id}`);
        res.status(200).json(role);
      } else {
        logger.warn(`Role with id: ${req.params.id} not found`);
        res.status(404).json({ message: 'Role not found' });
      }
    } catch (error) {
      logger.error(`Error fetching role with id: ${req.params.id}`, { error: error.message });
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    logger.info(`PUT /roles/${req.params.id} - updating role by id`, { body: req.body });
    try {
      const role = await roleService.update(req.params.id, req.body);
      if (role) {
        logger.info(`Successfully updated role with id: ${req.params.id}`);
        res.status(200).json(role);
      } else {
        logger.warn(`Role with id: ${req.params.id} not found for update`);
        res.status(404).json({ message: 'Role not found' });
      }
    } catch (error) {
      logger.error(`Error updating role with id: ${req.params.id}`, { error: error.message });
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    logger.info(`DELETE /roles/${req.params.id} - deleting role by id`);
    try {
      const result = await roleService.delete(req.params.id);
      if (result) {
        logger.info(`Successfully deleted role with id: ${req.params.id}`);
        res.status(204).send();
      } else {
        logger.warn(`Role with id: ${req.params.id} not found for deletion`);
        res.status(404).json({ message: 'Role not found' });
      }
    } catch (error) {
      logger.error(`Error deleting role with id: ${req.params.id}`, { error: error.message });
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new RoleController();
