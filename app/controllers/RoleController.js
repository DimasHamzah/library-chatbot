/**
 * @class RoleController
 * @description Controller for handling all role-related API requests.
 */
class RoleController {

  /**
   * @param {RoleService} roleService - The service for role business logic.
   * @param {logger} logger - The application logger.
   * @param {customResponse} customResponse - The utility for standardized responses.
   */
  constructor(roleService, logger, customResponse) {
    this.roleService = roleService;
    this.logger = logger;
    this.customResponse = customResponse;

    // Bind the 'this' context to ensure it's available in the route handlers
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * Handles the request to create a new role.
   * @param {object} req - The Express request object.
   * @param {object} res - The Express response object.
   */
  async create(req, res) {
    this.logger.info('POST /roles - creating a new role', { body: req.body });
    try {
      const role = await this.roleService.create(req.body);
      this.logger.info('Successfully created a new role', { role });
      this.customResponse.success(res, role, 'Role created successfully', 201);
    } catch (error) {
      this.logger.error('Error creating a new role', { error: error.message });
      this.customResponse.error(res, error.message);
    }
  }

  /**
   * Handles the request to fetch all roles.
   * @param {object} req - The Express request object.
   * @param {object} res - The Express response object.
   */
  async findAll(req, res) {
    this.logger.info('GET /roles - fetching all roles');
    try {
      const roles = await this.roleService.findAll();
      this.logger.info('Successfully fetched all roles');
      this.customResponse.success(res, roles, 'Roles fetched successfully');
    } catch (error) {
      this.logger.error('Error fetching all roles', { error: error.message });
      this.customResponse.error(res, error.message);
    }
  }

  /**
   * Handles the request to find a single role by its ID.
   * @param {object} req - The Express request object.
   * @param {object} res - The Express response object.
   */
  async findById(req, res) {
    this.logger.info(`GET /roles/${req.params.id} - fetching role by id`);
    try {
      const role = await this.roleService.findById(req.params.id);
      if (role) {
        this.logger.info(`Successfully fetched role with id: ${req.params.id}`);
        this.customResponse.success(res, role, 'Role fetched successfully');
      } else {
        this.logger.warn(`Role with id: ${req.params.id} not found`);
        this.customResponse.notFound(res, 'Role not found');
      }
    } catch (error) {
      this.logger.error(`Error fetching role with id: ${req.params.id}`, { error: error.message });
      this.customResponse.error(res, error.message);
    }
  }

  /**
   * Handles the request to update an existing role.
   * @param {object} req - The Express request object.
   * @param {object} res - The Express response object.
   */
  async update(req, res) {
    this.logger.info(`PUT /roles/${req.params.id} - updating role by id`, { body: req.body });
    try {
      const role = await this.roleService.update(req.params.id, req.body);
      if (role) {
        this.logger.info(`Successfully updated role with id: ${req.params.id}`);
        this.customResponse.success(res, role, 'Role updated successfully');
      } else {
        this.logger.warn(`Role with id: ${req.params.id} not found for update`);
        this.customResponse.notFound(res, 'Role not found');
      }
    } catch (error) {
      this.logger.error(`Error updating role with id: ${req.params.id}`, { error: error.message });
      this.customResponse.error(res, error.message);
    }
  }

  /**
   * Handles the request to delete a role.
   * @param {object} req - The Express request object.
   * @param {object} res - The Express response object.
   */
  async delete(req, res) {
    this.logger.info(`DELETE /roles/${req.params.id} - deleting role by id`);
    try {
      const result = await this.roleService.delete(req.params.id);
      if (result) {
        this.logger.info(`Successfully deleted role with id: ${req.params.id}`);
        this.customResponse.success(res, null, 'Role deleted successfully', 204);
      } else {
        this.logger.warn(`Role with id: ${req.params.id} not found for deletion`);
        this.customResponse.notFound(res, 'Role not found');
      }
    } catch (error) {
      this.logger.error(`Error deleting role with id: ${req.params.id}`, { error: error.message });
      this.customResponse.error(res, error.message);
    }
  }
}

module.exports = RoleController;
