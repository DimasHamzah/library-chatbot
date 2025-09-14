const logger = require('../../utils/logger');
const customResponse = require('../../utils/customResponse');

class RoleController {
  constructor(roleUseCase) {
    this.roleUseCase = roleUseCase;
  }

  async create(req, res) {
    logger.info('POST /roles - creating a new role', { body: req.body });
    try {
      const role = await this.roleUseCase.createRole(req.body);
      logger.info('Successfully created a new role', { role });
      customResponse.success(res, role, 'Role created successfully', 201);
    } catch (error) {
      logger.error('Error creating a new role', { error: error.message });
      customResponse.error(res, error.message);
    }
  }

  async findAll(req, res) {
    logger.info('GET /roles - fetching all roles');
    try {
      const roles = await this.roleUseCase.getAllRoles();
      logger.info('Successfully fetched all roles');
      customResponse.success(res, roles, 'Roles fetched successfully');
    } catch (error) {
      logger.error('Error fetching all roles', { error: error.message });
      customResponse.error(res, error.message);
    }
  }

  async findById(req, res) {
    logger.info(`GET /roles/${req.params.id} - fetching role by id`);
    try {
      const role = await this.roleUseCase.getRoleById(req.params.id);
      if (role) {
        logger.info(`Successfully fetched role with id: ${req.params.id}`);
        customResponse.success(res, role, 'Role fetched successfully');
      } else {
        logger.warn(`Role with id: ${req.params.id} not found`);
        customResponse.notFound(res, 'Role not found');
      }
    } catch (error) {
      logger.error(`Error fetching role with id: ${req.params.id}`, { error: error.message });
      customResponse.error(res, error.message);
    }
  }

  async update(req, res) {
    logger.info(`PUT /roles/${req.params.id} - updating role by id`, { body: req.body });
    try {
      const role = await this.roleUseCase.updateRole(req.params.id, req.body);
      if (role) {
        logger.info(`Successfully updated role with id: ${req.params.id}`);
        customResponse.success(res, role, 'Role updated successfully');
      } else {
        logger.warn(`Role with id: ${req.params.id} not found for update`);
        customResponse.notFound(res, 'Role not found');
      }
    } catch (error) {
      logger.error(`Error updating role with id: ${req.params.id}`, { error: error.message });
      customResponse.error(res, error.message);
    }
  }

  async delete(req, res) {
    logger.info(`DELETE /roles/${req.params.id} - deleting role by id`);
    try {
      const result = await this.roleUseCase.deleteRole(req.params.id);
      if (result) {
        logger.info(`Successfully deleted role with id: ${req.params.id}`);
        customResponse.success(res, null, 'Role deleted successfully', 204);
      } else {
        logger.warn(`Role with id: ${req.params.id} not found for deletion`);
        customResponse.notFound(res, 'Role not found');
      }
    } catch (error) {
      logger.error(`Error deleting role with id: ${req.params.id}`, { error: error.message });
      customResponse.error(res, error.message);
    }
  }
}

module.exports = RoleController;
