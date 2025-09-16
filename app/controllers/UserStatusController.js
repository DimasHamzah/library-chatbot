/**
 * @class UserStatusController
 * @description Controller for handling all user status-related API requests.
 */
class UserStatusController {

  /**
   * @param {UserStatusService} userStatusService - The service for user status business logic.
   * @param {logger} logger - The application logger.
   * @param {customResponse} customResponse - The utility for standardized responses.
   */
  constructor(userStatusService, logger, customResponse) {
    this.userStatusService = userStatusService;
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
   * Handles the request to create a new user status.
   * @param {object} req - The Express request object.
   * @param {object} res - The Express response object.
   */
  async create(req, res) {
    this.logger.info('POST /user-statuses - creating a new user status', { body: req.body });
    try {
      const userStatus = await this.userStatusService.create(req.body);
      this.logger.info('Successfully created a new user status', { userStatus });
      this.customResponse.success(res, userStatus, 'User status created successfully', 201);
    } catch (error) {
      this.logger.error('Error creating a new user status', { error: error.message });
      this.customResponse.error(res, error.message);
    }
  }

  /**
   * Handles the request to fetch all user statuses.
   * @param {object} req - The Express request object.
   * @param {object} res - The Express response object.
   */
  async findAll(req, res) {
    this.logger.info('GET /user-statuses - fetching all user statuses');
    try {
      const userStatuses = await this.userStatusService.findAll();
      this.logger.info('Successfully fetched all user statuses');
      this.customResponse.success(res, userStatuses, 'User statuses fetched successfully');
    } catch (error) {
      this.logger.error('Error fetching all user statuses', { error: error.message });
      this.customResponse.error(res, error.message);
    }
  }

  /**
   * Handles the request to find a single user status by its ID.
   * @param {object} req - The Express request object.
   * @param {object} res - The Express response object.
   */
  async findById(req, res) {
    this.logger.info(`GET /user-statuses/${req.params.id} - fetching user status by id`);
    try {
      const userStatus = await this.userStatusService.findById(req.params.id);
      if (userStatus) {
        this.logger.info(`Successfully fetched user status with id: ${req.params.id}`);
        this.customResponse.success(res, userStatus, 'User status fetched successfully');
      } else {
        this.logger.warn(`User status with id: ${req.params.id} not found`);
        this.customResponse.notFound(res, 'User status not found');
      }
    } catch (error) {
      this.logger.error(`Error fetching user status with id: ${req.params.id}`, { error: error.message });
      this.customResponse.error(res, error.message);
    }
  }

  /**
   * Handles the request to update an existing user status.
   * @param {object} req - The Express request object.
   * @param {object} res - The Express response object.
   */
  async update(req, res) {
    this.logger.info(`PUT /user-statuses/${req.params.id} - updating user status by id`, { body: req.body });
    try {
      const userStatus = await this.userStatusService.update(req.params.id, req.body);
      if (userStatus) {
        this.logger.info(`Successfully updated user status with id: ${req.params.id}`);
        this.customResponse.success(res, userStatus, 'User status updated successfully');
      } else {
        this.logger.warn(`User status with id: ${req.params.id} not found for update`);
        this.customResponse.notFound(res, 'User status not found');
      }
    } catch (error) {
      this.logger.error(`Error updating user status with id: ${req.params.id}`, { error: error.message });
      this.customResponse.error(res, error.message);
    }
  }

  /**
   * Handles the request to delete a user status.
   * @param {object} req - The Express request object.
   * @param {object} res - The Express response object.
   */
  async delete(req, res) {
    this.logger.info(`DELETE /user-statuses/${req.params.id} - deleting user status by id`);
    try {
      const result = await this.userStatusService.delete(req.params.id);
      if (result) {
        this.logger.info(`Successfully deleted user status with id: ${req.params.id}`);
        this.customResponse.success(res, null, 'User status deleted successfully', 204);
      } else {
        this.logger.warn(`User status with id: ${req.params.id} not found for deletion`);
        this.customResponse.notFound(res, 'User status not found');
      }
    } catch (error) {
      this.logger.error(`Error deleting user status with id: ${req.params.id}`, { error: error.message });
      this.customResponse.error(res, error.message);
    }
  }
}

module.exports = UserStatusController;
